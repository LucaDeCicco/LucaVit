package com.codecool.lucaVit.service;

import com.codecool.lucaVit.model.Announcement;
import com.codecool.lucaVit.model.AppUser;
import com.codecool.lucaVit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository){this.userRepository = userRepository;}

    public List<String> getAllEmails(){
        List<String> emails = new ArrayList<>();
        for (AppUser appUser : userRepository.findAll()) {
            emails.add(appUser.getEmail());
        }
        return emails;
    }

    public List<String> getAllUsernames(){
        List<String> usernames = new ArrayList<>();
        for (AppUser appUser : userRepository.findAll()) {
            usernames.add(appUser.getUsername());
        }
        return usernames;
    }

}
