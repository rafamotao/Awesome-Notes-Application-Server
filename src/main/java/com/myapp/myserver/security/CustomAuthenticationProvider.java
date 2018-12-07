package com.myapp.myserver.security;

import java.util.Collection;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.myapp.myserver.domain.AppUser;
import com.myapp.myserver.service.AppService;
import com.myapp.myserver.service.AppUserService;
import com.myapp.myserver.service.dto.AppDTO;
import com.myapp.myserver.service.dto.AppUserDTO;
import com.myapp.myserver.service.mapper.AppUserMapper;
 
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
 
	private final Logger log = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
		
	@Autowired
	private AppUserMapper appUserMapper;
	
    @Autowired
    private AppUserService appUserService;
    
    @Autowired
    private AppService appService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    		log.debug("CustomAuthenticationProvider: " + authentication.toString());
        String username = authentication.getName(); // Retrieve username from authentication 
        String password = (String) authentication.getCredentials(); // Retrieve password from authentication 
        long appId = Long.parseLong(authentication.getDetails().toString()); // Retrieve appId from authentication 
        
        AppUser appUser = null;
        AppUserDTO appUserDTO = null;
        		
        try {
        		appUserDTO = appUserService.loadUserByUsername(username);
        		log.debug(appUserDTO.toString());
        		appUser = appUserMapper.toEntity(appUserDTO);
        		
        } catch (Exception e) {
        		log.debug("EXCEPTION: Username not found:" + e);
        		throw new BadCredentialsException("Username not found.");
		}
        
        // Check Password
        log.debug(password+"--"+appUser.getPass()+"--"+appId);
        	if (!password.equals(appUser.getPass())) {
			throw new BadCredentialsException("Wrong password.");
		}
        	
        	// Check App
        Set<AppDTO> apps = appUserDTO.getApps(); // Retrieve AppDTO from this user
        log.debug(apps.toString());
        boolean haveApp = false;
		for (AppDTO app: apps){
	    		long appIdAux = app.getId();
	    		if ( appIdAux == appId ){
	    			haveApp = true;
	    		} 
		}
	    if (!haveApp) {
	    		throw new BadCredentialsException("Haven't permission for this app.");
	    }
        
        return new UsernamePasswordAuthenticationToken(appUser, password);
    }
 
    @Override
    public boolean supports(Class<?> arg0) {
        return true;
    }
}
