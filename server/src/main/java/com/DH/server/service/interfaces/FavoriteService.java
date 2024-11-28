package com.DH.server.service.interfaces;

import com.DH.server.model.dto.response.FavoriteResDto;
import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.UserEntity;

import java.util.List;

public interface FavoriteService {
    List<Favorite> getFavoritesByUser(UserEntity user);
    List<FavoriteResDto> addFavorite(UserEntity user, Long productId);
    List<FavoriteResDto> removeFavorite(UserEntity user, Long productId);
}
