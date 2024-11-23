package com.DH.server.persistance;

import com.DH.server.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT AVG(r.score) FROM Review r WHERE r.order.product.id = :product_id")
    Double averageScorebyProduct (@Param("product_id") Long product_id);

    List<Review> findByAuthorId(Long author_id);
}
