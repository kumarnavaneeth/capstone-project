package com.flightapp.ticket_service.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		return ticketRepository.findByPnr(pnr)
				.orElseThrow(() -> new TicketNotFoundException("No Ticket Found For Pnr: " + pnr));
	}
}
