package com.mgstory.repository;

import com.mgstory.domain.PostDi;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "postdi", path = "postdi")
public interface PostDiRepository extends CrudRepository<PostDi, Integer> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    PostDi save(PostDi a);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Integer id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(PostDi entity);
}