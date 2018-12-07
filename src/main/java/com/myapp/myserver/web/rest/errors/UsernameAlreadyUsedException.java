package com.myapp.myserver.web.rest.errors;

public class UsernameAlreadyUsedException extends BadRequestAlertException {

    public UsernameAlreadyUsedException() {
        super(ErrorConstants.USERNAME_ALREADY_USED_TYPE, "Username already in use", "userManagement", "userexists");
    }
}
