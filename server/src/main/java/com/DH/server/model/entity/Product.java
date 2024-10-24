package com.DH.server.model.entity;

import com.DH.server.model.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(length = 100)
  private String name;
  @Column(columnDefinition = "TEXT")
  private String description;
  private Double price;
  @Column(length = 50)
  private String brand;
  @Column(length = 20)
  @Enumerated(EnumType.STRING)
  private ProductStatus status;

  @PrePersist
  public void onCreate(){
    this.status = ProductStatus.AVAILABLE;
  }
}
