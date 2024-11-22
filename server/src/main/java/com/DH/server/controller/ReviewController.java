package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.CategoryReqDto;
import com.DH.server.model.dto.request.ReviewReqDto;
import com.DH.server.model.dto.request.ReviewShoReqDto;
import com.DH.server.model.entity.Review;
import com.DH.server.model.mapper.ReviewMapper;
import com.DH.server.service.interfaces.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;


    @Operation(summary = "create review", description = "Create review only for UserAuth")
    @PostMapping(consumes = "multipart/form-data")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Form-data")
    public ResponseEntity<?> create(@Validated (OnCreate.class)
                                    @ModelAttribute ReviewReqDto request,
                                    @RequestParam Long orderId){

        var review=this.reviewMapper.toEntity(request);
        review=reviewService.create(review,orderId);

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
    @PutMapping(value = "/{id}", consumes =  "multipart/form-data")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Form-data")
    public ResponseEntity<?> update(
            @Parameter(description = "review id", required = true)
            @PathVariable Long id,
            @Validated(OnUpdate.class)
            @RequestBody ReviewShoReqDto request){

        var review=this.reviewMapper.toEntity(request);
        review=this.reviewService.updateById(id,review);

        return ResponseEntity
                .ok(new ApiResponseDto<>(this.reviewMapper.toResponse(review)));
    }

}
