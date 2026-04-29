package com.flightapp.ticket_service.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> handleJsonError(HttpMessageNotReadableException httpMessageNotReadableException){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid input");
	}
	@ExceptionHandler(TicketNotFoundException.class)
	public ResponseEntity<String> handleTicketNotFoundException(TicketNotFoundException ticketNotFoundException) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ticketNotFoundException.getMessage());
	}
	@ExceptionHandler(InvalidBookingException.class)
	public ResponseEntity<String> handleInvalidBookingException(InvalidBookingException invalidBookingException) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(invalidBookingException.getMessage());
}
	    @ResponseStatus(HttpStatus.BAD_REQUEST)
	    @ExceptionHandler(MethodArgumentNotValidException.class)
	    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
	        Map<String, String> errors = new HashMap<>();
	        ex.getBindingResult().getFieldErrors().forEach(error ->
	            errors.put(error.getField(), error.getDefaultMessage())
	        );
	        return errors;
	    }

	    @ResponseStatus(HttpStatus.NOT_FOUND)
	    @ExceptionHandler(org.springframework.web.server.ResponseStatusException.class)
	    public Map<String, String> handleNotFound(org.springframework.web.server.ResponseStatusException ex) {
	        Map<String, String> error = new HashMap<>();
	        error.put("error", ex.getReason());
	        return error;
	    }
	}


