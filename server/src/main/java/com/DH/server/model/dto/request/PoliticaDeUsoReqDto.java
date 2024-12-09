package com.DH.server.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PoliticaDeUsoReqDto(
    @NotBlank String nombre,
    @NotBlank String descripcion,
    @NotBlank String contenido,
    @NotNull Long productoId
) {
    
}
