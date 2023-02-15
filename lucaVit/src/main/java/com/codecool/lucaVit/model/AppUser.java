package com.codecool.lucaVit.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.*;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nonnull
    @Size(max = 20)
    private String username;
    @Nonnull
    @Size(max = 50)
    @Email
    private String email;
    @Nonnull
    @Size(max = 120)
    private String password;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public AppUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public AppUser(String username, String email, String password, Set<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}