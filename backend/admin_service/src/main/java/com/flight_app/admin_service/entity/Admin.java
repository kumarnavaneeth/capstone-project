package com.flight_app.admin_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="admins")
public class Admin {
    @Column(name = "created_at")
    private java.sql.Date createdAt;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    private String email;
    
    public Long getId() {
    	return id;
    }
    public String getUsername() {
		return name;
    }
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() { 
		return email;
		}
    public void setEmail(String email)
    { this.email = email;
    }
    public java.sql.Date getCreatedAt() {
    	return createdAt; 
    	}
    public void setCreatedAt(java.sql.Date createdAt) {
    	this.createdAt = createdAt;
    }
}
