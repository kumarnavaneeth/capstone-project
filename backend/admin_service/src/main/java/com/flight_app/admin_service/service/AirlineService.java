package com.flight_app.admin_service.service;

import com.flight_app.admin_service.dto.AirlineRequest;
import com.flight_app.admin_service.dto.AirlineResponse;
import java.util.List;

import com.flight_app.admin_service.dto.*;
public interface AirlineService {
AirlineResponse addAirline(AirlineRequest request);
List<AirlineResponse> getAllAirlines();
void blockAirline(Long airlineId);
}
