package com.codecool.lucaVit.payload.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
//    @JsonProperty("name")
    private String username;

    @NotBlank
    private String password;

    private Set<String> role;
}