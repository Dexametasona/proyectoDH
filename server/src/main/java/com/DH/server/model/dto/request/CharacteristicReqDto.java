package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CharacteristicReqDto (
        @NotNull(groups = {OnCreate.class})
        @Min(value= 0, groups = {OnCreate.class})
        Integer type,

        @NotBlank(groups = {OnCreate.class, OnUpdate.class})
        @Size(min = 3,max = 300, groups = {OnCreate.class, OnUpdate.class})
        String description){


}
