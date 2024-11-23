package com.DH.server.service.implement;

import com.DH.server.exception.CategoryException;
import com.DH.server.exception.ReviewException;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.Review;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.persistance.ReviewRepository;
import com.DH.server.service.interfaces.*;
import lombok.RequiredArgsConstructor;

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

        if (order.getReview() != null) {
            throw new IllegalArgumentException("Ya existe una reseña para esta orden:");
        }

        entity.setOrder(order);

        if (entity.getScore() < 1 || entity.getScore() > 5) {
            throw new IllegalArgumentException("El puntaje debe estar entre 1 y 5.");
        }

        entity.setProduct(order.getProduct());
        entity.setAuthor(authUser);

        if (entity.getDate() == null) {
            entity.setDate(LocalDateTime.now());
        }

        //convertir localdate a LocalDateTime
        if (!entity.getDate().isBefore(order.getShipEnd().atStartOfDay())) {

            Review review=this.reviewRepository.save(entity);
            order.setReview(review);
            productService.averageProductScore(review.getProduct().getId());
            return review;
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
        return this.reviewRepository.findById(id).orElseThrow(() ->new ReviewException(" not found by id: "+id)) ;

    }

    @Override
    public Review updateById(Long id, Review entity) {
        Review review= this.getById(id);
        UserEntity authUser = this.authService.getAuthUser();

        if (review.getAuthor().getId().equals(authUser.getId())) {

            if (entity.getComment() != null && !entity.getComment().isBlank()) {
                review.setComment(entity.getComment());
            }

            if (entity.getScore() >= 1 && entity.getScore() <= 5) {
                review.setScore(entity.getScore());
            }
        }

        Review reviewUpdated=this.reviewRepository.save(review);
        productService.averageProductScore(review.getProduct().getId());
        return reviewUpdated;
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
