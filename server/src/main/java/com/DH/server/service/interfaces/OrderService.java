package com.DH.server.service.interfaces;

import com.DH.server.model.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService extends GenericService<Order>{

  Order create(Order entity, long productId);

  Page<Order> getAllByFilters(Pageable page, Long userId, Long productId, LocalDate start, LocalDate end);

  List<Order> getCurrentOrdersByProduct(Long productId);
}
