package com.flightapp.ticket_service.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.flightapp.ticket_service.exceptions.InvalidBookingException;
import com.flightapp.ticket_service.exceptions.TicketNotFoundException;
import com.flightapp.ticket_service.repository.TicketRepository;

class TestTicketService {
	@InjectMocks
	TicketService ticketService;

	@Mock
	TicketRepository ticketRepository;

	Booking booking;
	Passenger firstPassenger;
	Passenger secondPassenger;
	List<Passenger> passengers;

	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
		booking = new Booking();
		firstPassenger = new Passenger();
		secondPassenger = new Passenger();
		passengers = new ArrayList<>();
		booking.setBookingId(10L);
		firstPassenger.setPassengerId(1L);
		firstPassenger.setName("Ram");
		firstPassenger.setAge(20);
		firstPassenger.setGender(Gender.MALE);
		firstPassenger.setMealType(MealType.VEG);
		secondPassenger.setPassengerId(2L);
		secondPassenger.setName("divya");
		secondPassenger.setAge(25);
		secondPassenger.setGender(Gender.FEMALE);
		secondPassenger.setMealType(MealType.NON_VEG);
	}

	@Test
	void testSuccessfulTicketBooking() {
		passengers.add(firstPassenger);
		passengers.add(secondPassenger);
		booking.setPassengers(passengers);
		when(ticketRepository.save(any(Booking.class))).thenReturn(booking);
		Booking result = ticketService.bookTicket(100L, booking);
		assertNotNull(result);
		assertEquals(10L, result.getBookingId());
		assertEquals(100L, result.getFlightId());
		assertEquals(101L, result.getUserId());
		assertEquals(BookingStatus.CONFIRMED, result.getStatus());
		assertNotNull(result.getPnr());
		assertNotNull(result.getBookingDate());
		verify(ticketRepository, times(1)).save(any(Booking.class));
	}

	@Test
	void testPassengerBookingMappingWithMultiplePassengers() {
		passengers.add(firstPassenger);
		passengers.add(secondPassenger);
		booking.setPassengers(passengers);
		when(ticketRepository.save(any(Booking.class))).thenReturn(booking);
		Booking result = ticketService.bookTicket(100L, booking);
		assertNotNull(result);
		assertEquals(booking, firstPassenger.getBooking());
		assertEquals(booking, secondPassenger.getBooking());
		verify(ticketRepository, times(1)).save(any(Booking.class));
	}

	@Test
	void testBookingWithSinglePassenger() {
		passengers.add(firstPassenger);
		booking.setPassengers(passengers);
		when(ticketRepository.save(any(Booking.class))).thenReturn(booking);
		Booking result = ticketService.bookTicket(110L, booking);
		assertNotNull(result);
		assertEquals(10L, result.getBookingId());
		assertEquals(110L, result.getFlightId());
		assertEquals(BookingStatus.CONFIRMED, result.getStatus());
		assertNotNull(result.getPnr());
		assertEquals(booking, firstPassenger.getBooking());
		verify(ticketRepository, times(1)).save(any(Booking.class));
	}

	@Test
	void testsuccessfullyGeneratePnr() {
		String pnr = ticketService.generatePnr();
		assertNotNull(pnr);
		assertTrue(pnr.startsWith("FL"));
		assertEquals(8, pnr.length());
	}

	@Test
	void testBookingWithNullFlightId() {
		passengers.add(firstPassenger);
		booking.setPassengers(passengers);
		assertThrows(InvalidBookingException.class, () -> {
			ticketService.bookTicket(null, booking);
		});
	}

	@Test
	void testBookingWithNegativeFlightId() {
		passengers.add(firstPassenger);
		booking.setPassengers(passengers);
		assertThrows(InvalidBookingException.class, () -> {
			ticketService.bookTicket(-10L, booking);
		});
	}

	@Test
	void testBookingWithNullBookingObject() {
		assertThrows(InvalidBookingException.class, () -> {
			ticketService.bookTicket(100L, null);
		});
	}

	@Test
	void testViewTicketByPnrSuccessfully() {
		passengers.add(firstPassenger);
		booking.setPassengers(passengers);
		booking.setPnr("FL23DC12");
		booking.setFlightId(100L);
		when(ticketRepository.findByPnr("FL23DC12")).thenReturn(Optional.of(booking));
		Booking result = ticketService.getTicketByPnr("FL23DC12");
		assertNotNull(result);
		assertEquals(10L, result.getBookingId());
		assertEquals(100L, result.getFlightId());
		assertEquals("FL23DC12", result.getPnr());
		assertNotNull(result.getPassengers());
		assertEquals("Ram", result.getPassengers().get(0).getName());
		assertEquals(20, result.getPassengers().get(0).getAge());
		assertEquals(Gender.MALE, result.getPassengers().get(0).getGender());
		assertEquals(MealType.VEG, result.getPassengers().get(0).getMealType());
		verify(ticketRepository, times(1)).findByPnr("FL23DC12");
	}

	@Test
	void testViewTicketByWrongPnr() {
		when(ticketRepository.findByPnr("FL121212")).thenReturn(Optional.empty());
		assertThrows(TicketNotFoundException.class, () -> {
			ticketService.getTicketByPnr("FL121212");
		});
		verify(ticketRepository, times(1)).findByPnr("FL121212");
	}

	@Test
	void testViewTicketByNullPnr() {
		when(ticketRepository.findByPnr(null)).thenReturn(Optional.empty());
		assertThrows(TicketNotFoundException.class, () -> {
			ticketService.getTicketByPnr(null);
		});
	}

}
