package com.mgstory.repository;

import com.mgstory.domain.Earthquake;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

@RepositoryRestResource(exported = false)
public interface EarthquakeRepository extends PagingAndSortingRepository<Earthquake, Integer> {

    // @Query(value = "select id,code from earthquake e where e.id = ?1", nativeQuery = true)
    // Earthquake findById(Integer id);

    // @Query(value = " SELECT code FROM earthquake  WHERE id = :id", nativeQuery = true)
    Earthquake findById(@Param("id") Integer id);
        
    Iterable<Earthquake> findByYearBetween(Integer min, Integer max);

}
