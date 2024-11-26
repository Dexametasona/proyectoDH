package com.DH.server.service.implement;

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

import java.util.List;

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
    public List<Favorite> addFavorite(UserEntity authUser, Long productId) {
        Product product = productService.getById(productId);
        if (product.getStatus() != ProductStatus.AVAILABLE) {
            throw new IllegalArgumentException("The product is not available and cannot be added to favorites.");
        } else if(!favoriteRepository.existsByUserAndProductId(authUser, productId)) {
            Favorite favorite = new Favorite();
            authUser.setId(authUser.getId());
            product.setId(productId);
            favorite.setUser(authUser);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("The product is already in your favorites.");
        }
        return getFavoritesByUser(authUser);
    }
    @Override
    public List<Favorite> removeFavorite(UserEntity authUser, Long productId) {
        if (!favoriteRepository.existsByUserAndProductId(authUser, productId)) {
            throw new IllegalArgumentException("The product is not in your favorites.");
        }
        favoriteRepository.deleteByUserAndProductId(authUser, productId);
        return getFavoritesByUser(authUser);
    }
}