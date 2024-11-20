package com.DH.server.model.dto.response;

import java.util.List;

public record ProductResDto(
        long id,
        String name,
        String description,
        double price,
        String brand,
        int status,
        CategoryResDto category,
        TagResDto tag,
        List<PhotoResDto> photos,
        List<OrderShortDto> orders
) {
}
