package com.DH.server.controller;

import com.DH.server.model.entity.Favorite;
import com.DH.server.service.implement.FavoriteServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/favorites")
public class FavoriteController {
@Autowired
private FavoriteServiceImp favoriteService;
    @GetMapping("/{userId}")
    public List<Favorite> getFavorites(@PathVariable Long userId) {
        return favoriteService.getFavoritesByUser(userId);
    }
    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<String> addFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteService.addFavorite(userId, productId);
        return ResponseEntity.ok("Product added to favorites.");
    }
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteService.removeFavorite(userId, productId);
        return ResponseEntity.ok("Product removed from favorites.");
    }
}
