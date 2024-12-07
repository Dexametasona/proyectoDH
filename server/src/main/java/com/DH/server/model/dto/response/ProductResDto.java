package com.DH.server.model.dto.response;

import com.DH.server.model.entity.Characteristics;

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
        List<OrderShortDto> orders,
        Double avgScore,
        List<CharacteristicResDto> characteristics
) {
}
