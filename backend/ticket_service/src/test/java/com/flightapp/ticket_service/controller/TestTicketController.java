package com.flightapp.ticket_service.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.flightapp.ticket_service.entity.Booking;
import com.flightapp.ticket_service.entity.Gender;
import com.flightapp.ticket_service.entity.MealType;
import com.flightapp.ticket_service.entity.Passenger;
import com.flightapp.ticket_service.exceptions.TicketNotFoundException;
import com.flightapp.ticket_service.service.TicketService;

import tools.jackson.databind.ObjectMapper;

@WebMvcTest(TicketController.class)
class TestTicketController {
	@Autowired
	private MockMvc mockMvc;
	@MockitoBean
	TicketService ticketService;
	@Autowired
	ObjectMapper objectMapper;
	private Booking booking;
	private Passenger firstPassenger;
	private Passenger secondPassenger;

	@BeforeEach
	void setup() {
		firstPassenger = new Passenger();
		firstPassenger.setPassengerId(1L);
		firstPassenger.setName("Ram");
		firstPassenger.setAge(25);
		firstPassenger.setGender(Gender.MALE);
		firstPassenger.setMealType(MealType.VEG);
		secondPassenger = new Passenger();
		secondPassenger.setPassengerId(2L);
		secondPassenger.setName("Divya");
		secondPassenger.setAge(23);
		secondPassenger.setGender(Gender.FEMALE);
		secondPassenger.setMealType(MealType.NON_VEG);
		booking = new Booking();
		booking.setBookingId(10L);
		booking.setPassengers(Arrays.asList(firstPassenger, secondPassenger));
		firstPassenger.setBooking(booking);
		secondPassenger.setBooking(booking);
	}

	@Test
	void testSuccessfulTicketBooking() throws Exception {
		when(ticketService.bookTicket(any(Long.class), any(Booking.class))).thenReturn(booking);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isCreated())
				.andExpect(content().string("10"));
		verify(ticketService, times(1)).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNullPassenger() throws Exception {
		Booking invalidBooking = new Booking();
		invalidBooking.setPassengers(null);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(invalidBooking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithEmptyPassenger() throws Exception {
		Booking invalidBooking = new Booking();
		invalidBooking.setPassengers(Arrays.asList());
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(invalidBooking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithEmptyPassengerName() throws Exception {
		firstPassenger.setName("");
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNullPassengerName() throws Exception {
		firstPassenger.setName(null);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNegativeAge() throws Exception {
		firstPassenger.setAge(-10);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithZeroAge() throws Exception {
		firstPassenger.setAge(0);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithEmptyPassengerNameAndNegativeAge() throws Exception {
		firstPassenger.setName("");
		firstPassenger.setAge(-10);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithWhiteSpacePassengerName() throws Exception {
		firstPassenger.setName("  ");
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNullGenderType() throws Exception {
		firstPassenger.setGender(null);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNullMealType() throws Exception {
		firstPassenger.setMealType(null);
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(booking))).andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testTicketBookingWithNullRequestBody() throws Exception {
		mockMvc.perform(post("/api/v1.0/flight/booking/100").contentType(MediaType.APPLICATION_JSON).content(""))
				.andExpect(status().isBadRequest());
		verify(ticketService, never()).bookTicket(any(Long.class), any(Booking.class));
	}

	@Test
	void testViewTicketByInvalidPnr() throws Exception {
		when(ticketService.getTicketByPnr("FL23DS12")).thenThrow(new TicketNotFoundException(""));
		mockMvc.perform(get("/api/v1.0/flight/ticket/FL23DS12")).andExpect(status().isNotFound());
		verify(ticketService, times(1)).getTicketByPnr("FL23DS12");
	}

	@Test
	void testViewTicketWithValidPnr() throws Exception {
		booking.setFlightId(110L);
		booking.setPnr("FL123456");
		when(ticketService.getTicketByPnr("FL123456")).thenReturn(booking);
		mockMvc.perform(get("/api/v1.0/flight/ticket/FL123456")).andExpect(status().isOk())
				.andExpect(jsonPath("$.bookingId").value(10L)).andExpect(jsonPath("$.pnr").value("FL123456"))
				.andExpect(jsonPath("$.flightId").value(110L)).andExpect(jsonPath("$.passengers[0].name").value("Ram"))
				.andExpect(jsonPath("$.passengers[0].age").value(25))
				.andExpect(jsonPath("$.passengers[0].gender").value("MALE"))
				.andExpect(jsonPath("$.passengers[0].mealType").value("VEG"));
		verify(ticketService, times(1)).getTicketByPnr("FL123456");
	}
}
