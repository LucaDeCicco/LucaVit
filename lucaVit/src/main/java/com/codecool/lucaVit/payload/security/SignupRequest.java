package com.codecool.lucaVit.payload.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {

//    @Size(min = 3, max = 40)
    @NotBlank
    @Email
    @NotEmpty
    private String email;


//    @JsonProperty("name")
//    @NotBlank
//    @Size(min = 3, max = 40)
    @NotEmpty
    private String username;

//    @NotBlank
    @Size(min = 6)
    @NotEmpty
    private String password;

    private Set<String> role;
}