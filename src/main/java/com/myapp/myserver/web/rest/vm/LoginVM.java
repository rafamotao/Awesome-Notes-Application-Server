package com.myapp.myserver.web.rest.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.myapp.myserver.web.rest.vm.ManagedUserVM;

/**
 * View Model object for storing a user's credentials.
 */
public class LoginVM {

	@NotNull
    @Size(min = 1, max = 50)
    private String username;

    @NotNull
    @Size(min = ManagedUserVM.PASSWORD_MIN_LENGTH, max = ManagedUserVM.PASSWORD_MAX_LENGTH)
    private String password;

    private Long appId;
    
    private Boolean rememberMe;
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}
	
	public Boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(Boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

	@Override
    public String toString() {
        return "LoginVM{" +
            "username='" + username + '\'' +
            ", appId=" + appId +
            '}';
    }
}
