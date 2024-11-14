package com.DH.server.model.mapper;

import com.DH.server.model.dto.CustomPage;
import com.DH.server.model.dto.request.UserReqDto;
import com.DH.server.model.dto.request.UserUpdateDto;
import com.DH.server.model.dto.response.UserResDto;
import com.DH.server.model.dto.response.UserShortDto;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.Role;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
  public abstract UserEntity toEntity(UserReqDto user);
  public abstract UserEntity toEntity(UserUpdateDto user);
  public abstract UserResDto toResponse(UserEntity user);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "authorities", ignore = true)
  @Mapping(target = "email", ignore = true)
  @Mapping(target = "isEnabled", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "isDeleted", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "role", ignore = true)
  public abstract void update(@MappingTarget UserEntity previous, UserEntity current);

  public abstract UserShortDto toShortResponse(UserEntity userEntity);

  @Mapping(target = "currentPage", source = "number")
  @Mapping(target = "pageSize", source = "size")
  @Mapping(target = "isFirst", source = "first")
  @Mapping(target = "isLast", source = "last")
  public abstract CustomPage<UserShortDto> toCustomPage(Page<UserShortDto> productsResDto);

  public int map(Role role){
    return role.getId();
  }
}
