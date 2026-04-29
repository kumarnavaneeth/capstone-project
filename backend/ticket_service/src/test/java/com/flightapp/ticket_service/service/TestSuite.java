package com.flightapp.ticket_service.service;


import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;
import org.junit.platform.suite.api.SuiteDisplayName;

@Suite
@SuiteDisplayName("Flight Service Test Suite")
@SelectPackages("com.flightapp.flight_service")
public class TestSuite {
}