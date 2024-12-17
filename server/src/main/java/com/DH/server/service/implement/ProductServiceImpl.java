package com.DH.server.service.implement;

import com.DH.server.exception.CategoryException;
import com.DH.server.exception.OrderException;
import com.DH.server.exception.ProductException;
import com.DH.server.exception.TagException;
import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.entity.*;
import com.DH.server.model.mapper.ProductMapper;
import com.DH.server.persistance.CharacteristicsRepository;
import com.DH.server.persistance.ProductRepository;
import com.DH.server.persistance.ReviewRepository;
import com.DH.server.service.interfaces.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private ProductMapper productMapper;
  @Autowired
  private S3Service s3Service;
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private TagService tagService;
  @Autowired
  private PhotoService photoService;
  @Autowired
  @Lazy
  private FavoriteService favoriteService;
  @Autowired
  @Lazy
  private OrderService orderService;
  @Autowired
  private AuthService authService;
  @Autowired
  private CharacteristicsRepository characteristicsRepository;
  @Autowired
  private ReviewRepository reviewRepository;


  @Override
  public Product create(Product entity) {
    return this.productRepository.save(entity);
  }

  @Transactional
  @Override
  public Product create(Product entity, List<MultipartFile> photos, Integer categoryId, Integer tagId, List<Long> characteristicsId) {

    Optional<Product> currentProduct = this.productRepository.findByName(entity.getName());
    if (currentProduct.isPresent()) throw new ProductException("Product name is already in use");
    List<Photo> photosUrl = photos
            .stream()
            .map(photo -> {
              String url = this.s3Service.uploadFile(photo);
              Photo currentPhoto = new Photo();
              currentPhoto.setUrl(url);
              return currentPhoto;
            }).toList();
    entity.setPhotos(photosUrl);
    try {
      entity.setCategory(categoryService.getById(categoryId.longValue()));
      entity.setTag(tagService.getById(tagId.longValue()));
    } catch (CategoryException e) {
      log.info("category not present");
    } catch (TagException e) {
      log.info("tag not present");
    }

    if (characteristicsId != null && !characteristicsId.isEmpty()) {

      List<Characteristics> productCharacteristics = new ArrayList<>();

      characteristicsId.forEach(characteristic -> {
        Optional<Characteristics> characteristics = this.characteristicsRepository.findById(characteristic);
        characteristics.ifPresent(productCharacteristics::add);
      });

      entity.setCharacteristics(productCharacteristics);
    }

    return this.productRepository.save(entity);
  }

  @Override
  public Product getById(Long id) {
    return this.productRepository.findById(id)
            .orElseThrow(() -> new ProductException("not found, id: " + id));
  }

  @Transactional
  @Override
  public Product updateById(Long id, Product entity) {
    var previous = this.getById(id);
    this.productMapper.update(previous, entity);
    return this.productRepository.save(previous);
  }

  @Transactional
  @Override
  public Product updateById(Long id,
                            Product entity,
                            List<Long> deletePhoto,
                            List<MultipartFile> photos,
                            Integer categoryId,
                            Integer tagId,
                            List<Long> characteristicsId) {

    Product previousProduct = this.getById(id);

    int lengthPhotosByProduct = previousProduct.getPhotos().size()
            + (photos != null ? photos.size() : 0)
            - (deletePhoto != null ? deletePhoto.size() : 0);
    if (lengthPhotosByProduct > 8 || lengthPhotosByProduct < 4) {
      throw new ProductException("The photos must will be between 4 and 8");
    }
    if (deletePhoto != null) {
      deletePhoto.forEach(delete -> {
        this.photoService.deleteById(delete);
        previousProduct.getPhotos().removeIf(photo -> Objects.equals(photo.getId(), delete));
      });
    }
    if (photos != null) {
      List<Photo> newPhotos = photos
              .stream()
              .map(photo -> {
                String url = this.s3Service.uploadFile(photo);
                Photo currentPhoto = new Photo();
                currentPhoto.setUrl(url);
                currentPhoto.setProduct(previousProduct);
                return currentPhoto;
              }).toList();

      List<Photo> savedPhotos = newPhotos
              .stream()
              .map(this.photoService::create)
              .toList();
      previousProduct.getPhotos().addAll(savedPhotos);
    }

    this.productMapper.update(previousProduct, entity);
    if (categoryId != null) {
      previousProduct.setCategory(categoryService.getById(categoryId.longValue()));
    }
    if (tagId != null) {
      previousProduct.setTag(tagService.getById(tagId.longValue()));
    }


    if (characteristicsId != null && !characteristicsId.isEmpty()) {

      List<Characteristics> productCharacteristics = new ArrayList<>();

      characteristicsId.forEach(characteristic -> {
        Characteristics characteristics = this.characteristicsRepository.findById(characteristic).orElseThrow(() -> new ProductException("Characteristic with ID" + characteristic + "was not found"));
        productCharacteristics.add(characteristics);
      });

      previousProduct.setCharacteristics(productCharacteristics);
    }

    return this.productRepository.save(previousProduct);
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    Product productTarget = this.getById(id);
    var authUser = this.authService.getAuthUser();
    List<Long> favoriteIds = this.favoriteService.getFavoritesByUser(authUser)
            .stream()
            .map(Favorite::getId)
            .toList();
    List<Order> orders = this.orderService.getAllByFilters(Pageable.unpaged(), null, productTarget.getId(), null, null).getContent();
    orders.forEach(order -> {
      if (!order.getShipEnd().isBefore(LocalDate.now())) {
        throw new OrderException("You can't delete current or pending product orders. order id:" + order.getId());
      }
      this.orderService.deleteById(order.getId());
    });
    favoriteIds.forEach(this.favoriteService::deleteById);
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

  @Override
  public List<Product> getProductNames(String name) {
    if (name.trim().length() < 4) throw new OrderException("name must have at least 4 characters");
    Pageable limit = PageRequest.of(0, 10);
    return this.productRepository.findProductNames(limit, name);
  }

  public void averageProductScore(Long product_id) {
    Double average = reviewRepository.averageScorebyProduct(product_id);

    Product product = this.getById(product_id);
    product.setAvgScore(average);
    productRepository.save(product);
  }

}
