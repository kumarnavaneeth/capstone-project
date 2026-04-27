package com.flight_app.admin_service.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flight_app.admin_service.entity.*;
public interface AdminRepository extends JpaRepository<Admin, Long>{
	Optional<Admin> findByEmail(String email);

}
