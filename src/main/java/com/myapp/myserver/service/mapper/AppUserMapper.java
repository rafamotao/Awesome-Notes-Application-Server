package com.myapp.myserver.service.mapper;

import com.myapp.myserver.domain.*;
import com.myapp.myserver.service.dto.AppUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AppUser and its DTO AppUserDTO.
 */
@Mapper(componentModel = "spring", uses = {AppMapper.class})
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {

    

    @Mapping(target = "notes", ignore = true)
    AppUser toEntity(AppUserDTO appUserDTO);

    default AppUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppUser appUser = new AppUser();
        appUser.setId(id);
        return appUser;
    }
}
