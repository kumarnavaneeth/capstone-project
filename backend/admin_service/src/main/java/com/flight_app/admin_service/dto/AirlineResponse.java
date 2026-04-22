package com.flight_app.admin_service.dto;

public class AirlineResponse {
	private Long id;
	private String name;
	private Boolean isBlocked;
    
 public AirlineResponse() {}
    public AirlineResponse(Long id, String name, Boolean isBlocked) {
		this.id = id;
        this.name = name;
        this.isBlocked = isBlocked;
    }
    public Long getId() {
		return id;
	}
    public void setId(Long id) {
    	this.id=id;
    }
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getIsBlocked() {
		return isBlocked;
	}
	 public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
		}
}
