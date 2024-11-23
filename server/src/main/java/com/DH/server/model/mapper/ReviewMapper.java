package com.DH.server.model.mapper;

import com.DH.server.model.dto.request.ReviewReqDto;
import com.DH.server.model.dto.request.ReviewShortDto;
import com.DH.server.model.dto.response.ReviewResDto;
import com.DH.server.model.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public abstract class ReviewMapper {

    public abstract Review toEntity(ReviewReqDto request);

    public abstract Review toEntity(ReviewShortDto request);
    @Mapping(target = "author_id", source = "author.id")  // Mapea el id del autor
    @Mapping(target = "product_id", source = "product.id")  // Mapea el id del producto
    public abstract ReviewResDto toResponse(Review response);
}
