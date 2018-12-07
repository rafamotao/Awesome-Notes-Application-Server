package com.myapp.myserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.myapp.myserver.domain.AppUser;
import com.myapp.myserver.repository.AppUserRepository;
import com.myapp.myserver.service.AppUserService;
import com.myapp.myserver.service.dto.AppUserDTO;
import com.myapp.myserver.web.rest.errors.*;
import com.myapp.myserver.web.rest.util.HeaderUtil;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class MyAppAccountResource {

	public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;
    
    private final Logger log = LoggerFactory.getLogger(MyAppAccountResource.class);
    
    private final AppUserRepository appUserRepository;

    private final AppUserService appUserService;

    public MyAppAccountResource(AppUserRepository appUserRepository, AppUserService appUserService) {

        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
    }

    /**
     * POST  /register : register the appuser.
     *
     * @param managedUserVM the managed user View Model
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the username is already used
     * @return the ResponseEntity with status 201 (Created) and with body the new appUserDTO
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/register")
    @Timed
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AppUserDTO> registerAccount(@Valid @RequestBody AppUserDTO appUserDTO) throws URISyntaxException{
        if (!checkPasswordLength(appUserDTO.getPass())) {
            throw new InvalidPasswordException();
        }
        AppUser appUser = null;
        appUser = appUserRepository.getByUsername(appUserDTO.getUsername().toLowerCase());
        if(appUser!=null) throw new UsernameAlreadyUsedException();
        	
        AppUserDTO result = appUserService.save(appUserDTO);
        
        return ResponseEntity.created(new URI("/api/app-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("appuser", result.getId().toString()))
            .body(result);
    }
    
    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
            password.length() >= PASSWORD_MIN_LENGTH &&
            password.length() <= PASSWORD_MAX_LENGTH;
    }
}
