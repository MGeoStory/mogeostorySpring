package com.mgstory.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.mgstory.domain.PostDisposable;
import java.util.List;

@RepositoryRestResource(exported=false)
public interface PostDisposableRepository extends CrudRepository<PostDisposable, Integer> {
    List<PostDisposable> findByYears(Integer year);

    List<PostDisposable> findByYearsAndCityId(Integer year, String cityId);
}