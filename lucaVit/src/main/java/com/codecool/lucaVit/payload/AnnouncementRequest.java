package com.codecool.lucaVit.payload;

import com.codecool.lucaVit.enums.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import java.util.List;

@Getter
public class AnnouncementRequest {

    @NotNull
    private BodyType bodyType;
    @NotNull
    private Brand brand;
    @NotNull
    private GearBoxType gearBoxType;
    @NotNull
    private Fuel fuel;
    @Min(1)
    private int year;
    private int km;
    @NotBlank
    private String vin;
    @NotBlank
    private String description;
    @NotEmpty
    private List<String> images;
    @Min(1)
    private int price;
    @NotNull
    private County county;
    @NotBlank
    private String contact;
    private String authorName;

}
