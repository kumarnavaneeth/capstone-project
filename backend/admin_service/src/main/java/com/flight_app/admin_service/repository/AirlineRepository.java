package com.flight_app.admin_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flight_app.admin_service.entity.Airline;

public interface AirlineRepository extends JpaRepository<Airline,Long>{

}
