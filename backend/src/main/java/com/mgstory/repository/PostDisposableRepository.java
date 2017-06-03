package com.mgstory.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.mgstory.domain.PostDisposable;
import java.util.List;

@RepositoryRestResource(exported = false)
public interface PostDisposableRepository extends CrudRepository<PostDisposable, Integer> {
    List<PostDisposable> findByYears(Integer year);

    List<PostDisposable> findByYearsAndCityId(Integer year, String cityId);

    @Query(value = "select min(years) min, max(years) max from disposable", nativeQuery = true)
    Object[] findExtentValues();

    @Query(value = "select min(years) from disposable", nativeQuery = true)
    Integer findMinYear();

    @Query(value = "select max(years) from disposable", nativeQuery = true)
    Integer findMaxYear();
}