package com.codecool.lucaVit.repository;

import com.codecool.lucaVit.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}