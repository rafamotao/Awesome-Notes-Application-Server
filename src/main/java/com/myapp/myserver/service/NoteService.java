package com.myapp.myserver.service;

import com.myapp.myserver.service.dto.NoteDTO;
import java.util.List;

/**
 * Service Interface for managing Note.
 */
public interface NoteService {

    /**
     * Save a note.
     *
     * @param noteDTO the entity to save
     * @return the persisted entity
     */
    NoteDTO save(NoteDTO noteDTO);

    /**
     * Get all the notes.
     *
     * @return the list of entities
     */
    List<NoteDTO> findAll();

    /**
     * Get the "id" note.
     *
     * @param id the id of the entity
     * @return the entity
     */
    NoteDTO findOne(Long id);
    
    /**
     * Get all the notes of "id" user.
     *
     * @return the list of entities
     */
    List<NoteDTO> findAllOfUser(Long id);

    /**
     * Delete the "id" note.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
