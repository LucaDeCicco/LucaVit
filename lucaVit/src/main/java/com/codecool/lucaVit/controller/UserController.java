package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/getAllEmails")
    public List<String> getAllEmails(){
        return userService.getAllEmails();
    }

    @GetMapping("/getAllUsernames")
    public List<String> getAllUsernames(){
        return userService.getAllUsernames();
    }

}
