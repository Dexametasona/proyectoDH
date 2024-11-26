package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.UserEntity;

import java.util.List;

public interface FavoriteService {
    List<Favorite> getFavoritesByUser(UserEntity user);
    List<Favorite> addFavorite(UserEntity user, Long productId);
    List<Favorite> removeFavorite(UserEntity user, Long productId);
}
