package com.flight_app.admin_service.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="airlines")
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "is_blocked")
    private Boolean isBlocked;
    
    public Airline() {
    }
    
    public Long getId() {
    	return id;
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
