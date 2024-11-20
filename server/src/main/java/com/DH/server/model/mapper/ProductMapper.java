package com.DH.server.model.mapper;

import com.DH.server.model.dto.CustomPage;
import com.DH.server.model.dto.request.ProductReqDto;
import com.DH.server.model.dto.response.PhotoResDto;
import com.DH.server.model.dto.response.ProductResDto;
import com.DH.server.model.dto.response.ProductShortDto;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Photo;
import com.DH.server.model.entity.Product;
import com.DH.server.model.enums.ProductStatus;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, TagMapper.class, OrderMapper.class})
public abstract class ProductMapper {
  public abstract Product toEntity(ProductReqDto request);

  @Mapping(target = "status", source = "status")
  @Mapping(target = "photos", source = "photos")
  public abstract ProductResDto toResponse(Product entity);

  @Mapping(target = "status", source = "entity.status")
  @Mapping(target = "photos", source = "entity.photos")
  @Mapping(target = "orders", source = "orders")
  public abstract ProductResDto toResponse(Product entity, List<Order> orders);

  @Mapping(target = "photoUrl", source = "photos")
  public abstract ProductShortDto toShortResponse(Product entity);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "photos", ignore = true)
  public abstract void update(@MappingTarget Product previous, Product current);

  @Mapping(target = "currentPage", source = "number")
  @Mapping(target = "pageSize", source = "size")
  @Mapping(target = "isFirst", source = "first")
  @Mapping(target = "isLast", source = "last")
  public abstract CustomPage<ProductShortDto> toCustomPage(Page<ProductShortDto> page);

  public ProductStatus map(Integer id){
    return ProductStatus.fromId(id);
  }

  public int map(ProductStatus status){
    return status.getId();
  }
  public List<PhotoResDto> map(List<Photo> photos){
    return photos.stream().map(photo->new PhotoResDto(photo.getId(), photo.getUrl())).toList();
  }
  public String mapping(List<Photo> photos){
    return photos.getFirst().getUrl();
  }
}
