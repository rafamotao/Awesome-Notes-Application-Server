package com.myapp.myserver.service.impl;

import com.myapp.myserver.service.NoteService;
import com.myapp.myserver.domain.Note;
import com.myapp.myserver.repository.NoteRepository;
import com.myapp.myserver.service.dto.NoteDTO;
import com.myapp.myserver.service.mapper.NoteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Note.
 */
@Service
@Transactional
public class NoteServiceImpl implements NoteService{

    private final Logger log = LoggerFactory.getLogger(NoteServiceImpl.class);

    private final NoteRepository noteRepository;

    private final NoteMapper noteMapper;

    public NoteServiceImpl(NoteRepository noteRepository, NoteMapper noteMapper) {
        this.noteRepository = noteRepository;
        this.noteMapper = noteMapper;
    }

    /**
     * Save a note.
     *
     * @param noteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public NoteDTO save(NoteDTO noteDTO) {
        log.debug("Request to save Note : {}", noteDTO);
        Note note = noteMapper.toEntity(noteDTO);
        note = noteRepository.save(note);
        return noteMapper.toDto(note);
    }

    /**
     * Get all the notes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NoteDTO> findAll() {
        log.debug("Request to get all Notes");
        return noteRepository.findAll().stream()
            .map(noteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one note by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public NoteDTO findOne(Long id) {
        log.debug("Request to get Note : {}", id);
        Note note = noteRepository.findOne(id);
        return noteMapper.toDto(note);
    }

    /**
     * Get all the notes of "id" user.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NoteDTO> findAllOfUser(Long id) {
        log.debug("Request to get all Notes of User: {}", id);
        return noteRepository.getByAppUserId(id).stream()
            .map(noteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    
    /**
     * Delete the note by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Note : {}", id);
        noteRepository.delete(id);
    }
}
