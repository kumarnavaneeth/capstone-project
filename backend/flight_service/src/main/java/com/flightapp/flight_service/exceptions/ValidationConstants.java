package com.flightapp.flight_service.exceptions;

public class ValidationConstants {

    public static final String CITY_PATTERN = "^[A-Za-z ]+$";
    public static final String FLIGHT_NUMBER_PATTERN = "^[A-Z]{2}[0-9]{1,4}$";
    public static final String AIRCRAFT_TYPE_PATTERN = "^[A-Za-z0-9\\- ]+$";

    private ValidationConstants() {
    }
}