package com.flight_app.admin_service.dto;

public class AdminLoginRequest {
private String email;
private String password;

public String getEmail() {
	return email;
}
public void setEmail(String username) {
	this.email = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}

}
