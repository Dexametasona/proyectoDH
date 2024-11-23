package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.ReviewReqDto;
import com.DH.server.model.dto.request.ReviewShortDto;
import com.DH.server.model.mapper.ReviewMapper;
import com.DH.server.service.interfaces.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Review", description = "Review controller")
@RequestMapping("${api.base}/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;


    @Operation(summary = "Create review", description = "Create review only for UserAuth")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> create(@Validated (OnCreate.class)
                                    @RequestBody ReviewReqDto request){

        var review=this.reviewMapper.toEntity(request);
        review=reviewService.create(review);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>(this.reviewMapper.toResponse(review)));
    }


    @Operation(summary = "Get review by id",description = "Get review using id.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@Parameter(description = "Review id",required = true)
                                     @PathVariable Long id){
        var review= this.reviewService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(this.reviewMapper.toResponse(review)));
    }

    @Operation(summary = "Update review",description = "update score and comment of a review using id, only available for ADMIN")
    @PutMapping(value = "/{id}", consumes =  "application/json")
    public ResponseEntity<?> update(
            @Parameter(description = "review id", required = true)
            @PathVariable Long id,
            @Validated(OnUpdate.class)
            @RequestBody ReviewShortDto request){

        var review=this.reviewMapper.toEntity(request);
        review=this.reviewService.updateById(id,review);

        return ResponseEntity
                .ok(new ApiResponseDto<>(this.reviewMapper.toResponse(review)));
    }

}
