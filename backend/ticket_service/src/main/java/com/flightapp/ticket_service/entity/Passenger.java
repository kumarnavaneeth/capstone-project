package com.flightapp.ticket_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Passenger {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long passengerId;
	    @NotBlank
	    private String name;
	    @Min(value=1)
	    private int age;
	    @NotNull
	    @Enumerated(EnumType.STRING)
	    private Gender gender;
	    @NotNull
	    @Enumerated(EnumType.STRING)
	    private MealType mealType;
	    @ManyToOne
	    @JoinColumn(name = "booking_id")
	    @JsonBackReference
	    private Booking booking;
}

