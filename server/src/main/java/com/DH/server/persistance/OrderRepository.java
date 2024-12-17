package com.DH.server.persistance;

import com.DH.server.model.entity.Order;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
  default Page<Order> findAllByFilter(
          Pageable page,
          Long userId,
          Long productId,
          LocalDate start,
          LocalDate end
  ) {
    return findAll((Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (userId != null) {
        predicates.add(builder.equal(root.get("user").get("id"), userId));
      }
      if (productId != null) {
        predicates.add(builder.equal(root.get("product").get("id"), productId));
      }
      if(start != null && end != null){
        predicates.add(builder.between(root.get("shipStart"), start, end));
      }
      return builder.and(predicates.toArray(new Predicate[0]));
    }, page);
  }
  @Query("SELECT o FROM Order o WHERE o.product.id = :productId AND o.shipEnd >= :date")
  List<Order> getOrdersByProductIdAndDate(long productId, LocalDate date);
}
