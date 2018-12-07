package com.myapp.myserver.repository;

import com.myapp.myserver.domain.AppUser;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the AppUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    @Query("select distinct app_user from AppUser app_user left join fetch app_user.apps")
    List<AppUser> findAllWithEagerRelationships();

    @Query("select app_user from AppUser app_user left join fetch app_user.apps where app_user.id =:id")
    AppUser findOneWithEagerRelationships(@Param("id") Long id);

    AppUser getByUsername(String username);
}
