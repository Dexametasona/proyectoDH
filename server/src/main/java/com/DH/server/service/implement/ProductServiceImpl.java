package com.DH.server.service.implement;

import com.DH.server.exception.ProductException;
import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.entity.Photo;
import com.DH.server.model.entity.Product;
import com.DH.server.model.mapper.ProductMapper;
import com.DH.server.persistance.ProductRepository;
import com.DH.server.service.interfaces.CategoryService;
import com.DH.server.service.interfaces.ProductService;
import com.DH.server.service.interfaces.S3Service;
import com.DH.server.service.interfaces.TagService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository productRepository;
  private final ProductMapper productMapper;
  private final S3Service s3Service;
  private final CategoryService categoryService;
  private final TagService tagService;

  @Override
  public Product create(Product entity) {
    return this.productRepository.save(entity);
  }
  @Transactional
  @Override
  public Product create(Product entity, List<MultipartFile> photos, Integer categoryId, Integer tagId) {
    List<Photo> photosUrl = photos
            .stream()
            .map(photo->{
                String url = this.s3Service.uploadFile(photo);
                Photo currentPhoto = new Photo();
                currentPhoto.setUrl(url);
                return currentPhoto;
            }).toList();
    entity.setPhotos(photosUrl);
    entity.setCategory(categoryService.getById(categoryId.longValue()));
    entity.setTag(tagService.getById(tagId.longValue()));
    return this.productRepository.save(entity);
  }
  @Override
  public Product getById(Long id) {
    return this.productRepository.findById(id)
            .orElseThrow();
  }

  @Override
  public Product updateById(Long id, Product entity) {
    var previous = this.getById(id);
    this.productMapper.update(previous, entity);
    return this.productRepository.save(previous);
  }

  @Override
  public void deleteById(Long id) {
    this.getById(id);
    this.productRepository.deleteById(id);
  }

  @Override
  public List<Product> getAll() {
    return List.of();
  }

  @Override
  public Page<Product> getAll(Pageable page) {
    return this.productRepository.findAll(page);
  }

  @Override
  public List<Product> getRandom() {
    Pageable limit = PageRequest.of(0, 20);
    return this.productRepository.findRandomProducts(limit);
  }

  @Override
  public Page<Product> getAllByFilters(Pageable page, ProductFilters filters) {
    if ((filters.priceLimitUpper() == null && filters.priceLimitLower() != null) ||
            filters.priceLimitUpper() != null && filters.priceLimitLower() == null) {
      throw new ProductException("both limit filters must not be null if you want to use price range filtering");
    }
    if (filters.priceLimitUpper() != null) {
      if (filters.priceLimitUpper() <= filters.priceLimitLower()) {
        throw new ProductException("the upper limit must not be lower than the lower limit");
      }
    }
    return this.productRepository.findAllByFilter(page,
            filters.categoryIds(),
            filters.tagId(),
            filters.name(),
            filters.brand(),
            filters.priceLimitUpper(),
            filters.priceLimitLower());

  }

}
