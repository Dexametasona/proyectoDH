package com.DH.server.service.implement;

import com.DH.server.model.dto.response.FavoriteResDto;
import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.ProductStatus;
import com.DH.server.persistance.FavoriteRepository;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.FavoriteService;
import com.DH.server.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImp implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final ProductService productService;
    private final AuthService authService;
    @Override
    public List<Favorite> getFavoritesByUser(UserEntity authUser) {
        return favoriteRepository.findByUser(authUser);
    }
    @Override
    public List<FavoriteResDto> addFavorite(UserEntity authUser, Long productId) {
        Product product = productService.getById(productId);
        if (product.getStatus() != ProductStatus.AVAILABLE) {
            throw new IllegalArgumentException("The product is not available and cannot be added to favorites.");
        } else if(!favoriteRepository.existsByUserAndProductId(authUser, productId)) {
            Favorite favorite = new Favorite();
            favorite.setUser(authUser);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("The product is already in your favorites.");
        }
        return favoriteRepository.findByUser(authUser).stream()
                .map(fav -> new FavoriteResDto(
                        fav.getProduct().getId(),
                        fav.getProduct().getName(),
                        fav.getProduct().getCategory().getTitle(),
                        fav.getProduct().getPhotos().getFirst().getUrl(),
                        fav.getProduct().getPrice()))
                .collect(Collectors.toList());
    }
    @Override
    @Transactional
    public List<FavoriteResDto> removeFavorite(UserEntity authUser, Long productId) {
        Product product = productService.getById(productId);
        if (!favoriteRepository.existsByUserAndProductId(authUser, productId)) {
            throw new IllegalArgumentException("The product is not in your favorites.");
        }
        favoriteRepository.deleteByUserAndProductId(authUser, productId);
        return favoriteRepository.findByUser(authUser).stream()
                .map(fav -> new FavoriteResDto(
                        fav.getProduct().getId(),
                        fav.getProduct().getName(),
                        fav.getProduct().getCategory().getTitle(),
                        fav.getProduct().getPhotos().getFirst().getUrl(),
                        fav.getProduct().getPrice()))
                .collect(Collectors.toList());
    }
}