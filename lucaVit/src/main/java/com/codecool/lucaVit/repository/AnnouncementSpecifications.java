package com.codecool.lucaVit.repository;

import com.codecool.lucaVit.enums.*;
import com.codecool.lucaVit.model.Announcement;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class AnnouncementSpecifications {

    public static Specification<Announcement> filterAnnouncements(
            BodyType bodyType,
            Brand brand,
            GearBoxType gearBoxType,
            Fuel fuel,
            Integer minYear,
            Integer maxYear,
            Integer minKm,
            Integer maxKm,
            Integer minPrice,
            Integer maxPrice,
            County county) {

        return new Specification<Announcement>() {
            @Override
            public Predicate toPredicate(Root<Announcement> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();

                if (bodyType != null) {
                    predicates.add(criteriaBuilder.equal(root.get("car").get("bodyType"), bodyType));
                }
                if (brand != null) {
                    predicates.add(criteriaBuilder.equal(root.get("car").get("brand"), brand));
                }
                if (gearBoxType != null) {
                    predicates.add(criteriaBuilder.equal(root.get("car").get("gearBoxType"), gearBoxType));
                }
                if (fuel != null) {
                    predicates.add(criteriaBuilder.equal(root.get("car").get("fuel"), fuel));
                }
                if (minYear != 0) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("car").get("year"), minYear));
                }
                if (maxYear != 0) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("car").get("year"), maxYear));
                }
                if (minKm != 0) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("car").get("km"), minKm));
                }
                if (maxKm != 0) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("car").get("km"), maxKm));
                }
                if (minPrice != 0) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
                }
                if (maxPrice != 0) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
                }
                if (county != null) {
                    predicates.add(criteriaBuilder.equal(root.get("county"), county));
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
