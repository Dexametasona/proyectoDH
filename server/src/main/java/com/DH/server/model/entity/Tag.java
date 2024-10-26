package com.DH.server.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(length = 80)
    private String name;

}
