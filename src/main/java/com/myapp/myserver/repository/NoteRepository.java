package com.myapp.myserver.repository;

import com.myapp.myserver.domain.Note;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Note entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
	List<Note> getByAppUserId(Long app_user_id);
}
