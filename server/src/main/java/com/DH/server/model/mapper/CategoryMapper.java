package com.DH.server.model.mapper;


import com.DH.server.model.dto.request.CategoryReqDto;
import com.DH.server.model.dto.response.CategoryResDto;
import com.DH.server.model.entity.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {})
public abstract class CategoryMapper {

    public abstract Category toEntity(CategoryReqDto request);

    public abstract CategoryResDto toResponse (Category entity);

}
