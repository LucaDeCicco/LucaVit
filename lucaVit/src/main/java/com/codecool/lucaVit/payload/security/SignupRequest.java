package com.codecool.lucaVit.payload.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 6)
    private String password;

    private Set<String> role;
}