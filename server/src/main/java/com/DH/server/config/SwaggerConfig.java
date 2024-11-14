package com.DH.server.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
  @Bean
  public OpenAPI defineOpenApi(){
    String schemeName = "bearerAuth";
    String bearerFormat = "JWT";
    String scheme = "bearer";

    Contact myContact = new Contact()
            .name("Alexander Machicado Gomez")
            .email("machicadogomezalexander@gmail.com");

    Server development = new Server()
            .url("http://localhost:8080")
            .description("Development server");

    Info information = new Info()
            .title("GameYard management API")
            .description("This API expose endpoints to manage GameYard company.")
            .version("1.0")
            .license(new License().name("GameYard v1.0").url("http://"))
            .contact(myContact);

    SecurityRequirement securityItem = new SecurityRequirement()
            .addList(schemeName);

    SecurityScheme securityScheme = new SecurityScheme()
            .name(schemeName)
            .type(SecurityScheme.Type.HTTP)
            .bearerFormat(bearerFormat)
            .in(SecurityScheme.In.HEADER)
            .scheme(scheme);

    Components components = new Components()
            .addSecuritySchemes(schemeName, securityScheme);

    return new OpenAPI()
            .info(information)
            .servers(List.of(development))
            .components(components);
  }

}
