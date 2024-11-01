package com.DH.server.persistance;

import com.DH.server.model.entity.Product;
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

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
  default Page<Product> findAllByFilter(
          Pageable page,
          Integer categoryId,
          Integer tagId,
          String name,
          String brand,
          Double priceLimitUpper,
          Double priceLimitLower
          ){
    return findAll((Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder builder)->{
      List<Predicate> predicates = new ArrayList<>();

      if(categoryId != null){
        predicates.add(builder.equal(root.get("category").get("id"), categoryId));
      }
      if(tagId != null){
        predicates.add(builder.equal(root.get("tag").get("id"), tagId));
      }
      if(name != null){
        predicates.add(builder.like(root.get("name"), name+"%"));
      }
      if(brand != null){
        predicates.add(builder.equal(root.get("brand"), brand));
      }
      if(priceLimitUpper != null && priceLimitLower != null){
        predicates.add(builder.between(root.get("price"), priceLimitLower, priceLimitUpper));
      }

      return builder.and(predicates.toArray(new Predicate[0]));
    }, page);
  };

  @Query("SELECT p FROM Product p ORDER BY function('RAND')")
  List<Product> findRandomProducts(Pageable pageable);
}
