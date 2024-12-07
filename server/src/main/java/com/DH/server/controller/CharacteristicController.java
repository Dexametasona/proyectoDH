package com.DH.server.controller;


import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.CharacteristicReqDto;
import com.DH.server.model.dto.response.CharacteristicResDto;
import com.DH.server.model.mapper.CharacteristicMapper;
import com.DH.server.service.interfaces.CharacteristicsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/characteristic")
public class CharacteristicController {

    private final CharacteristicsService characteristicsService;
    private final CharacteristicMapper characteristicMapper;

    @Operation(summary = "Create Characteristic",
            description = "Only available for ADMIN",
            security = {@SecurityRequirement(name = "bearerAuth")})
    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> createCharacteristic(@Validated(OnCreate.class)
                                            @RequestBody CharacteristicReqDto request){

        var newCharacteristic=this.characteristicMapper.toEntity(request);
        newCharacteristic=characteristicsService.create(newCharacteristic);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>(this.characteristicMapper.toResponse(newCharacteristic)));
    }

    @Operation(summary = "Update Characteristic by Id", description = "Update description from a characteristic", security = {@SecurityRequirement(name = "bearerAuth")})
    @PutMapping(value = "/{id}",consumes = "application/json")
    public ResponseEntity<?> update(
            @Parameter(description = "characteristic id", required = true)
            @Validated (OnUpdate.class)
            @RequestBody CharacteristicReqDto request,
            @PathVariable Long id){

        var newCharacteristic=this.characteristicMapper.toEntity(request);
        newCharacteristic=this.characteristicsService.updateById(id,newCharacteristic);
        return ResponseEntity
                .ok(new ApiResponseDto<>(this.characteristicMapper.toResponse(newCharacteristic)));
    }

    @Operation(summary = "Delete Characteristic", description = "Delete characteristic from id", security = {@SecurityRequirement(name = "bearerAuth")})
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @Parameter(description = "characteristic id", required = true)
            @PathVariable Long id){
        this.characteristicsService.deleteById(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Characteristic delete successfully, id:"+id));
    }

    @Operation(summary = "Get All Characteristic", description = "Get all characteristics.")
    @GetMapping
    public ResponseEntity<?> getAll(){
        var characteristics=this.characteristicsService.getAll();
        List<CharacteristicResDto> characteristicResDtos=characteristics.stream()
                .map(this.characteristicMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponseDto<>(characteristicResDtos));
    }
}
