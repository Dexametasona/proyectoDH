package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.request.FavoriteReqDto;
import com.DH.server.model.dto.response.FavoriteResDto;
import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.service.implement.FavoriteServiceImp;
import com.DH.server.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/favorites")
@Tag(name = "Favorites", description = "Endpoints for managing favorites")
public class FavoriteController {

    private final AuthService authService;
    private final FavoriteServiceImp favoriteService;
    @Operation(
            summary = "Get favorites by authenticated user",
            description = "Returns a list of favorites for the authenticated user")
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<FavoriteResDto>>> getFavoritesByUser() {
        UserEntity authUser = this.authService.getAuthUser();
        List<FavoriteResDto> favorites = favoriteService.getFavoritesByUser(authUser).stream()
                .map(fav -> new FavoriteResDto(
                        fav.getProduct().getId(),
                        fav.getProduct().getName(),
                        fav.getProduct().getBrand(),
                        fav.getProduct().getPrice()))
                .collect(Collectors.toList());
        if (favorites.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ApiResponseDto<>("No favorites found", favorites));
        }
              return ResponseEntity.ok(new ApiResponseDto<>(favorites));
    }
    @Operation(
            summary = "Add a product to favorites",
            description = "Adds a product to the authenticated user's favorites")
    @PostMapping()
    public ResponseEntity<ApiResponseDto<List<FavoriteResDto>>> addFavorite (@RequestBody FavoriteReqDto reqDto) {
        UserEntity authUser = this.authService.getAuthUser();
        List<FavoriteResDto> updatedFavorites = favoriteService.addFavorite(authUser, reqDto.getProductId()).stream().collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponseDto<>( updatedFavorites));
        }
    @Operation(
            summary = "Remove a product from favorites",
            description = "Removes a product from the authenticated user's favorites.")
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponseDto<List<FavoriteResDto>>> removeFavorite(@PathVariable Long productId) {
        UserEntity authUser = this.authService.getAuthUser();
        List<FavoriteResDto> updatedFavorites = favoriteService.removeFavorite(authUser, productId);
            return ResponseEntity.ok(
                    new ApiResponseDto<>(updatedFavorites));
    }
}