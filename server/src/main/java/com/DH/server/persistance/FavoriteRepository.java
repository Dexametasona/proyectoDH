package com.DH.server.persistance;

import com.DH.server.model.entity.Favorite;
import com.DH.server.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository <Favorite, Long> {
    List<Favorite> findByUser(UserEntity user);
    boolean existsByUserAndProductId(UserEntity user, Long productId);
    void deleteByUserAndProductId(UserEntity user, Long productId);
}
