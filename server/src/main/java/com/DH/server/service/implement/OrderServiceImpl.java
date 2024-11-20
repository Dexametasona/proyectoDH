package com.DH.server.service.implement;

import com.DH.server.exception.OrderException;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.ProductStatus;
import com.DH.server.model.mapper.OrderMapper;
import com.DH.server.persistance.OrderRepository;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.OrderService;
import com.DH.server.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
  private final OrderRepository orderRepository;
  private final OrderMapper orderMapper;
  private final AuthService authService;
  private final ProductService productService;

  @Override
  public Order create(Order entity, long productId) {
    UserEntity authUser = this.authService.getAuthUser();
    Product productTarget = this.productService.getById(productId);
    if(!entity.getShipStart().isBefore(entity.getShipEnd())){
      throw new OrderException("The ship end start must be before ship end");
    }
    if(productTarget.getStatus() != ProductStatus.AVAILABLE){
      throw new OrderException("The product is unavailable, product id: "+ productId);
    }
    entity.setProduct(productTarget);
    List<Order> orders = this.orderRepository.getOrdersByProductIdAndDate(productId, LocalDate.now());
    this.verifyOverlapDates(orders, entity);

    long daysShip = ChronoUnit.DAYS.between(entity.getShipStart(), entity.getShipEnd());
    entity.setAmount(entity.getProduct().getPrice() * daysShip);
    entity.setUser(authUser);
    return this.orderRepository.save(entity);
  }

  @Override
  public Order create(Order entity) {
    return this.orderRepository.save(entity);
  }

  @Override
  public Order getById(Long id) {
    return this.orderRepository.findById(id).orElseThrow(() -> new OrderException("not found, id: " + id));
  }

  @Override
  public Order updateById(Long id, Order entity) {
    Order previous = this.getById(id);
    this.orderMapper.update(previous, entity);
    return this.orderRepository.save(previous);
  }

  @Override
  public void deleteById(Long id) {
    this.getById(id);
    this.orderRepository.deleteById(id);
  }

  @Override
  public List<Order> getAll() {
    return List.of();
  }

  @Override
  public Page<Order> getAllByFilters(Pageable page, Long userId, Long productId, LocalDate start, LocalDate end) {
    return this.orderRepository.findAllByFilter(page, userId, productId, start, end);
  }

  @Override
  public List<Order> getCurrentOrdersByProduct(Long productId) {
    return this.orderRepository.getOrdersByProductIdAndDate(productId, LocalDate.now());
  }

  private void verifyOverlapDates(List<Order> orders, Order newOrder){
    for (Order order : orders) {
      LocalDate existingStart = order.getShipStart();
      LocalDate existingEnd = order.getShipEnd();

      LocalDate newStart = newOrder.getShipStart();
      LocalDate newEnd = newOrder.getShipEnd();

      if (!newEnd.isBefore(existingStart) && !newStart.isAfter(existingEnd)) {
        throw new OrderException("dates are overlapping");
      }
    }
  }
}