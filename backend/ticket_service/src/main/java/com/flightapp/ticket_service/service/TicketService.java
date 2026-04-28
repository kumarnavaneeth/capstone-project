package com.flightapp.ticket_service.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
	@Value("${flight.service.url}")
	private String flightServiceUrl;

	public Booking bookTicket(Long flightId, Booking booking) {
		if(booking.getPassengers()==null || booking.getPassengers().isEmpty()) {
			throw new InvalidBookingException("at least one passenger is required");
		}
		booking.setFlightId(flightId);
		booking.setUserId(101L);
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
		return "FL"+UUID.randomUUID().toString().substring(0,6).toUpperCase();
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
		Map<String, Object>[] flights = restTemplate.getForObject(flightServiceUrl + "?flight_id=" + flightId,
				Map[].class);
		Map<String, Object> flight = flights[0];
		String flightDepartureTime = (String) flight.get("departure_time");
		LocalDateTime departureTime = LocalDateTime.parse(flightDepartureTime);
		if (departureTime.isAfter(LocalDateTime.now().plusHours(24))) {
			booking.setStatus(BookingStatus.CANCELLED);
			ticketRepository.save(booking);
		} else {
			throw new InvalidBookingException("cannot cancel ticket within 24hrs of departure");
		}
	}
}
