package com.flightapp.ticket_service.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.entity.BookingStatus;
import com.flightapp.ticket_service.entity.Gender;
import com.flightapp.ticket_service.entity.MealType;
import com.flightapp.ticket_service.entity.Passenger;
import com.flightapp.ticket_service.repository.TicketRepository;

class TestTicketService {
	@InjectMocks
	TicketService ticketService;
	@Mock
	TicketRepository ticketRepository;

	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testSuccessfulTicketBook() {
		Booking booking = new Booking();
		booking.setBookingId(10L);
		Passenger firstPassenger = new Passenger();
		firstPassenger.setPassengerId(1L);
		firstPassenger.setName("Ram");
		firstPassenger.setAge(20);
		firstPassenger.setGender(Gender.MALE);
		firstPassenger.setMealType(MealType.VEG);
		Passenger secondPassenger=new Passenger();
		secondPassenger.setPassengerId(2L);
		secondPassenger.setName("divya");
		secondPassenger.setAge(25);
		secondPassenger.setGender(Gender.FEMALE);
		secondPassenger.setMealType(MealType.NON_VEG);
		List<Passenger> passengers=new ArrayList<>();
		passengers.add(firstPassenger);
		passengers.add(secondPassenger);
		booking.setPassengers(passengers);
        when(ticketRepository.save(any(Booking.class))).thenReturn(booking);
        Booking result=ticketService.bookTicket(100L, booking);
        assertNotNull(result);
        assertEquals(10L,result.getBookingId());
        assertEquals(100L,result.getFlightId());
        assertEquals(BookingStatus.CONFIRMED,result.getStatus());
        assertNotNull(result.getPnr());
        assertNotNull(result.getBookingDate());
	}
}
