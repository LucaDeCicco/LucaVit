package com.codecool.lucaVit.service;

import com.codecool.lucaVit.enums.*;
import com.codecool.lucaVit.model.Specs;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SpecsService {

    public Specs getSpecs(){

        Specs specs = new Specs();

        List<BodyType> bodyTypes = new ArrayList<>();
        Collections.addAll(bodyTypes, BodyType.values());
        specs.setBodyTypes(bodyTypes);

        List<Brand> brands = new ArrayList<>();
        Collections.addAll(brands, Brand.values());
        specs.setBrands(brands);

        List<County> counties = new ArrayList<>();
        Collections.addAll(counties, County.values());
        specs.setCounties(counties);

        List<Fuel> fuels = new ArrayList<>();
        Collections.addAll(fuels, Fuel.values());
        specs.setFuels(fuels);

        List<GearBoxType> gearBoxTypes = new ArrayList<>();
        Collections.addAll(gearBoxTypes, GearBoxType.values());
        specs.setGearBoxTypes(gearBoxTypes);

        return specs;
    }

}
