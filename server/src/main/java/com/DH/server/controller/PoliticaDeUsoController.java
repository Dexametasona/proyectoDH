package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.entity.PoliticaDeUso;
import com.DH.server.service.interfaces.PoliticaDeUsoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/politicas")
@Tag(name = "Políticas de Uso", description = "Controlador para gestionar las políticas de uso")
public class PoliticaDeUsoController {
    
    private final PoliticaDeUsoService politicaDeUsoService;

    @PostMapping
    @Operation(summary = "Crear Política de Uso", description = "Crea una nueva política de uso.")
    @ApiResponse(responseCode = "201", description = "Política de uso creada exitosamente.")
    @ApiResponse(responseCode = "400", description = "Solicitud inválida.")
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> create(@RequestBody PoliticaDeUso politica) {
        PoliticaDeUso createdPolitica = politicaDeUsoService.create(politica);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDto<>(createdPolitica));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener Política de Uso por ID", description = "Obtiene una política de uso específica por su ID.")
    @ApiResponse(responseCode = "200", description = "Política de uso encontrada.")
    @ApiResponse(responseCode = "404", description = "Política de uso no encontrada.")
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> getById(@Parameter(description = "ID de la política de uso", required = true)@PathVariable Long id) {
        PoliticaDeUso politica = politicaDeUsoService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(politica));
    }

    @GetMapping
    @Operation(summary = "Obtener todas las Políticas de Uso", description = "Obtiene una lista de todas las políticas de uso.")
    @ApiResponse(responseCode = "200", description = "Lista de políticas de uso.")
    public ResponseEntity<ApiResponseDto<List<PoliticaDeUso>>> getAll() {
        List<PoliticaDeUso> politicas = politicaDeUsoService.getAll();
        return ResponseEntity.ok(new ApiResponseDto<>(politicas));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar Política de Uso", description = "Actualiza una política de uso existente.")
    @ApiResponse(responseCode = "200", description = "Política de uso actualizada.")
    @ApiResponse(responseCode = "404", description = "Política de uso no encontrada.")
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> update(@Parameter(description = "ID de la política de uso", required = true)@PathVariable Long id, @RequestBody PoliticaDeUso politica) {
        PoliticaDeUso updatedPolitica = politicaDeUsoService.update(id, politica);
        return ResponseEntity.ok(new ApiResponseDto<>(updatedPolitica));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar Política de Uso", description = "Elimina una política de uso existente por su ID.")
    @ApiResponse(responseCode = "200", description = "Política de uso eliminada con éxito.")
    @ApiResponse(responseCode = "404", description = "Política de uso no encontrada.")
    public ResponseEntity<ApiResponseDto<String>> delete(@Parameter(description = "ID de la política de uso", required = true) @PathVariable Long id) {
        politicaDeUsoService.delete(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Política de uso eliminada con éxito, id: " + id));
    }

}
