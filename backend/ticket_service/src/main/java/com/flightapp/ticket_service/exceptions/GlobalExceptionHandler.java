package com.flightapp.ticket_service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<String> handleTicketNotFoundException(TicketNotFoundException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
    		.body(exception.getMessage());
}
@ExceptionHandler(Exception.class)
public ResponseEntity<String> handleGenericException(Exception exception){
	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	.body("something went wrong");
}
}
