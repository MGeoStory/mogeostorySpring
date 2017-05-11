package com.mgstory.repository;

import com.mgstory.domain.Article;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;


//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
//Rel is to reference the collection of database
@RepositoryRestResource(collectionResourceRel = "article", path = "article")
public interface ArticleRepository extends PagingAndSortingRepository<Article, Integer> {

    //http://localhost:8080/article/search/kind?k=test == api/article/search/kind/test
    @RestResource(path = "kind", rel = "findByKind")
    public List<Article> findByKind(@Param("k") String kind);

    // where x.authur = author (findBy"Author"")
    @RestResource(path = "author", rel = "findByAuthor")
    public List<Article> findByAuthor(@Param("a") String author);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    Article save(Article a);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Integer id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    @RestResource(exported = false)
    void delete(Article entity);
}