package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.request.PoliticaDeUsoReqDto;
import com.DH.server.model.dto.response.PoliticaDeUsoResDto;
import com.DH.server.model.entity.PoliticaDeUso;
import com.DH.server.model.entity.Product; 
import com.DH.server.service.interfaces.PoliticaDeUsoService;
import com.DH.server.service.interfaces.ProductService; 
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
    private final ProductService productService; 

    @PostMapping
    @Operation(summary = "Crear Política de Uso", description = "Crea una nueva política de uso.")
    public ResponseEntity<ApiResponseDto<PoliticaDeUsoResDto>> create(@RequestBody PoliticaDeUsoReqDto politicaReqDto) {
        PoliticaDeUso politica = new PoliticaDeUso();
        politica.setNombre(politicaReqDto.nombre());
        politica.setDescripcion(politicaReqDto.descripcion());
        politica.setContenido(politicaReqDto.contenido());

        Product producto = productService.getById(politicaReqDto.productoId());
        politica.setProducto(producto); 

        PoliticaDeUso createdPolitica = politicaDeUsoService.create(politica);
        PoliticaDeUsoResDto responseDto = new PoliticaDeUsoResDto(
                createdPolitica.getId(),
                createdPolitica.getNombre(),
                createdPolitica.getDescripcion(),
                createdPolitica.getContenido()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDto<>(responseDto));
    }

    @GetMapping("/producto/{productoId}")
    @Operation(summary = "Obtener políticas de uso por producto", description = "Obtiene una lista de políticas de uso asociadas a un producto.")
    public ResponseEntity<ApiResponseDto<List<PoliticaDeUsoResDto>>> getPoliticasByProducto(
            @Parameter(description = "ID del producto", required = true) @PathVariable Long productoId) {
        List<PoliticaDeUso> politicas = politicaDeUsoService.getByProductoId(productoId);
        List<PoliticaDeUsoResDto> responseDtos = politicas.stream()
                .map(politica -> new PoliticaDeUsoResDto(
                        politica.getId(),
                        politica.getNombre(),
                        politica.getDescripcion(),
                        politica.getContenido()))
                .toList();
        return ResponseEntity.ok(new ApiResponseDto<>(responseDtos));
    }

}
