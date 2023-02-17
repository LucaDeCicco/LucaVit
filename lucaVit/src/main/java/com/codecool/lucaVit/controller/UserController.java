package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.repository.UserRepository;
import com.codecool.lucaVit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getAllEmails")
    public List<String> getAllEmails(){
        return userService.getAllEmails();
    }

    @GetMapping("/getAllUsernames")
    public List<String> getAllUsernames(){
        return userService.getAllUsernames();
    }
}
