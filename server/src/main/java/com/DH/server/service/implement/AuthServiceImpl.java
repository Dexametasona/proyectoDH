package com.DH.server.service.implement;

import com.DH.server.exception.EmailException;
import com.DH.server.exception.UserException;
import com.DH.server.model.dto.EmailDTO;
import com.DH.server.model.dto.request.LoginReq;
import com.DH.server.model.dto.response.AuthRes;
import com.DH.server.model.entity.Order;
import com.DH.server.model.entity.Product;
import com.DH.server.model.entity.UserEntity;
import com.DH.server.model.enums.Role;
import com.DH.server.model.mapper.UserMapper;
import com.DH.server.service.interfaces.AuthService;
import com.DH.server.service.interfaces.EmailService;
import com.DH.server.service.interfaces.UserService;
import com.DH.server.util.JwtUtils;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
  private final PasswordEncoder encoder;
  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final UserMapper userMapper;
  private final JwtUtils jwtutils;
  private final EmailService emailService;

  @Value("${api.domain}")
  private String domain;
  @Value("${api.base}")
  private String apiBase;

  @Transactional
  @Override
  public UserEntity register(UserEntity entity) {
    try {
      UserEntity user = this.userService.getByEmail(entity.getEmail());
      if (user.getIsDeleted()) {
        this.userMapper.update(user, entity);
        user.setPassword(encoder.encode(entity.getPassword()));
        user.setRole(Role.USER);
        return userService.create(user);
      }
    } catch (UserException ex) {
      entity.setPassword(encoder.encode(entity.getPassword()));
      entity.setRole(Role.USER);
      entity.setTokenEmail(jwtutils.generateEmailToken(entity));
      var savedUser = userService.create(entity);
      this.sendAccountVerification(savedUser);
      return savedUser;
    }
    throw new UserException("Already exist, email: " + entity.getEmail());
  }

  @Override
  public AuthRes login(LoginReq request) {
    try {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(request.email(), request.password()));
      UserEntity user = userService.getByEmail(request.email());
      if (user.getIsDeleted()) {
        throw new UserException("this account was deleted");
      }
      return new AuthRes(jwtutils.generateAuthToken(user),
              user.getRole().getId(),
              user.getId());
    } catch (DisabledException e) {
      throw new UserException("Account not verified, email: " + request.email());
    } catch (BadCredentialsException e) {
      throw new UserException("The password doesn't match");
    }
  }

  @Override
  public UserEntity getAuthUser() {
    return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  private void sendAccountVerification(UserEntity account){
    String tokenUrl = domain+"/"+apiBase+"/auth/verify?token="+account.getTokenEmail();
    Map<String,String> variables = new HashMap<>();
    variables.put("username", account.getName()+" "+account.getLastname());
    variables.put("email", account.getEmail());
    variables.put("tokenUrl", tokenUrl);
    EmailDTO email = new EmailDTO(account.getEmail(), "Correo de confirmación", variables);
    try {
      this.emailService.sendMail(email, "emailVerify");
    } catch (MessagingException e) {
      throw new EmailException("Fail to send email to: "+account.getEmail());
    }
  }

  @Override
  public void verifyAccountEmail(String token){
    UserEntity user = this.userService.getByEmailToken(token);
    if(this.jwtutils.isTokenExpired(token)){
     throw new EmailException("Email verify token is expired");
    }
    this.userService.updateEnabledByUserId(user.getId());
  }

  @Override
  public void resendEmailToken(String email) {
    UserEntity currentUser = this.userService.getByEmail(email);
    currentUser.setTokenEmail(jwtutils.generateEmailToken(currentUser));
    var updateUser = userService.create(currentUser);
    this.sendAccountVerification(updateUser);
  }

  public void sendOrderConfirmation(UserEntity account, Order order){
    Map<String, String> variables = new HashMap<>();
    variables.put("username", account.getName()+" "+account.getLastname());
    variables.put("email", account.getEmail());
    variables.put("OrderNumber", String.valueOf(order.getId()));

    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    variables.put("CreationDate", order.getCreatedAt().format(dateTimeFormatter));
    variables.put("DeliveryDate", order.getShipEnd().format(dateFormatter));
    variables.put("ShipAdress", order.getShipAddress());
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
