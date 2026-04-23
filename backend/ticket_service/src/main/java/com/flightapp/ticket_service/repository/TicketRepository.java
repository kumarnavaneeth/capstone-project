package com.flightapp.ticket_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flightapp.ticket_service.entity.Booking;

@Repository
public interface TicketRepository extends JpaRepository<Booking, Long> {
	Optional<Booking> findByPnr(String pnr);

}
