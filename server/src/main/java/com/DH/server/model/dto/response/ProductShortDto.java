package com.DH.server.model.dto.response;

public record ProductShortDto(
        long id,
        String name,
        String description,
        double price,
        CategoryResDto category,
        TagResDto tag,
        String photoUrl
) {
}
