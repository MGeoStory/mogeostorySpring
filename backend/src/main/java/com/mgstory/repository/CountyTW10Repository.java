package com.mgstory.repository;

import com.mgstory.domain.CountyTW10;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
//Rel is to reference the collection of database
@RepositoryRestResource(collectionResourceRel = "countytw10", path = "countytw10", exported = false)
public interface CountyTW10Repository extends CrudRepository<CountyTW10, Integer> {

    @RestResource(path = "kind", rel = "findByKind")
    @Query(value = "select * from Countytw10 where countyid = ?B", nativeQuery = true)
    CountyTW10 test();

    // @Query("SELECT * FROM CountyTW10 WHERE countyid = ?A")
    // @RestResource(path = "test", rel = "test")
    // public List<CountyTW10> findByKind();

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    CountyTW10 save(CountyTW10 a);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Integer id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(CountyTW10 entity);
}