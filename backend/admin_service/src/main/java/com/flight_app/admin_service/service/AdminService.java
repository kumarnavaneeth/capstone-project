package com.flight_app.admin_service.service;

import com.flight_app.admin_service.dto.AdminLoginRequest;
  
public interface AdminService {
	String login(AdminLoginRequest request);
}
