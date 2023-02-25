package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.model.Specs;
import com.codecool.lucaVit.service.SpecsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/specs")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class SpecsController {

    private final SpecsService specsService;

    SpecsController(SpecsService specsService){this.specsService = specsService;}

    @GetMapping("/getAllSpecs")
    public Specs getAllSpecs(){
        return specsService.getSpecs();
    }
}
