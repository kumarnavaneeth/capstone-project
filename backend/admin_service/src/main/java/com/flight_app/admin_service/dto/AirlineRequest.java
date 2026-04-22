package com.flight_app.admin_service.dto;

public class AirlineRequest {
	private String name;
	private Boolean isBlocked;
    
	public Boolean getIsBlocked() {
		return isBlocked;
	}
	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
