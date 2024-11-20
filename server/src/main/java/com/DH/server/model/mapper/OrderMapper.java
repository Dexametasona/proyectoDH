package com.DH.server.model.mapper;

import com.DH.server.model.dto.CustomPage;
import com.DH.server.model.dto.request.OrderReqDto;
import com.DH.server.model.dto.response.OrderResDto;
import com.DH.server.model.dto.response.OrderShortDto;
import com.DH.server.model.entity.Order;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {
  public abstract Order toEntity(OrderReqDto order);
  @Mapping(target = "productId", source = "product.id")
  @Mapping(target = "userId", source = "user.id")
  public abstract OrderResDto toResponse(Order order);

  @Mapping(target = "shipStart", source = "shipStart")
  @Mapping(target = "shipEnd", source = "shipEnd")
  public abstract OrderShortDto toShortResponse(Order order);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  public abstract void update(@MappingTarget Order previous, Order current);

  @Mapping(target = "currentPage", source = "number")
  @Mapping(target = "pageSize", source = "size")
  @Mapping(target = "isFirst", source = "first")
  @Mapping(target = "isLast", source = "last")
  public abstract CustomPage<OrderResDto> toCustomPage(Page<OrderResDto> orderResDto);
}
