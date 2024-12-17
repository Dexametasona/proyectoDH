package com.DH.server.model.entity;

import com.DH.server.model.enums.Type;
import jakarta.persistence.*;
import lombok.*;


@Entity
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Characteristics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(columnDefinition = "TEXT")
    private String description;
}
