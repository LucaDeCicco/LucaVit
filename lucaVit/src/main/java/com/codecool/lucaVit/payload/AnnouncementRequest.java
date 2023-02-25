package com.codecool.lucaVit.payload;

import com.codecool.lucaVit.enums.*;
import lombok.Getter;
import java.util.List;

@Getter
public class AnnouncementRequest {

    private BodyType bodyType;
    private Brand brand;
    private GearBoxType gearBoxType;
    private Fuel fuel;
    private int year;
    private int km;
    private String vin;
    private String description;
    private List<String> images;
    private int price;
    private County county;
    private String contact;
    private String authorName;

}
