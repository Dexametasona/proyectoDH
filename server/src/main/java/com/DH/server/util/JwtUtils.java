package com.DH.server.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class JwtUtils {

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.time.expiration}")
  private long sessionExpiration;

  @Value("${jwt.email.expiration}")
  private long emailExpiration;

  private SecretKey getKey() {
    byte[] keyBites = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBites);
  }

  private String generateToken(UserDetails userDetail, long timeExpiration) {
    Map<String, Object> extraClaims = new HashMap<>();
    return Jwts.builder()
            .claims(extraClaims)
            .subject(userDetail.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(Date.from(Instant.now().plus(timeExpiration, ChronoUnit.MILLIS)))
            .signWith(this.getKey(), Jwts.SIG.HS256)
            .compact();
  }

  public String generateAuthToken(UserDetails userDetail){
    return this.generateToken(userDetail, sessionExpiration);
  }

  public String generateEmailToken(UserDetails userDetail){
    return this.generateToken(userDetail, emailExpiration);
  }

  private Claims getAllClaims(String token) throws Exception{
    return Jwts.parser()
            .verifyWith(this.getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }
  private <T> T getClaim(String token, Function<Claims, T> claimsResolver) throws Exception {
    final Claims claims = this.getAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String getUsernameFromToken(String token) throws Exception {
    return this.getClaim(token, Claims::getSubject);
  }

  public boolean isTokenExpired(String token) {
    Date expirationDate = null;
    try {
      expirationDate = this.getClaim(token, Claims::getExpiration);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return expirationDate.before(new Date());
  }

  public boolean isTokenValid(String token, UserDetails userDetails) throws Exception {
    final String email = getUsernameFromToken(token);
    return email.equals(userDetails.getUsername()) &&
            !isTokenExpired(token);
  }

}
