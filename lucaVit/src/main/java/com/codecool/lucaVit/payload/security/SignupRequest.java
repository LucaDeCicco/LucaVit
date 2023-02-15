package com.codecool.lucaVit.payload.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    @NotNull
    @JsonProperty("name")
    private String username;

    @NotNull
    @Email
    private String email;
    private Set<String> role;

    @NotNull
    private String password;
}