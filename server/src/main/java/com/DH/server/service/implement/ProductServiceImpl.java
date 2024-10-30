package com.DH.server.service.implement;

import com.DH.server.exception.ProductException;
import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.entity.Product;
import com.DH.server.model.mapper.ProductMapper;
import com.DH.server.persistance.ProductRepository;
import com.DH.server.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
  private final ProductRepository productRepository;
  private final ProductMapper productMapper;

  @Override
  public Product create(Product entity) {
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
            filters.categoryId(),
            filters.tagId(),
            filters.name(),
            filters.brand(),
            filters.priceLimitUpper(),
            filters.priceLimitLower());

  }

}
