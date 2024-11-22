package com.DH.server.model.entity;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private int score;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private UserEntity author;

    @Column(updatable = false)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @OneToOne
    @JoinColumn(name = "order_id",nullable = false)
    private Order order;

    @PrePersist
    protected void onCreate(){
        this.date=LocalDateTime.now();
    }
}
