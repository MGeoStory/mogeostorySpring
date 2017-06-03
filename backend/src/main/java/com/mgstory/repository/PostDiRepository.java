package com.mgstory.repository;

import com.mgstory.domain.PostDi;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import org.springframework.data.repository.query.Param;

@RepositoryRestResource(collectionResourceRel = "postdi", path = "postdi", exported = false)
public interface PostDiRepository extends CrudRepository<PostDi, Integer> {

    @RestResource(path = "year", rel = "findByYear")
    List<PostDi> findByYears(@Param("y") Integer year);
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