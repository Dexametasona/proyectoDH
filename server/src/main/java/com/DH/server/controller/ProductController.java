package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.ProductFilters;
import com.DH.server.model.dto.request.ProductReqDto;
import com.DH.server.model.dto.response.ProductResDto;
import com.DH.server.model.dto.response.ProductShortDto;
import com.DH.server.model.entity.Product;
import com.DH.server.model.mapper.ProductMapper;
import com.DH.server.service.interfaces.OrderService;
import com.DH.server.service.interfaces.ProductService;
import io.micrometer.common.lang.Nullable;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/products")
@Tag(name = "Products", description = "Product controller")
public class ProductController {
  private final ProductService productService;
  private final ProductMapper productMapper;
  private final OrderService orderService;

  @Operation(summary = "create product", description = "Using body as form-data, only available for ADMIN",
          security = {@SecurityRequirement(name = "bearerAuth")})
  @PostMapping(consumes = "multipart/form-data")
  @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Form-data")
  public ResponseEntity<?> create(@ModelAttribute
                                  @Validated(OnCreate.class)
                                  ProductReqDto request) {
    var newProduct = this.productMapper.toEntity(request);
    newProduct = this.productService.create(
            newProduct,
            request.photos(),
            request.categoryId(),
            request.tagId(),
            request.characteristic());
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponseDto<>(this.productMapper.toResponse(newProduct)));
  }

  @Operation(summary = "Get products", description = "Get all product with pagination and filters")
  @GetMapping
  public ResponseEntity<?> getAll(
          @Parameter(description = "Pagination and sorting")
          @Nullable Pageable page,
          @Parameter(description = "Filters")
          @Nullable
          @Valid ProductFilters filters) {
    Page<Product> products = this.productService.getAllByFilters(page, filters);
    Page<ProductShortDto> productsResDto = products.map(productMapper::toShortResponse);
    return ResponseEntity.ok(
            new ApiResponseDto<>(this.productMapper.toCustomPage(productsResDto)));
  }


  @Operation(summary = "Get products", description = "Get full products with pagination and filters")
  @GetMapping("/all")
  public ResponseEntity<?> getFullProducts(
          @Parameter(description = "Pagination and sorting")
          @Nullable Pageable page,
          @Parameter(description = "Filters")
          @Nullable
          @Valid ProductFilters filters) {
    Page<Product> products = this.productService.getAllByFilters(page, filters);
    Page<ProductResDto> productsResDto = products.map(productMapper::toResponse);
    return ResponseEntity.ok(
            new ApiResponseDto<>(this.productMapper.toFullCustomPage(productsResDto)));
  }

  @Operation(summary = "Get random products", description = "Get 20 random products")
  @GetMapping("/random")
  public ResponseEntity<?> getAllRandom() {
    List<Product> products = this.productService.getRandom();
    List<ProductShortDto> productsResDto = products.stream().map(productMapper::toShortResponse).toList();
    return ResponseEntity.ok(
            new ApiResponseDto<>(productsResDto));
  }
  @Operation(summary = "Get autocomplete products", description = "Get 10 autocomplete products name")
  @GetMapping("/autocomplete/{name}")
  public ResponseEntity<?> getAutocomplete(@PathVariable @NotBlank String name) {
    List<Product> names = this.productService.getProductNames(name);
    var autocompleteProduct = names.stream()
            .map(this.productMapper::toAutocompleteResponse)
            .toList();
    return ResponseEntity.ok(
            new ApiResponseDto<>(autocompleteProduct));
  }

  @Operation(summary = "Get product by id", description = "fetch products using his id into url.")
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@Parameter(description = "Product id", required = true)
                                   @PathVariable Long id) {
    var product = this.productService.getById(id);
    var orders = this.orderService.getCurrentOrdersByProduct(id);
    return ResponseEntity.ok(new ApiResponseDto<>(this.productMapper.toResponse(product, orders)));
  }

  @Operation(summary = "Update product by id", description = "fetch products using his id into url, and json into body, available for ADMIN",
          security = {@SecurityRequirement(name = "bearerAuth")})
  @PutMapping(value = "/{id}", consumes = "multipart/form-data")
  @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Form-data")
  public ResponseEntity<?> update(@Parameter(description = "Product id", required = true)
                                  @PathVariable Long id,
                                  @Parameter(description = "Photo ids that will delete")
                                  @RequestParam(required = false)
                                  List<Long> deletePhotoId,
                                  @ModelAttribute
                                  @Validated(OnUpdate.class)
                                  ProductReqDto request) {
    var product = this.productMapper.toEntity(request);
    product = this.productService.updateById(id,
            product,
            deletePhotoId,
            request.photos(),
            request.categoryId(),
            request.tagId(),
            request.characteristic());
    return ResponseEntity
            .ok(new ApiResponseDto<>(this.productMapper.toResponse(product)));
  }

  @Operation(summary = "Delete Product by id", description = "Delete product using his id into url, only available for ADMIN",
          security = {@SecurityRequirement(name = "bearerAuth")})
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@Parameter(description = "Product id", required = true)
                                        @PathVariable Long id){
    this.productService.deleteById(id);
    return ResponseEntity.ok(new ApiResponseDto<>("Product delete successfully, id: "+id));
  }

}
