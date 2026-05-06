package com.flightapp.ticket_service.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.flightapp.ticket_service.dto.BookingEvent;
import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.entity.BookingStatus;
import com.flightapp.ticket_service.entity.Passenger;
import com.flightapp.ticket_service.exceptions.InvalidBookingException;
import com.flightapp.ticket_service.exceptions.TicketNotFoundException;
import com.flightapp.ticket_service.repository.TicketRepository;

@Service
public class TicketService {
	@Autowired
	TicketRepository ticketRepository;
	@Autowired
	RestTemplate restTemplate;
	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;
	@Value("${flight.service.url}")
	private String flightServiceUrl;
	private static final String TOPIC = "booking-updates";

	public Booking bookTicket(Long flightId, Booking booking) {
		if (booking == null) {
			throw new InvalidBookingException("Booking cannot be null");
		}
		if (booking.getPassengers() == null || booking.getPassengers().isEmpty()) {
			throw new InvalidBookingException("at least one passenger is required");
		}
		Map<String, Object> flight = restTemplate.getForObject(flightServiceUrl + "/" + flightId, Map.class);
		if (flight == null || flight.isEmpty()) {
			throw new InvalidBookingException("Flight not found");
		}
		boolean isBusiness = booking.getIsBusinessClass() != null && booking.getIsBusinessClass();
		String seatKey = isBusiness ? "businessClassSeats" : "nonBusinessClassSeats";
		Integer availableSeats = (Integer) flight.get(seatKey);
		int bookedSeats = booking.getPassengers().size();
		if (availableSeats < bookedSeats) {
			throw new InvalidBookingException("Not enough seats available");
		}
		kafkaTemplate.send(TOPIC, new BookingEvent(flightId, -bookedSeats, isBusiness));
		booking.setFlightId(flightId);
		booking.setStatus(BookingStatus.CONFIRMED);
		booking.setBookingDate(LocalDateTime.now());
		booking.setPnr(generatePnr());
		if (booking.getPassengers() != null) {
			for (Passenger p : booking.getPassengers()) {
				p.setBooking(booking);
			}
		}
		return ticketRepository.save(booking);
	}

	public String generatePnr() {
		return "FL" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
	}

	public Booking getTicketByPnr(String pnr) {
		return ticketRepository.findByPnr(pnr).orElseThrow(() -> new TicketNotFoundException(""));
	}

	public void cancelTicketByPnr(String pnr) {
		Booking booking = ticketRepository.findByPnr(pnr)
				.orElseThrow(() -> new TicketNotFoundException("No Booking found for this Pnr"));
		if (booking.getStatus() == BookingStatus.CANCELLED) {
			throw new InvalidBookingException("Ticket already cancelled");
		}
		Long flightId = booking.getFlightId();
		Map<String, Object> flight = restTemplate.getForObject(flightServiceUrl + "/" + flightId, Map.class);
		String flightDepartureTime = (String) flight.get("departureTime");
		LocalDateTime departureTime = LocalDateTime.parse(flightDepartureTime);
		if (departureTime.isAfter(LocalDateTime.now().plusHours(24))) {
			boolean wasBusiness = booking.getIsBusinessClass() != null && booking.getIsBusinessClass();
			int cancelledSeats = booking.getPassengers().size();
			kafkaTemplate.send(TOPIC, new BookingEvent(booking.getFlightId(), cancelledSeats, wasBusiness));
			booking.setStatus(BookingStatus.CANCELLED);
			ticketRepository.save(booking);
		} else {
			throw new InvalidBookingException("cannot cancel ticket within 24hrs of departure");
		}
	}

	public List<Booking> getBookingHistoryByUserId(Long userId) {
		List<Booking> bookings = ticketRepository.findByUserId(userId);
		if (bookings.isEmpty()) {
			throw new TicketNotFoundException("No booking found for this user id");
		}
		return bookings;
	}
}
