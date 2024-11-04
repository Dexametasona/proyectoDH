package com.DH.server.model.entity;

import com.DH.server.model.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
public class Photo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 500)
  private String url;
}