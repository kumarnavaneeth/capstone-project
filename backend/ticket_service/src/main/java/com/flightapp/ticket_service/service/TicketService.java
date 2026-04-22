package com.flightapp.ticket_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.exceptions.TicketNotFoundException;
import com.flightapp.ticket_service.repository.TicketRepository;

@Service
public class TicketService {
@Autowired
TicketRepository ticketRepository;
public Booking getTicketByPnr(String pnr) {
	return ticketRepository.findByPnr(pnr).orElseThrow(
			()-> new TicketNotFoundException("No Ticket Found For Pnr: "+pnr));	
}
}
