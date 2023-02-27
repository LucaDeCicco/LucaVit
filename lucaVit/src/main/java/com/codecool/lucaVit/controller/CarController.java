package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.model.Car;
import com.codecool.lucaVit.repository.CarRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping("/getAll")
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

}
