package com.myapp.myserver.service.mapper;

import com.myapp.myserver.domain.*;
import com.myapp.myserver.service.dto.AppDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity App and its DTO AppDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AppMapper extends EntityMapper<AppDTO, App> {

    

    @Mapping(target = "appUsers", ignore = true)
    App toEntity(AppDTO appDTO);

    default App fromId(Long id) {
        if (id == null) {
            return null;
        }
        App app = new App();
        app.setId(id);
        return app;
    }
}
