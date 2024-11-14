package com.DH.server.persistance;

import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.Role;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {
  default Page<UserEntity> findAllByFilter(
          Pageable page,
          String name,
          String lastname,
          Role role,
          String email,
          Boolean isDeleted
  ){
    return findAll((Root<UserEntity> root, CriteriaQuery<?> query, CriteriaBuilder builder)->{
      List<Predicate> predicates = new ArrayList<>();

      if(name != null){
        predicates.add(builder.like(root.get("name"), name+"%"));
      }
      if(lastname != null){
        predicates.add(builder.like(root.get("lastname"), lastname+"%"));
      }
      if(role != null){
        predicates.add(builder.equal(root.get("role"), role));
      }
      if(email != null){
        predicates.add(builder.like(root.get("email"), email+"%"));
      }
      if(isDeleted != null){
        predicates.add(builder.equal(root.get("isDeleted"), isDeleted));
      }

      return builder.and(predicates.toArray(new Predicate[0]));
    }, page);
  }

  @Modifying
  @Query("UPDATE UserEntity u SET u.isDeleted = :isDeleted WHERE u.id = :id")
  int updateIsDeleted(long id, boolean isDeleted);

  Optional<UserEntity> findByEmail(String email);
}
