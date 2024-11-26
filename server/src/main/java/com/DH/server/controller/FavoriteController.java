package com.DH.server.controller;

import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.service.implement.FavoriteServiceImp;
import com.DH.server.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/favorites")
public class FavoriteController {

    private final AuthService authService;
    private final FavoriteServiceImp favoriteService;
    @GetMapping
    public ResponseEntity<?> getFavoritesByUser() {
        UserEntity authUser = this.authService.getAuthUser();
        List<Favorite> favorites = favoriteService.getFavoritesByUser(authUser);
        if (favorites.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No favorites found.");
        }
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long productId) {
        UserEntity authUser = this.authService.getAuthUser();
        try {
            favoriteService.addFavorite(authUser, productId);
            List<Favorite> updatedFavorites = favoriteService.getFavoritesByUser(authUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedFavorites);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long productId) {
        UserEntity authUser = this.authService.getAuthUser();
        try {
            favoriteService.removeFavorite(authUser, productId);
            List<Favorite> updatedFavorites = favoriteService.getFavoritesByUser(authUser);
            return ResponseEntity.ok(updatedFavorites);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}