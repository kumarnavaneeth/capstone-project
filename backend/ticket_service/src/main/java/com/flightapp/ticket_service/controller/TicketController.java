package com.flightapp.ticket_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.service.TicketService;

import jakarta.validation.Valid;

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
	public ResponseEntity<Booking> bookTicket(@PathVariable Long flightId,@Valid @RequestBody Booking booking) {
		return ResponseEntity.ok(ticketService.bookTicket(flightId, booking));
	}
}
