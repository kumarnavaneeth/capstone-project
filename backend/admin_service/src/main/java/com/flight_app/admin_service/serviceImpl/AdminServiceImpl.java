package com.flight_app.admin_service.serviceImpl;

import org.springframework.stereotype.Service;

import com.flight_app.admin_service.dto.AdminLoginRequest;
import com.flight_app.admin_service.repository.AdminRepository;
import com.flight_app.admin_service.security.JwtUtils;
import com.flight_app.admin_service.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{
private final AdminRepository adminRepository;
private final JwtUtils jwtUtils;
public AdminServiceImpl(AdminRepository adminRepository,JwtUtils jwtUtils) {
	this.adminRepository=adminRepository;
	this.jwtUtils=jwtUtils;
}

@Override
    public String login(AdminLoginRequest request) {
        return "jwt-token";
    }


}
