package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.enums.*;
import com.codecool.lucaVit.model.Car;
import com.codecool.lucaVit.repository.CarRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping()
    public String index() {
        return "homePage";
    }

    @GetMapping("/getAll")
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    @GetMapping("/getAllBrands")
    public List<Brand> getAllBrands(){
        List<Brand> brands = new ArrayList<>();
        Collections.addAll(brands, Brand.values());
        return brands;
    }

//    @GetMapping("/getAllSpecs")
//    public List<List<String>> getAllSpecs(){
//        List<List<String>> allSpecs = new ArrayList<>();
//        List<String> bodyTypes = new ArrayList<>();
//        Collections.addAll(bodyTypes, Arrays.toString(BodyType.values()));
//        allSpecs.add(bodyTypes);
//        List<String> brands = new ArrayList<>();
//        Collections.addAll(brands, Arrays.toString(Brand.values()));
//        allSpecs.add(brands);
//        List<String> fuels = new ArrayList<>();
//        Collections.addAll(fuels, Arrays.toString(Fuel.values()));
//        allSpecs.add(fuels);
//
//    }

    @PostMapping("/add")
    public void addCar(){
        Car car = new Car(BodyType.CABRIO, Brand.ALFA_ROMEO, County.ALBA, GearBoxType.AUTOMATIC, 10000L, 2008, Fuel.DIESEL, 150000L);
        carRepository.save(car);
    }
}
