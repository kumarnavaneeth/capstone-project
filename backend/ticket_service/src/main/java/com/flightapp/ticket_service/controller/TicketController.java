package com.flightapp.ticket_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.service.TicketService;

import jakarta.validation.Valid;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1.0/flight")
public class TicketController {
	@Autowired
	TicketService ticketService;

	@GetMapping("/ticket/{pnr}")
	public ResponseEntity<Booking> getTicketByPnr(@PathVariable String pnr) {
		Booking booking = ticketService.getTicketByPnr(pnr);
		return ResponseEntity.ok(booking);
	}

	@PostMapping("/booking/{flightId}")
	public ResponseEntity<Long> bookTicket(@PathVariable Long flightId, @Valid @RequestBody Booking booking) {
		Booking savedBooking = ticketService.bookTicket(flightId, booking);
		return ResponseEntity.status(201).body(savedBooking.getBookingId());
	}

	@PatchMapping("/booking/cancel/{pnr}")
	public ResponseEntity<String> cancelTicketByPnr(@PathVariable String pnr) {
		ticketService.cancelTicketByPnr(pnr);
		return ResponseEntity.ok("Ticket cancelled Successfully");
	}
	@GetMapping("/booking/history/{userId}")
	public ResponseEntity<List<Booking>> getBookingHistoryByUserId(@PathVariable Long userId){
		List<Booking> bookings=ticketService.getBookingHistoryByUserId(userId);
		return ResponseEntity.ok(bookings);
	}
}
