package com.flight_app.admin_service.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flight_app.admin_service.dto.AirlineRequest;
import com.flight_app.admin_service.dto.AirlineResponse;
import com.flight_app.admin_service.entity.Airline;
import com.flight_app.admin_service.repository.AirlineRepository;
import com.flight_app.admin_service.service.AirlineService;

@Service
	public class AirlineServiceImpl implements AirlineService {
	    private final AirlineRepository airlineRepository;
	    public AirlineServiceImpl(AirlineRepository airlineRepository) {
	        this.airlineRepository = airlineRepository;
	    }
	    @Override
	    public AirlineResponse addAirline(AirlineRequest request) {
	        Airline airline = new Airline();
	        airline.setName(request.getName());
	        airline.setIsBlocked(false);
	        Airline saved = airlineRepository.save(airline);
	        AirlineResponse response = new AirlineResponse();
	        response.setId(saved.getId());
	        response.setName(saved.getName());
	        response.setIsBlocked(saved.getIsBlocked());
	        return response;
	    }
	    @Override
	    public List<AirlineResponse> getAllAirlines() {
	        return airlineRepository.findAll()
	                .stream()
	                .map(a -> {
	                    AirlineResponse response = new AirlineResponse();
	                    response.setId(a.getId());
	                    response.setName(a.getName());
	                    response.setIsBlocked(a.getIsBlocked());
	                    return response;
	                })
	                .toList();
	    }
		@Override
		public void blockAirline(Long airlineId) {
			// TODO Auto-generated method stub
			
		}

}
