package com.flightapp.flight_service.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.flightapp.flight_service.dto.BookingEvent;
import com.flightapp.flight_service.service.FlightService;
@Service
public class BookingListener {
@Autowired
private FlightService flightService;
@KafkaListener(topics="booking-updates",groupId="flight-group")
public void consume(BookingEvent event) {
	if(event.getFlightId()!=null && event.getPassengerCount()!=null) {
		boolean isBusiness=event.getIsBusinessClass()!=null &&event.getIsBusinessClass();
		flightService.updateSeats(event.getFlightId(),event.getPassengerCount(),isBusiness);
	}
}
}
