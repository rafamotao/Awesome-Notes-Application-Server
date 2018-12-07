package com.myapp.myserver.service.mapper;

import com.myapp.myserver.domain.*;
import com.myapp.myserver.service.dto.NoteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Note and its DTO NoteDTO.
 */
@Mapper(componentModel = "spring", uses = {AppUserMapper.class})
public interface NoteMapper extends EntityMapper<NoteDTO, Note> {

    @Mapping(source = "appUser.id", target = "appUserId")
    NoteDTO toDto(Note note); 

    @Mapping(source = "appUserId", target = "appUser")
    Note toEntity(NoteDTO noteDTO);

    default Note fromId(Long id) {
        if (id == null) {
            return null;
        }
        Note note = new Note();
        note.setId(id);
        return note;
    }
}
