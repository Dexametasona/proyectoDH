package com.DH.server.service.implement;

import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.persistance.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImp {
    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }
    public void addFavorite(Long userId, Long productId) {
        if (!favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            Favorite favorite = new Favorite();
            UserEntity user = new UserEntity();
            user.setId(userId);
            Product product = new Product();
            product.setId(productId);

            favorite.setUser(user);
            favorite.setProduct(product);
            favoriteRepository.save(favorite);
        }
}
    public void removeFavorite(Long userId, Long productId) {
        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }
}