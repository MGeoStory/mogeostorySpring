package com.mgstory.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "article", path = "art")
public interface ArticleReopsitory extends CrudRepository<Article, Integer> {
}