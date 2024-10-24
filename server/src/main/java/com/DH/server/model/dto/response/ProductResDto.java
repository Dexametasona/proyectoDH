package com.DH.server.model.dto.response;

public record ProductResDto(
        long id,
        String name,
        String description,
        double price,
        String brand,
        int status
) {
}
