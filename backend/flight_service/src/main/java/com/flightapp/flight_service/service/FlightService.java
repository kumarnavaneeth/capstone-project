package com.flightapp.flight_service.service;

import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;
    
    public List<Flight> searchFlights(String source, String destination, String travelDate, String tripType) {
      
    	if("ROUND_TRIP".equalsIgnoreCase(tripType)) {
    		return flightRepository.findBySourceAndDestination(source, destination);
    	}
    	
    	return flightRepository.findBySourceAndDestination(source, destination);
   
    }
}