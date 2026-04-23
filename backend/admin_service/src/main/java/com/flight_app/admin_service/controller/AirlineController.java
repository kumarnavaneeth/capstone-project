package com.flight_app.admin_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flight_app.admin_service.dto.AirlineRequest;
import com.flight_app.admin_service.dto.AirlineResponse;
import com.flight_app.admin_service.service.AirlineService;

import org.springframework.web.bind.annotation.RequestBody;
@RestController
@RequestMapping("/admin/airline")
public class AirlineController {

    private final AirlineService airlineService;

    public AirlineController(AirlineService airlineService) {
        this.airlineService = airlineService;
    }

    @PostMapping("/add")
    public AirlineResponse addAirline(@RequestBody AirlineRequest request) {
        return airlineService.addAirline(request);
    }
}
