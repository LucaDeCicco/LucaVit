package com.codecool.lucaVit.controller;

import com.codecool.lucaVit.model.Announcement;
import com.codecool.lucaVit.payload.AnnouncementRequest;
import com.codecool.lucaVit.payload.FiltersRequest;
import com.codecool.lucaVit.service.AnnouncementService;
import com.codecool.lucaVit.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/announcement")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class AnnouncementController {

    private final AnnouncementService announcementService;

    private final UserService userService;

    public AnnouncementController(AnnouncementService announcementService, UserService userService) {
        this.announcementService = announcementService;
        this.userService = userService;
    }

    @PostMapping("/add")
    public void addAnnouncement(@RequestBody AnnouncementRequest request){
        announcementService.addAnnouncement(request);
    }

    @GetMapping("/getByNrCrt/{nrCrt}")
    public Announcement getAnnouncement(@PathVariable String nrCrt){
        return announcementService.getAnnouncementByNrCrt(Long.parseLong(nrCrt));
    }

    @GetMapping("/getById/{id}")
    public Announcement getAnnouncementById(@PathVariable String id){
        return announcementService.getAnnouncementById(Long.valueOf(id));
    }

    @PostMapping("/filter/{nrCrt}")
    public Announcement getFilteredAnnouncement(@PathVariable String nrCrt, @RequestBody FiltersRequest filtersRequest){
//        return announcementService.getFilteredAnnouncement(Long.valueOf(nrCrt), filtersRequest);
        return announcementService.getFilteredGptAnnouncement(filtersRequest, Long.valueOf(nrCrt));
    }

    @PostMapping("/addToFavorites/{announcementId}/{userId}")
    public void addAnnouncementsToFavorite(@PathVariable String announcementId, @PathVariable String userId){
        announcementService.addAnnouncementToFavorites(Long.valueOf(announcementId),Long.valueOf(userId));
    }

    @PostMapping("/removeFromFavorites/{announcementId}/{userId}")
    public void removeAnnouncementFromFavorites(@PathVariable String announcementId, @PathVariable String userId){
        announcementService.removeAnnouncementFromFavorites(Long.valueOf(announcementId), Long.valueOf(userId));
    }

    @GetMapping("/favoriteCheck/{announcementId}/{userId}")
    public boolean favoriteCheck(@PathVariable String announcementId, @PathVariable String userId){
        return announcementService.favoriteCheck(Long.valueOf(announcementId),Long.valueOf(userId));
    }

    @GetMapping("/getFavoriteAnnouncement/{userId}/{announcementCrt}")
    public Announcement getFavoriteAnnouncementByUserIdAndByAnnouncementCrt(@PathVariable String announcementCrt, @PathVariable String userId){
        return announcementService.getFavoriteAnnouncementByUserIdAndByAnnouncementCrt(Long.valueOf(userId), Long.valueOf(announcementCrt));
    }

    @GetMapping("/getMyAnnouncement/{userId}/{announcementCrt}")
    public Announcement getMyAnnouncement(@PathVariable String announcementCrt, @PathVariable String userId){
        return announcementService.getMyAnnouncement(Long.valueOf(announcementCrt), Long.valueOf(userId));
    }

}
