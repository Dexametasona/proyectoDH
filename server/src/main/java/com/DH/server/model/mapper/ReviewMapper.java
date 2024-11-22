package com.DH.server.model.mapper;

import com.DH.server.model.dto.request.ReviewReqDto;
import com.DH.server.model.dto.request.ReviewShoReqDto;
import com.DH.server.model.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public abstract class ReviewMapper {

    public abstract Review toEntity(ReviewReqDto request);

    public abstract Review toEntity(ReviewShoReqDto request);

    public abstract Review toResponse(Review response);
}
