package com.codecool.lucaVit.service;

import com.codecool.lucaVit.model.Announcement;
import com.codecool.lucaVit.model.AppUser;
import com.codecool.lucaVit.model.Car;
import com.codecool.lucaVit.payload.AnnouncementRequest;
import com.codecool.lucaVit.payload.FiltersRequest;
import com.codecool.lucaVit.repository.AnnouncementRepository;
import com.codecool.lucaVit.repository.CarRepository;
import com.codecool.lucaVit.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public AnnouncementService(AnnouncementRepository announcementRepository, CarRepository carRepository, UserRepository userRepository, UserService userService) {
        this.announcementRepository = announcementRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public void addAnnouncement(AnnouncementRequest announcementRequest){
        Car car = new Car(announcementRequest.getBodyType(),
                announcementRequest.getBrand(),
                announcementRequest.getGearBoxType(),
                announcementRequest.getYear(),
                announcementRequest.getFuel(),
                announcementRequest.getKm(),
                announcementRequest.getVin()
        );
        carRepository.save(car);
        List<Announcement> announcementList = announcementRepository.findAll();
        Long biggestCrt = 0L;
        for (Announcement announcement : announcementList) {
            if (announcement.getNrCrt()>biggestCrt){
                biggestCrt= announcement.getNrCrt();
            }
        }
        AppUser appUser = userRepository.findByUsername(announcementRequest.getAuthorName()).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + announcementRequest.getAuthorName()));;
        Announcement announcement = new Announcement(car,
                announcementRequest.getDescription(),
                announcementRequest.getImages(),
                announcementRequest.getPrice(),
                announcementRequest.getCounty(),
                announcementRequest.getContact(),
                biggestCrt+1,
                appUser
        );
        announcementRepository.save(announcement);
    }

    public Announcement getAnnouncementByNrCrt(Long nrCrt){
        List<Announcement> announcementList = announcementRepository.findAll();
        if (announcementList.size()>0&&nrCrt-1<announcementList.size()){
            return announcementList.get((int) (nrCrt-1));
        }
        return null;

    }

    public Announcement getAnnouncementById(Long id){
        Announcement announcement = announcementRepository.getAnnouncementById(id);
        announcement.setViews(announcement.getViews()+1);
        announcementRepository.save(announcement);
        return announcement;
    }

    public List<Announcement> getFilteredAnnouncements(FiltersRequest filtersRequest){
        List<Announcement> announcementList = announcementRepository.findByCar_BodyTypeAndCar_BrandAndCar_GearBoxTypeAndCar_CombustibleAndCounty(
                filtersRequest.getBodyType(),
                filtersRequest.getBrand(),
                filtersRequest.getGearBoxType(),
                filtersRequest.getFuel(),
                filtersRequest.getCounty()
        );
        System.out.println(announcementList);
        return announcementList;
    }


    public Announcement getDbFilteredAnnouncement(FiltersRequest filtersRequest, Long nrCrt) {
        List<Announcement> announcements = announcementRepository.findAll(
                AnnouncementSpecifications.filterAnnouncements(
                        filtersRequest.getBodyType(),
                        filtersRequest.getBrand(),
                        filtersRequest.getGearBoxType(),
                        filtersRequest.getFuel(),
                        filtersRequest.getMinYear(),
                        filtersRequest.getMaxYear(),
                        filtersRequest.getMinKm(),
                        filtersRequest.getMaxKm(),
                        filtersRequest.getMinPrice(),
                        filtersRequest.getMaxPrice(),
                        filtersRequest.getCounty()
                )
//                Sort.by(Sort.Direction.ASC, "id")
        );
        if (nrCrt-1<announcements.size()&&announcements.size()>0){
            return announcements.get((int) (nrCrt-1));
        }
        return null;
    }


    public Announcement getFilteredAnnouncement(Long nrCrt, FiltersRequest filtersRequest){
        List<Announcement> announcementList = announcementRepository.findAll();
        List<Announcement> filteredAnnouncementList = new ArrayList<>();
        boolean alreadyFiltered = false;
        if (filtersRequest.getBodyType()!=null){
            alreadyFiltered = true;
            for (Announcement announcement : announcementList) {
                if (announcement.getCar().getBodyType()==filtersRequest.getBodyType()){
                    filteredAnnouncementList.add(announcement);
                }
            }
        }
        List<Announcement> rawList = new ArrayList<>();
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getBrand()!=null){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getBrand()==filtersRequest.getBrand()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getGearBoxType()!=null){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getGearBoxType()==filtersRequest.getGearBoxType()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getFuel()!=null){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getCombustible()==filtersRequest.getFuel()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMinYear()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getYear()>=filtersRequest.getMinYear()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMaxYear()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getYear()<=filtersRequest.getMaxYear()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMinKm()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getKm()>=filtersRequest.getMinKm()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMaxKm()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCar().getKm()<=filtersRequest.getMaxKm()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMinPrice()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getPrice()>=filtersRequest.getMinPrice()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getMaxPrice()>0){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getPrice()<=filtersRequest.getMaxPrice()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0){
            rawList = filteredAnnouncementList;
        }
        else {
            if (!alreadyFiltered){
                rawList = announcementList;
            }
        }
        if (filtersRequest.getCounty()!=null){
            List<Announcement> updatedFilteredList = new ArrayList<>();
            alreadyFiltered = true;
            for (Announcement announcement : rawList) {
                if (announcement.getCounty()==filtersRequest.getCounty()){
                    updatedFilteredList.add(announcement);
                }
            }
            filteredAnnouncementList = updatedFilteredList;
        }
        if (filteredAnnouncementList.size()>0&&nrCrt-1<filteredAnnouncementList.size()){
            return filteredAnnouncementList.get((int) (nrCrt-1));
        }
        else if (!alreadyFiltered){
            if (nrCrt-1<announcementList.size()&&announcementList.size()>0){
                return announcementList.get((int) (nrCrt-1));
            }
        }
        return null;
    }


    public void addAnnouncementToFavorites(Long announcementId, Long userId){
        AppUser user = userRepository.getReferenceById(userId);
        List<Long> favoriteAnnouncements = user.getFavoriteAnnouncements();
        favoriteAnnouncements.add(announcementId);
        user.setFavoriteAnnouncements(favoriteAnnouncements);
        userRepository.save(user);
    }

    public void removeAnnouncementFromFavorites(Long announcementId, Long userId){
        AppUser user = userRepository.getReferenceById(userId);
        List<Long> favoriteAnnouncements = user.getFavoriteAnnouncements();
        List<Long> updatedFavoriteAnnouncements = new ArrayList<>();
        for (Long favoriteAnnouncement : favoriteAnnouncements) {
            if (!Objects.equals(favoriteAnnouncement, announcementId)){
                updatedFavoriteAnnouncements.add(favoriteAnnouncement);
            }
        }
        user.setFavoriteAnnouncements(updatedFavoriteAnnouncements);
        userRepository.save(user);
    }

    public boolean favoriteCheck(Long announcementId, Long userId){
        boolean result = false;
        AppUser user = userRepository.getReferenceById(userId);
        for (Long favoriteAnnouncementId : user.getFavoriteAnnouncements()) {
            if (Objects.equals(favoriteAnnouncementId, announcementId)) {
                result = true;
                break;
            }
        }
        return result;
    }

    public Announcement getFavoriteAnnouncementByUserIdAndByAnnouncementCrt(Long userId, Long announcementCrt){
        AppUser user = userRepository.getReferenceById(userId);
        List<Long> favoriteAnnouncementsIds = user.getFavoriteAnnouncements();
        List<Announcement> favoriteAnnouncements = new ArrayList<>();
        List<Announcement> announcementList = announcementRepository.findAll();
        for (Announcement announcement : announcementList) {
            for (Long favoriteAnnouncementsId : favoriteAnnouncementsIds) {
                if (Objects.equals(announcement.getId(), favoriteAnnouncementsId)){
                    favoriteAnnouncements.add(announcement);
                }
            }
        }
        if (announcementCrt-1<favoriteAnnouncements.size()&&favoriteAnnouncements.size()>0){
            return favoriteAnnouncements.get((int)(announcementCrt-1));
        }
        return null;
    }

    public Announcement getMyAnnouncement(Long announcementCrt, Long userId){
        List<Announcement> userAnnouncements = announcementRepository.findAnnouncementsByAppUser_Id(userId);
        if (announcementCrt-1<userAnnouncements.size()&&userAnnouncements.size()>0){
            return userAnnouncements.get((int)(announcementCrt-1));
        }
        return null;
    }
}