package com.portfolio.back.dto;

import com.portfolio.back.domain.Image;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageRes {

    private Long id;
    private String src;

    @Builder
    public ImageRes(Image image) {
        this.id = image.getId();
        this.src = image.getSrc();
    }
}
