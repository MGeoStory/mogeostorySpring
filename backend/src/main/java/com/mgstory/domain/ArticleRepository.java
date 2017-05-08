package com.mgstory.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import java.util.List;
import org.springframework.data.repository.query.Param;

@RepositoryRestResource(collectionResourceRel = "article", path = "article")
public interface ArticleRepository extends PagingAndSortingRepository<Article, Integer> {

    //http://localhost:8080/api/article/search/kind?k=test
    @RestResource(path = "kind", rel = "findByKind")
    public List<Article> findByKind(@Param("k") String kind);


    // Prevents POST /people and PATCH /people/:id
    @Override
    @RestResource(exported = false)
    public Article save(Article a);

    @Override
    @RestResource(exported = false)
    void delete(Integer id);

    @Override
    @RestResource(exported = false)
    void delete(Article entity);
}