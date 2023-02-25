package com.codecool.lucaVit.model;

import com.codecool.lucaVit.enums.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class Specs {
    private List<BodyType> bodyTypes;
    private List<Brand> brands;
    private List<County> counties;
    private List<Fuel> fuels;
    private List<GearBoxType> gearBoxTypes;
}
