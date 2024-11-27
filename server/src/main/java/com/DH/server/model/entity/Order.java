package com.DH.server.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;
  @Column(nullable = false)
  private LocalDate shipStart;
  @Column(nullable = false)
  private LocalDate shipEnd;
  private String shipAddress;
  @Column(nullable = false)
  private Double amount;
  @Column(nullable = false)
  private String remarks;

  @PrePersist
  public void onCreate(){
    this.createdAt = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "review_id",unique = true)
  private Review review;
}
