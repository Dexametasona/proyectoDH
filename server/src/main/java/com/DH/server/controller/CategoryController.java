package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.CategoryReqDto;
import com.DH.server.model.dto.response.CategoryResDto;
import com.DH.server.model.mapper.CategoryMapper;
import com.DH.server.service.interfaces.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @Operation(summary = "Create Category")
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody
                                            @Validated (OnCreate.class)
                                            CategoryReqDto request){
        var newCategory=this.categoryMapper.toEntity(request);
        newCategory=this.categoryService.create(newCategory);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>(this.categoryMapper.toResponse(newCategory)));
    }
    @Operation(summary = "Get all Categories",description = "Get all categories withouth pagination")
    @GetMapping
    public ResponseEntity<?> getAll(){
        var categories =this.categoryService.getAll();
        List<CategoryResDto> categoryResDtos = categories.stream()
                .map(this.categoryMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(
                new ApiResponseDto<>(categoryResDtos));
    }

    @Operation(summary = "Get category by id",description = "Get category using id.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@Parameter (description = "Category id",required = true)
            @PathVariable Long id){
        var category= this.categoryService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(this.categoryMapper.toResponse(category)));
    }

    @Operation(summary = "Update category",description = "fetchs categories using id")
    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(
            @Parameter(description = "Category id",required = true)
            @PathVariable Long id,
            @Validated(OnUpdate.class)
            @RequestBody
            CategoryReqDto request){

        var category=this.categoryMapper.toEntity(request);
        category=this.categoryService.updateById(id,category);

        return ResponseEntity
                .ok(new ApiResponseDto<>(this.categoryMapper.toResponse(category)));
    }

    @Operation(summary = "Delete category", description = "delete category by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @Parameter(description = "Category id",required = true)
            @PathVariable Long id
    ){
        this.categoryService.deleteById(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Category delete successfuly, id:"+id));
    }

 
}
