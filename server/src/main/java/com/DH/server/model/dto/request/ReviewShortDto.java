package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReviewShortDto(

        @Size(min = 3,max = 300, groups = {OnCreate.class, OnUpdate.class})
        String comment,

        @Min(1) @Max(5)
        int score){
}
