package com.codecool.lucaVit.model;

import com.codecool.lucaVit.enums.County;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @Column(name = "text", length=10485760)
    private String description;

    @ElementCollection
    @Column(name = "text", length=10485760)
    private List<String> images;

    private int price;

    private County county;

    private String contact;

    private Long nrCrt;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    private LocalDateTime date;

    public Announcement(Car car, String description, List<String> images, int price, County county, String contact, Long nrCrt, AppUser appUser) {
        this.car = car;
        this.description = description;
        this.images = images;
        this.price = price;
        this.county = county;
        this.contact = contact;
        this.nrCrt = nrCrt;
        this.appUser = appUser;
        this.date= LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Announcement{" +
                "id=" + id +
                ", car=" + car +
                ", description='" + description + '\'' +
                ", images=" + images +
                ", price=" + price +
                ", county=" + county +
                ", contact='" + contact + '\'' +
                ", nrCrt=" + nrCrt +
                ", appUser=" + appUser +
                ", date=" + date +
                '}';
    }
}
