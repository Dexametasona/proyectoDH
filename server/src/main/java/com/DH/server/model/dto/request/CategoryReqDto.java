package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import com.DH.server.model.entity.Photo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record CategoryReqDto(
        @NotBlank(groups = {OnCreate.class})
        @Size(min = 5, max = 100, groups = {OnCreate.class, OnUpdate.class})
        String title,

        @NotBlank(groups = {OnCreate.class})
        @Size(groups = {OnCreate.class, OnUpdate.class})
        String description,


        // Recibiendo la foto como archivo
        @NotNull(groups = {OnCreate.class})
        //String url
        MultipartFile photo

){
}
