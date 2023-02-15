package com.codecool.lucaVit.model;

import com.codecool.lucaVit.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private BodyType bodyType;
    private Brand brand;
    private County county;
    private GearBoxType gearBoxType;
    private Long price;
    private int year;
    private Fuel combustible;
    private Long km;


    public Car(BodyType bodyType, Brand brand, County county, GearBoxType gearBoxType, Long price, int year, Fuel combustible, Long km) {
        this.bodyType = bodyType;
        this.brand = brand;
        this.county = county;
        this.gearBoxType = gearBoxType;
        this.price = price;
        this.year = year;
        this.combustible = combustible;
        this.km = km;
    }
}
