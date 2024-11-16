package com.DH.server.security;


import com.DH.server.model.dto.ApiResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtAuthFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "api/v1/auth/register",
                            "api/v1/auth/login",
                            "api/v1/auth/verify",
                            "api/v1/auth/resend-email",
                            "api/v1/auth/prueba",
                            "/swagger-ui/**",
                            "/v3/api-docs/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"api/v1/category/**").permitAll()
                    .requestMatchers("api/v1/category/**").hasRole("ADMIN")
                    .requestMatchers( HttpMethod.GET, "api/v1/tag/**").permitAll()
                    .requestMatchers( HttpMethod.GET, "api/v1/products/**").permitAll()
                    .requestMatchers(  "api/v1/products/**").hasRole("ADMIN")
                    .requestMatchers( HttpMethod.GET, "api/v1/users").hasRole("ADMIN")
                    .requestMatchers("api/v1/users").hasRole("USER")
                    .requestMatchers( HttpMethod.POST, "api/v1/users/role/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            ).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(custom->custom
                    .authenticationEntryPoint(authenticationEntryPoint())
                    .accessDeniedHandler(accessDeniedHandler()))
            .build();
  }

  @Bean
  public AuthenticationEntryPoint authenticationEntryPoint() {
    return (request, response, authException) -> {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      String time = LocalDateTime.now().toString();
      var message = new ApiResponseDto<>("Unauthorized: Please login to access this resource.", time);
      response.getWriter().write(convertToJson(message));
    };
  }
  @Bean
  public AccessDeniedHandler accessDeniedHandler() {
    return (request, response, accessDeniedException) -> {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      String time = LocalDateTime.now().toString();
      var message = new ApiResponseDto<>("Access Denied: You do not have permission to access this resource.", time);
      response.getWriter().write(convertToJson(message));
    };
  }

  private String convertToJson(Object object) throws JsonProcessingException {
    if (object == null) {
      return null;
    }
    ObjectMapper mapper = new ObjectMapper();
    return mapper.writeValueAsString(object);
  }
}
