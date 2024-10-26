package com.DH.server.model.mapper;

import com.DH.server.model.dto.CustomPage;
import com.DH.server.model.dto.request.CategoryReqDto;
import com.DH.server.model.dto.response.CategoryResDto;
import com.DH.server.model.dto.response.ProductResDto;
import com.DH.server.model.entity.Category;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = {})
public abstract class CategoryMapper {

    public abstract Category toEntity(CategoryReqDto request);

    public abstract CategoryResDto toResponse (Category entity);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "ID",ignore = true)
    public abstract void update(@MappingTarget Category previous, Category current);

    @Mapping(target = "currentPage", source = "number")
    @Mapping(target = "pageSize", source = "size")
    @Mapping(target = "isFirst", source = "first")
    @Mapping(target = "isLast", source = "last")
    public abstract CustomPage<CategoryResDto> toCustomPage(Page<CategoryResDto> page);
}
