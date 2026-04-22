package com.flight_app.admin_service.dto;

public class AirlineResponse {
	private Long id;
	private String name;
    private String status;
    
    public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
