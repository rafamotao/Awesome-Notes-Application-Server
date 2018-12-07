package com.myapp.myserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AppUser.
 */
@Entity
@Table(name = "app_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AppUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, unique = true, nullable = false)
    private String username;

    @NotNull
    @Column(name = "pass", nullable = false)
    private String pass;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @OneToMany(mappedBy = "appUser")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Note> notes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "app_user_app",
               joinColumns = @JoinColumn(name="app_users_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="apps_id", referencedColumnName="id"))
    private Set<App> apps = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public AppUser username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPass() {
        return pass;
    }

    public AppUser pass(String pass) {
        this.pass = pass;
        return this;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public AppUser imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public AppUser notes(Set<Note> notes) {
        this.notes = notes;
        return this;
    }

    public AppUser addNote(Note note) {
        this.notes.add(note);
        note.setAppUser(this);
        return this;
    }

    public AppUser removeNote(Note note) {
        this.notes.remove(note);
        note.setAppUser(null);
        return this;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Set<App> getApps() {
        return apps;
    }

    public AppUser apps(Set<App> apps) {
        this.apps = apps;
        return this;
    }

    public AppUser addApp(App app) {
        this.apps.add(app);
        app.getAppUsers().add(this);
        return this;
    }

    public AppUser removeApp(App app) {
        this.apps.remove(app);
        app.getAppUsers().remove(this);
        return this;
    }

    public void setApps(Set<App> apps) {
        this.apps = apps;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AppUser appUser = (AppUser) o;
        if (appUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppUser{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", pass='" + getPass() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            "}";
    }
}
