package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Review;

import java.util.List;

public interface ReviewService extends GenericService<Review>{

    Review create(Review entity, Long order_id);

    List <Review> getAllByProducts(Long product_id);

    List <Review> getAllByUsers(Long user_id);

    //Review updateById(Review entity,Long order_id))
}
