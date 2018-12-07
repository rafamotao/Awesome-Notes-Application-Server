package com.myapp.myserver.service;

import com.myapp.myserver.service.dto.AppDTO;
import java.util.List;

/**
 * Service Interface for managing App.
 */
public interface AppService {

    /**
     * Save a app.
     *
     * @param appDTO the entity to save
     * @return the persisted entity
     */
    AppDTO save(AppDTO appDTO);

    /**
     * Get all the apps.
     *
     * @return the list of entities
     */
    List<AppDTO> findAll();

    /**
     * Get the "id" app.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AppDTO findOne(Long id);

    /**
     * Delete the "id" app.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
