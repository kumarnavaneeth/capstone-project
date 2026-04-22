package com.flightapp.ticket_service.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @Column(unique = true)
	    private String pnr;
	    private Long userId;
	    private Long flightId;//add total amount
	    private LocalDateTime bookingDate;
	    private String status;
	    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
	    @JsonManagedReference
	    private List<Passenger> passengers;
}
