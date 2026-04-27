package com.flightapp.ticket_service.exceptions;

public class InvalidBookingException extends RuntimeException {
public InvalidBookingException(String message) {
	super(message);
}
}
