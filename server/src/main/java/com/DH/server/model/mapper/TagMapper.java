package com.DH.server.model.mapper;

import com.DH.server.model.dto.request.TagReqDto;
import com.DH.server.model.dto.response.TagResDto;
import com.DH.server.model.entity.Category;
import com.DH.server.model.entity.Tag;
import org.mapstruct.*;

@Mapper(componentModel = "spring",uses = {})
public abstract class TagMapper {

    public abstract Tag toEntity(TagReqDto request);
    public abstract TagResDto toResponse (Category entity);
}
