package com.myapp.myserver.web.rest;

import com.myapp.myserver.security.CustomAuthenticationProvider;
import com.myapp.myserver.security.jwt.JWTConfigurer;
import com.myapp.myserver.security.jwt.TokenProvider;
import com.myapp.myserver.service.AppUserService;
import com.myapp.myserver.service.dto.AppUserDTO;
import com.myapp.myserver.web.rest.vm.LoginVM;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

//import static org.assertj.core.api.Assertions.assertThatIllegalStateException;

import javax.validation.Valid;

/**
 * Controller to authenticate appusers.
 */
@RestController
@RequestMapping("/api")
public class AppUserJWTController {

	private final Logger log = LoggerFactory.getLogger(AppUserJWTController.class);
	
    private final TokenProvider tokenProvider;

    private final CustomAuthenticationProvider customAuthenticationProvider;
    
    private final AppUserService appUserService;
    
    public AppUserJWTController(TokenProvider tokenProvider, 
    										CustomAuthenticationProvider customAuthenticationProvider,
    										AppUserService appUserService) {
        this.tokenProvider = tokenProvider;
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.appUserService = appUserService;
    }

    @PostMapping("/authenticate")
    @Timed
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

        authenticationToken.setDetails(loginVM.getAppId());
        Authentication authentication = this.customAuthenticationProvider.authenticate(authenticationToken);
        
        ((AbstractAuthenticationToken) authentication).setDetails(loginVM.getAppId());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);
        AppUserDTO appUserDTO = this.appUserService.loadUserByUsername(loginVM.getUsername());
        log.debug("CHEGUEI AQUI");
        return new ResponseEntity<>(new JWTToken(jwt, appUserDTO.getId()), httpHeaders, HttpStatus.OK);
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;
        private Long idAppUser;
        
        JWTToken(String idToken, Long idAppUser) {
            this.idToken = idToken;
            this.idAppUser = idAppUser;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
        
        @JsonProperty("id_user")
        Long getIdAppUser() {
            return idAppUser;
        }

        void setIdAppUser(Long idAppUser) {
            this.idAppUser = idAppUser;
        }
    }
}
