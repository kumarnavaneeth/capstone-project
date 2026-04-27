package com.flight_app.admin_service.security;

import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtils {
private final String SECRET_KEY="adminSecretKey";
public String generatedToken(String email,String role) {
	return Jwts.builder()
			.setSubject(email)
			.claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();

}
}
