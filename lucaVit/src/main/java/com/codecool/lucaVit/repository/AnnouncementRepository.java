package com.codecool.lucaVit.repository;

import com.codecool.lucaVit.enums.*;
import com.codecool.lucaVit.model.Announcement;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    Announcement getAnnouncementById(Long id);

    Announcement getAnnouncementByNrCrt(Long nrCrt);

    List<Announcement> findByCar_BodyTypeAndCar_BrandAndCar_GearBoxTypeAndCar_CombustibleAndCounty(
            BodyType bodyType,
            Brand brand,
            GearBoxType gearBoxType,
            Fuel fuel,
            County county
    );

    List<Announcement> findAnnouncementsByAppUser_Id(Long id);


    List<Announcement> findAll(Specification<Announcement> filterAnnouncements);
}
