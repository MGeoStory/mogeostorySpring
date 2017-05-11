package com.mgstory.repository;

import com.mgstory.domain.Articles;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;


//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
//Rel is to reference the collection of database
@RepositoryRestResource(collectionResourceRel = "articles", path = "articles")
public interface ArticleRepository extends PagingAndSortingRepository<Articles, Integer> {

    //http://localhost:8080/article/search/kind?k=test == api/article/search/kind/test
    @RestResource(path = "kind", rel = "findByKind")
    public List<Articles> findByKind(@Param("k") String kind);

    // where x.authur = author (findBy"Author"")
    @RestResource(path = "author", rel = "findByAuthor")
    public List<Articles> findByAuthor(@Param("a") String author);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    Articles save(Articles a);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Integer id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Articles entity);
}