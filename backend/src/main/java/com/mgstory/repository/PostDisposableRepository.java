package com.mgstory.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.mgstory.domain.PostDisposable;


@RepositoryRestResource(exported=false)
public interface PostDisposableRepository extends CrudRepository<PostDisposable, Integer> {
}