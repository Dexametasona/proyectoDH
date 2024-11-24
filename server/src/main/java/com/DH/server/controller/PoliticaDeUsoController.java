package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.entity.PoliticaDeUso;
import com.DH.server.service.interfaces.PoliticaDeUsoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/politicas")
public class PoliticaDeUsoController {
    
    private final PoliticaDeUsoService politicaDeUsoService;

    @PostMapping
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> create(@RequestBody PoliticaDeUso politica) {
        PoliticaDeUso createdPolitica = politicaDeUsoService.create(politica);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDto<>(createdPolitica));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> getById(@PathVariable Long id) {
        PoliticaDeUso politica = politicaDeUsoService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(politica));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<PoliticaDeUso>>> getAll() {
        List<PoliticaDeUso> politicas = politicaDeUsoService.getAll();
        return ResponseEntity.ok(new ApiResponseDto<>(politicas));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDto<PoliticaDeUso>> update(@PathVariable Long id, @RequestBody PoliticaDeUso politica) {
        PoliticaDeUso updatedPolitica = politicaDeUsoService.update(id, politica);
        return ResponseEntity.ok(new ApiResponseDto<>(updatedPolitica));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDto<String>> delete(@PathVariable Long id) {
        politicaDeUsoService.delete(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Política de uso eliminada con éxito, id: " + id));
    }

}
