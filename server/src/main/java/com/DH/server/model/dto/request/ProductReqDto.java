package com.DH.server.model.dto.request;


import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProductReqDto(
        @NotBlank(groups = {OnCreate.class})
        @Size(min = 10, max = 100, groups = {OnCreate.class, OnUpdate.class})
        String name,
        @NotBlank(groups = {OnCreate.class})
        String description,
        @NotNull(groups = {OnCreate.class})
        @Min(value = 0, groups = {OnCreate.class, OnUpdate.class})
        Double price,
        @NotBlank(groups = {OnCreate.class})
        @Size(min = 2, max = 50, groups = {OnCreate.class, OnUpdate.class})
        String brand,
        @NotNull(groups = {OnCreate.class})
        @Size(min = 4, groups = {OnCreate.class, OnUpdate.class})
        List<MultipartFile> photos,
        @NotNull(groups = {OnCreate.class})
        @Min(value = 0, groups = {OnCreate.class, OnUpdate.class})
        Integer categoryId,
        @NotNull(groups = {OnCreate.class})
        @Min(value = 0, groups = {OnCreate.class, OnUpdate.class})
        Integer tagId
) {
}
