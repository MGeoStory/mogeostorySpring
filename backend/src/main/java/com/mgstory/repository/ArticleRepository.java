package com.mgstory.repository;

import com.mgstory.domain.Article;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.at-query
//Rel is to reference the collection of database
@RepositoryRestResource(exported = false)
public interface ArticleRepository extends PagingAndSortingRepository<Article, Integer> {
    List<Article> findAllByOrderByIdAsc();
}