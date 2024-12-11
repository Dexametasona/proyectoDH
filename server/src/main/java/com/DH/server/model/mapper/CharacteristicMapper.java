package com.DH.server.model.mapper;

import com.DH.server.model.dto.request.CharacteristicReqDto;
import com.DH.server.model.dto.response.CharacteristicResDto;
import com.DH.server.model.entity.Characteristics;
import com.DH.server.model.enums.Type;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class CharacteristicMapper {
    @Mapping(source = "type", target = "type")
    public abstract Characteristics toEntity(CharacteristicReqDto request);

    @Mapping(target = "type", source = "type.id")
    public abstract CharacteristicResDto toResponse(Characteristics response);

    public Type map(int id ){
        return Type.fromId(id);
    }
}
