package com.DH.server.model.dto.response;

public record ProductShortDto(
        long id,
        String name,
        double price,
        CategoryResDto category,
        TagResDto tag,
        String photoUrl
) {
}
