package com.codecool.lucaVit.repository;

import com.codecool.lucaVit.enums.RoleType;
import com.codecool.lucaVit.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}