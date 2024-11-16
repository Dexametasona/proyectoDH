package com.DH.server.model.entity;

import com.DH.server.model.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class UserEntity implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(length = 100)
  private String name;
  @Column(length = 100)
  private String lastname;
  @Column(length = 100)
  private String email;
  private String password;
  @Enumerated(EnumType.STRING)
  private Role role;

  private Boolean isEnabled;
  private Boolean isDeleted;
  private String tokenEmail;
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @PrePersist
  public void onCreate(){
    this.isDeleted = false;
    this.isEnabled = false;
    this.createdAt = LocalDateTime.now();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+role.name());
    return List.of(authority);
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return UserDetails.super.isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return UserDetails.super.isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return UserDetails.super.isCredentialsNonExpired();
  }

  @Override
  public boolean isEnabled() {
    return this.isEnabled;
  }
}
