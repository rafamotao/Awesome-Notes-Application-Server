package com.myapp.myserver.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AppUser entity.
 */
public class AppUserDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    private String username;

    @NotNull
    private String pass;

    @Size(max = 256)
    private String imageUrl;

    private Set<AppDTO> apps = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<AppDTO> getApps() {
        return apps;
    }

    public void setApps(Set<AppDTO> apps) {
        this.apps = apps;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AppUserDTO appUserDTO = (AppUserDTO) o;
        if(appUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppUserDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", pass='" + getPass() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", apps=" + getApps().toString() +
            "}";
    }
}
