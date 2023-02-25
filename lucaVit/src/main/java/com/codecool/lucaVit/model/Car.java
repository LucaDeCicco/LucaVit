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
    private GearBoxType gearBoxType;
    private int year;
    private Fuel combustible;
    private int km;
    private String vin;


    public Car(BodyType bodyType, Brand brand, GearBoxType gearBoxType, int year, Fuel combustible, int km, String vin) {
        this.bodyType = bodyType;
        this.brand = brand;
        this.gearBoxType = gearBoxType;
        this.year = year;
        this.combustible = combustible;
        this.km = km;
        this.vin = vin;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", bodyType=" + bodyType +
                ", brand=" + brand +
                ", gearBoxType=" + gearBoxType +
                ", year=" + year +
                ", combustible=" + combustible +
                ", km=" + km +
                ", vin='" + vin + '\'' +
                '}';
    }
}
