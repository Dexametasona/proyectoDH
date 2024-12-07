package com.DH.server.model.mapper;

import com.DH.server.model.dto.request.CharacteristicReqDto;
import com.DH.server.model.dto.response.CharacteristicResDto;
import com.DH.server.model.entity.Characteristics;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class CharacteristicMapper {
    @Mapping(target = "type", expression = "java(request.type() != null ? com.DH.server.model.enums.Type.fromId(request.type()) : null)")
    //@Mapping(target = "type", expression = "java(com.DH.server.model.enums.Type.fromId(request.type()))")
    public abstract Characteristics toEntity(CharacteristicReqDto request);

    @Mapping(target = "type", source = "type.id")
    public abstract CharacteristicResDto toResponse(Characteristics response);


}
