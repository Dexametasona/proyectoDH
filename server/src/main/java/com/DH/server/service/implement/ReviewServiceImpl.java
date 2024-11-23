package com.DH.server.service.implement;

import com.DH.server.exception.CategoryException;
import com.DH.server.exception.ReviewException;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.Review;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.persistance.OrderRepository;
import com.DH.server.persistance.ProductRepository;
import com.DH.server.persistance.ReviewRepository;
import com.DH.server.persistance.UserRepository;
import com.DH.server.service.interfaces.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderService orderService;
    private final AuthService authService;
    private final ProductService productService;

    @Override
    public Review create(Review entity) {

        UserEntity authUser = this.authService.getAuthUser();

        Order order = orderService.getById(entity.getOrder().getId());

        entity.setProduct(order.getProduct());
        entity.setAuthor(authUser);

        //convertir localdate a LocalDateTime
        if (!entity.getDate().isBefore(order.getShipEnd().atStartOfDay())) {

            productService.averageProductScore(entity.getProduct().getId());
            return this.reviewRepository.save(entity);
        }

        throw new IllegalArgumentException("La fecha de reserva es posterior a la fecha de reseña");
    }

    @Override
    public List<Review> getAllByProducts(Long product_id) {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getAllByUsers(Long user_id) {
        return null;
    }

    @Override
    public Review getById(Long id) {
        return this.reviewRepository.findById(id).orElseThrow(() ->new ReviewException("Review not found by id: "+id)) ;

    }

    @Override
    public Review updateById(Long id, Review entity) {
        Review review= this.getById(id);
        UserEntity authUser = this.authService.getAuthUser();
        if (review.getAuthor().getId().equals(authUser.getId())) {
            review.setComment(entity.getComment());
            review.setScore(entity.getScore());
        }
        productService.averageProductScore(entity.getProduct().getId());
        return this.reviewRepository.save(review);
    }

    @Override
    public void deleteById(Long id) {
        this.getById(id);
        this.reviewRepository.deleteById(id);
    }

    @Override
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

}
