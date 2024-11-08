package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.UserFilters;
import com.DH.server.model.dto.request.UserReqDto;
import com.DH.server.model.dto.response.UserShortDto;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.UserService;
import io.micrometer.common.lang.Nullable;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/users")
@Tag(name = "User", description = "User controller")
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @Operation(summary = "Get users", description = "Get all user with pagination and filters")
  @GetMapping
  public ResponseEntity<?> getAll(
          @Parameter(description = "Pagination and sorting")
          @Nullable Pageable page,
          @Parameter(description = "Filters")
          @Nullable
          @Valid UserFilters filters) {
    Page<UserEntity> products = this.userService.getAll(page, filters);
    Page<UserShortDto> productsResDto = products.map(userMapper::toShortResponse);
    return ResponseEntity.ok(
            new ApiResponseDto<>(this.userMapper.toCustomPage(productsResDto)));
  }

  @Operation(summary = "Get user by id", description = "fetch users using his id into url.")
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@Parameter(description = "User id", required = true)
                                   @PathVariable Long id) {
    var product = this.userService.getById(id);
    return ResponseEntity.ok(new ApiResponseDto<>(this.userMapper.toResponse(product)));
  }

  @Operation(summary = "Update User by id", description = "fetch Users using his id into url, and json into body")
  @PutMapping(value = "/{id}")
  public ResponseEntity<?> update(@Parameter(description = "User id", required = true)
                                  @PathVariable Long id,
                                  @RequestBody
                                  @Validated(OnUpdate.class)
                                  UserReqDto request) {
    var product = this.userMapper.toEntity(request);
    product = this.userService.updateById(id, product);
    return ResponseEntity
            .ok(new ApiResponseDto<>(this.userMapper.toResponse(product)));
  }

  @Operation(summary = "Delete User by id", description = "Delete user using his id into ur")
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@Parameter(description = "User id", required = true)
                                      @PathVariable Long id){
    this.userService.deleteById(id);
    return ResponseEntity.ok(new ApiResponseDto<>("User delete successfully, id: "+id));
  }
}
