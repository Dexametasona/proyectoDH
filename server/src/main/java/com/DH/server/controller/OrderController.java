package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.OrderFilters;
import com.DH.server.model.dto.request.OrderReqDto;
import com.DH.server.model.dto.response.OrderResDto;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.mapper.OrderMapper;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/order")
@Tag(name = "Orders", description = "Order controller")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final AuthService authService;

    @Operation(summary = "Create order",description = "order created" )
    @PostMapping
    public ResponseEntity<?> create(@RequestBody
                                    @Validated(OnCreate.class)
                                    OrderReqDto request){
        var order=this.orderMapper.toEntity(request);
        order=this.orderService.create(order, request.productId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>(this.orderMapper.toResponse(order)));
    }

    @Operation(summary = "Get all Orders ", description = "Get all orders, only for ADMIN")
    @GetMapping
    public ResponseEntity<?> getAll(
            @Parameter(description = "Pagination and sort", required = true)
            Pageable page,
            @Parameter(description = "Order filters", required = true)
            OrderFilters filters
            ){
        Page<Order> orders =this.orderService.getAllByFilters(page,
                filters.userId(),
                filters.productId(),
                filters.start(),
                filters.end());
        Page<OrderResDto> ordersDto = orders.map(orderMapper::toResponse);
        return ResponseEntity.ok(
                new ApiResponseDto<>(this.orderMapper.toCustomPage(ordersDto)));
    }

  @Operation(summary = "Get orders by user ", description = "Get all orders by authenticated user")
  @GetMapping("/user")
  public ResponseEntity<?> getAllByAuth(
          @Parameter(description = "Pagination and sort", required = true)
          Pageable page){
    UserEntity authUser = this.authService.getAuthUser();
    Page<Order> orders =this.orderService.getAllByFilters(
            page,authUser.getId(),null,null, null);
    Page<OrderResDto> ordersDto = orders.map(orderMapper::toResponse);
    return ResponseEntity.ok(
            new ApiResponseDto<>(this.orderMapper.toCustomPage(ordersDto)));
  }

    @Operation(summary = "Get Order by Id")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getById(@Parameter(description = "Order id",required = true)
                                     @PathVariable Long id){
        var tag =this.orderService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(this.orderMapper.toResponse(tag)));
    }

    @Operation(summary = "Update order",description = "fetch orders using id")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Validated(OnUpdate.class)
                                    @RequestBody
                                    @Parameter(description = "order id",required = true)
                                    OrderReqDto request){

        var order =this.orderMapper.toEntity(request);
        order=this.orderService.updateById(id,order);
        return ResponseEntity.ok(new ApiResponseDto<>(this.orderMapper.toResponse(order)));
    }

    @Operation(summary = "Delete Order",description = "delete order by id")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@Parameter(description = "Order id",required = true)
                                    @PathVariable Long id){
        this.orderService.deleteById(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Tag delete successfully, id: "+id));
    }
}
