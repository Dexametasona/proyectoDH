package com.DH.server.model.dto.request;

import com.DH.server.model.dto.OnCreate;
import com.DH.server.model.dto.OnUpdate;
import jakarta.validation.constraints.*;

public record ReviewReqDto(
        @NotBlank(groups = {OnCreate.class})
        @Size(min = 3,max = 300, groups = {OnCreate.class, OnUpdate.class})
        String comment,

        @Min(1) @Max(5)
        int score,

        @NotNull(groups = {OnCreate.class})
        @Min(value = 0, groups = {OnCreate.class, OnUpdate.class})
        Long order_id

) {}
