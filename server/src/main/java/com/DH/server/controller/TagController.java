package com.DH.server.controller;

import com.DH.server.model.dto.ApiResponseDto;
import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.dto.request.TagReqDto;
import com.DH.server.model.dto.response.CategoryResDto;
import com.DH.server.model.dto.response.TagResDto;
import com.DH.server.model.mapper.TagMapper;
import com.DH.server.service.implement.TagServiceImpl;
import com.DH.server.service.interfaces.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/tag")
public class TagController {

    private final TagService tagService;
    private final TagMapper tagMapper;


    @Operation(summary = "Create Tag",description = "Tag created" )
    @PostMapping
    public ResponseEntity<?> create(@RequestBody
                                    @Validated(OnCreate.class)
                                    TagReqDto request){
        var tag=this.tagMapper.toEntity(request);
        tag=this.tagService.create(tag);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponseDto<>(this.tagMapper.toResponse(tag)));
    }

    @Operation(summary = "Get all Tags ")
    @GetMapping
    public ResponseEntity<?> getAll(){
        var tags =this.tagService.getAll();
        List<TagResDto> tagResDtos = tags.stream()
                .map(this.tagMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(
                new ApiResponseDto<>(tagResDtos));
    }
    @Operation(summary = "Get Tag by Id")
    @GetMapping("/{id}")
    public ResponseEntity<?> getbyId(@Parameter(description = "Tag id",required = true)
                                     @PathVariable Long id){
        var tagID=this.tagService.getById(id);
        return ResponseEntity.ok(new ApiResponseDto<>(this.tagMapper.toResponse(tagID)));
    }

    @Operation(summary = "Update Tag",description = "fetch tags using id")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Validated(OnUpdate.class)
                                    @RequestBody
                                    @Parameter(description = "Tag id",required = true)
                                    TagReqDto request){

        var tag =this.tagMapper.toEntity(request);
        tag=this.tagService.updateById(id,tag);
        return ResponseEntity.ok(new ApiResponseDto<>(this.tagMapper.toResponse(tag)));
    }

    @Operation(summary = "Delete Tag",description = "delete tag by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@Parameter(description = "Tag id",required = true)
                                    @PathVariable Long id){
        this.tagService.deleteById(id);
        return ResponseEntity.ok(new ApiResponseDto<>("Tag delete successfuly, id:"+id));
    }
}
