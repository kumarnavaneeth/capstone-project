package com.flightapp.flight_service.controller;

import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Airline;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.AirlineStatus;
import com.flightapp.flight_service.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class FlightControllerTest {

    @Mock
    private FlightService flightService;

    @InjectMocks
    private FlightController flightController;

    private MockMvc mockMvc;

    @RestControllerAdvice
    static class TestExceptionHandler {
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<Map<String, String>> handle(RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", ex.getMessage()));
        }
    }
    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(flightController)
                .setControllerAdvice(new TestExceptionHandler())
                .build();
    }
    @Test
    public void testSearchFlights_Success() throws Exception {
        SearchRequest request = new SearchRequest("DELHI", "MUMBAI", LocalDate.of(2026, 5, 1), 1);
        when(flightService.searchFlights(request)).thenReturn(List.of(new FlightResponse()));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/search")
                .contentType("application/json")
                .content("{\"source\":\"DELHI\", \"destination\":\"MUMBAI\", \"travelDate\":\"2026-05-01\", \"numberOfTravellers\": 1}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1));
    }
    @Test
    public void testAddFlight_Failure() throws Exception {
        doThrow(new RuntimeException("Failed to add flight"))
                .when(flightService).addFlight(any(Flight.class));
        String flightJson = """
        {
          "airlineName":"TestAir",
          "flightNumber":"TA123",
          "source":"DELHI",
          "destination":"MUMBAI",
          "aircraftType":"Boeing737"
        }
        """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight")
                .contentType("application/json")
                .content(flightJson))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Failed to add flight"));
    }
    @Test
    public void testUpdateFlightStatus_Success() throws Exception {
        long flightId = 1L;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/{flightId}/status?status=AVAILABLE", flightId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").value("Flight status updated successfully"));
    }
    @Test
    public void testBlockAirline_Failure() throws Exception {
        doThrow(new RuntimeException("Airline not found"))
                .when(flightService).blockAirline(anyLong());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/airline/99/block"))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Airline not found"));
    }
    @Test
    public void testRegisterAirline_Success() throws Exception {
        Airline airline = new Airline();
        airline.setAirlineName("Indigo");
        airline.setContactNumber("9876543210");
        airline.setHeadquarters("Gurugram");
        airline.setStatus(AirlineStatus.ACTIVE);
        doReturn(airline).when(flightService).registerAirline(any());
        String airlineJson = """
        {
          "airlineName":"Indigo",
          "contactNumber":"9876543210",
          "headquarters":"Gurugram"
        }
        """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/airline/register")
                .contentType("application/json")
                .content(airlineJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.airlineName").value("Indigo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("ACTIVE"));
    }
    @Test
    public void testAddFlight_Success() throws Exception {
        Flight flight = new Flight();
        flight.setAirlineName("TestAir");
        doReturn(flight).when(flightService).addFlight(any(Flight.class));

        String flightJson = """
        {
          "airlineName":"TestAir",
          "flightNumber":"TA123",
          "source":"DELHI",
          "destination":"MUMBAI",
          "aircraftType":"Boeing737"
        }
        """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight")
                .contentType("application/json")
                .content(flightJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.airlineName").value("TestAir"));
    }
    @Test
    public void testUpdateFlightStatus_Failure() throws Exception{
    	doThrow(new RuntimeException("Flight not found"))
    	.when(flightService).updateFlightStatus(anyLong(), any());
    	mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/1/status?status=CANCELLED"))
    			.andExpect(MockMvcResultMatchers.status().isInternalServerError())
    			.andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Flight not found"));
    }
    @Test
    public void testSearchFlights_NoResults() throws Exception{
    	doReturn(List.of()).when(flightService).searchFlights(any(SearchRequest.class));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/search")
                .contentType("application/json")
                .content("{\"source\":\"DELHI\", \"destination\":\"MUMBAI\", \"travelDate\":\"2026-05-01\", \"numberOfTravellers\": 1}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));
    }
    @Test
    public void testBlockAirline_Success() throws Exception{
    	long airlineID = 1L;
    	mockMvc.perform(post("/api/v1.0/flight/airline/{airlineId}/block", airlineID))
    	.andExpect(status().isOk())
    	.andExpect(jsonPath("$").value("Airline blocked successfully"));
    }
    @Test
    public void testActivateAirline_Failure()throws Exception{
    	doThrow(new RuntimeException("Airline not found"))
    	.when(flightService).activateAirline(anyLong());
    	mockMvc.perform(post("/api/v1.0/flight/airline/99/activate"))
    	.andExpect(status().isInternalServerError())
    	.andExpect(jsonPath("$.message").value("Airline not found"));
    }
    @Test
    public void testRegisterAirlineSuccess() throws Exception{
    	Airline airline = new Airline();
    	airline.setAirlineName("Indigo");
    	airline.setContactNumber("9876543210");
        airline.setHeadquarters("");
        airline.setStatus(AirlineStatus.ACTIVE);

        doReturn(airline).when(flightService).registerAirline(any());
        String airlineJson = """
        {
          "airlineName":"Indigo",
          "contactNumber":"9876543210",
          "headquarters":"gurugram"
        }
        """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/airline/register")
                .contentType("application/json")
                .content(airlineJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.airlineName").value("Indigo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("ACTIVE"));
    }
    @Test
    public void testRegisterAirline_Failure() throws Exception {
        doThrow(new RuntimeException("Failed to register airline"))
                .when(flightService).registerAirline(any());
        String airlineJson = """
        {
          "airlineName":"Indigo",
          "contactNumber":"9876543210",
          "headquarters":"gurugram"
        }
        """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1.0/flight/airline/register")
                .contentType("application/json")
                .content(airlineJson))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Failed to register airline"));
    }
    	
 
}


