package com.codecool.lucaVit.payload;

import com.codecool.lucaVit.enums.*;
import lombok.Getter;

@Getter
public class FiltersRequest {

    private BodyType bodyType;
    private Brand brand;
    private GearBoxType gearBoxType;
    private Fuel fuel;
    private int minYear;
    private int maxYear;
    private int minKm;
    private int maxKm;
    private int minPrice;
    private int maxPrice;
    private County county;

}
