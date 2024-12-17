package com.DH.server.service.implement;

import com.DH.server.exception.EmailException;
import com.DH.server.exception.OrderException;
import com.DH.server.model.dto.EmailDTO;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.ProductStatus;
import com.DH.server.model.mapper.OrderMapper;
import com.DH.server.persistance.OrderRepository;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.EmailService;
import com.DH.server.service.interfaces.OrderService;
import com.DH.server.service.interfaces.ProductService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
  private final OrderRepository orderRepository;
  private final OrderMapper orderMapper;
  private final AuthService authService;
  private final ProductService productService;
  private final EmailService emailService;

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
    entity.setUser(authUser);

    List<Order> orders = this.orderRepository.getOrdersByProductIdAndDate(productId, LocalDate.now());
    this.verifyOverlapDates(orders, entity);

    long daysShip = ChronoUnit.DAYS.between(entity.getShipStart(), entity.getShipEnd()) + 1;
    entity.setAmount(entity.getProduct().getPrice() * daysShip);

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
  public void sendOrderConfirmation(UserEntity account, Order order){
    long orderId = order.getId();
    Map<String, String> variables = new HashMap<>();
    variables.put("username", account.getName()+" "+account.getLastname());
    variables.put("email", account.getEmail());
    variables.put("OrderNumber", String.valueOf(orderId));

    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    variables.put("CreationDate", order.getCreatedAt().format(dateTimeFormatter));
    variables.put("DeliveryDate", order.getShipEnd().format(dateFormatter));
    variables.put("ShipAddress", order.getShipAddress());

    Product product = order.getProduct();
    variables.put("Product", product.getName());
    variables.put("Amount", String.format("%.2f", order.getAmount()));

    EmailDTO email = new EmailDTO(account.getEmail(), "Correo de confirmación de reservas", variables);
    try {
      this.emailService.sendMail(email, "emailOrder");
    } catch (MessagingException e) {
      throw new EmailException("Fail to send email to: "+account.getEmail());
    }
  }
}