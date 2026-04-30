package com.flightapp.flight_service.services;

import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Airline;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.AirlineStatus;
import com.flightapp.flight_service.enums.FlightStatus;
import com.flightapp.flight_service.repository.AirlineRepository;
import com.flightapp.flight_service.repository.FlightRepository;
import com.flightapp.flight_service.service.FlightService;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;


@ExtendWith(MockitoExtension.class)
public class FlightServiceTest {

    @Mock
    private FlightRepository flightRepository;

    @Mock
    private AirlineRepository airlineRepository;

    @InjectMocks
    private FlightService flightService;

    @Test
    void testAddFlightSuccess() {
        Flight flight = new Flight();
        when(flightRepository.save(flight)).thenReturn(flight);
        Flight result = flightService.addFlight(flight);
        assertNotNull(result);
    }

    @Test
    void testUpdateFlightStatus_FlightNotFound() {
        when(flightRepository.findById(99L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> flightService.updateFlightStatus(99L, FlightStatus.CANCELLED));
        assertEquals("Flight not found", ex.getMessage());
    }

    @Test
    void testBlockAirlineSuccess() {
        Airline airline = new Airline();
        airline.setStatus(AirlineStatus.ACTIVE);
        when(airlineRepository.findById(1L)).thenReturn(Optional.of(airline));
        when(airlineRepository.save(airline)).thenReturn(airline);
        flightService.blockAirline(1L);
        assertEquals(AirlineStatus.BLOCKED, airline.getStatus());
        verify(airlineRepository).save(airline);
    }

    @Test
    void testRegisterAirlineDefaultsToActive() {
        Airline airline = new Airline();
        airline.setStatus(null);
        when(airlineRepository.save(any(Airline.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Airline result = flightService.registerAirline(airline);
        assertEquals(AirlineStatus.ACTIVE, result.getStatus());
        verify(airlineRepository).save(result);
    }
    @Test
    void testSearchFlightsNoFlightsFound() {
        SearchRequest request = new SearchRequest("DELHI","MUMBAI", LocalDate.of(2026, 5, 1),1);
        when(flightRepository.searchFlights("DELHI","MUMBAI", request.getTravelDate(), FlightStatus.AVAILABLE))
                .thenReturn(List.of());

        List<FlightResponse> results = flightService.searchFlights(request);
        assertTrue(results.isEmpty());
    }

  
    @Test
    void testSearchFlightsBlockedAirline() {
        SearchRequest request = new SearchRequest();
        request.setSource("MANGALORE");
        request.setDestination("KASARAGOD");
        request.setTravelDate(LocalDate.of(2026, 5, 1));
        Flight flight = new Flight();
        flight.setAirlineName("EMIRATES");
        Airline airline = new Airline();
        airline.setStatus(AirlineStatus.BLOCKED);
        when(flightRepository.searchFlights(
                request.getSource(),
                request.getDestination(),
                request.getTravelDate(),
                FlightStatus.AVAILABLE))
                .thenReturn(List.of(flight));
        when(airlineRepository.findByAirlineName("EMIRATES"))
                .thenReturn(Optional.of(airline));
        assertThrows(RuntimeException.class,
                () -> flightService.searchFlights(request));
    }
    @Test
    void testUpdateFlightStatus() {
        Flight flight = new Flight();
        flight.setStatus(FlightStatus.AVAILABLE);
        when(flightRepository.findById(1L)).thenReturn(Optional.of(flight));
        when(flightRepository.save(flight)).thenReturn(flight);
        flightService.updateFlightStatus(1L, FlightStatus.CANCELLED);
        assertEquals(FlightStatus.CANCELLED, flight.getStatus());
        verify(flightRepository).save(flight);
    }
    @Test
    void testActivateAirlineSuccess() {
        Airline airline = new Airline();
        airline.setStatus(AirlineStatus.BLOCKED);
        when(airlineRepository.findById(1L)).thenReturn(Optional.of(airline));
        when(airlineRepository.save(airline)).thenReturn(airline);
        flightService.activateAirline(1L);
        assertEquals(AirlineStatus.ACTIVE, airline.getStatus());
        verify(airlineRepository).save(airline);
    }
    @Test
    void testAddFlightWithExistingStatus() {
        Flight flight = new Flight();
        flight.setStatus(FlightStatus.CANCELLED);
        when(flightRepository.save(flight)).thenReturn(flight);
        Flight result = flightService.addFlight(flight);
        assertEquals(FlightStatus.CANCELLED, result.getStatus());
        verify(flightRepository).save(flight);
    }
    @Test
    void testBlockAirlineNotFound() {
        when(airlineRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> flightService.blockAirline(99L));

        assertEquals("Airline not found", ex.getMessage());
    }
    @Test
    void testActivateAirlineNotFound() {
        when(airlineRepository.findById(99L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> flightService.activateAirline(99L));
        assertEquals("Airline not found", ex.getMessage());
    }
    @Test
    void testRegisterAirlineWithExistingStatus() {
        Airline airline = new Airline();
        airline.setStatus(AirlineStatus.BLOCKED);
        when(airlineRepository.save(any(Airline.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Airline result = flightService.registerAirline(airline);
        assertEquals(AirlineStatus.BLOCKED, result.getStatus());
        verify(airlineRepository).save(result);
    }

  
}