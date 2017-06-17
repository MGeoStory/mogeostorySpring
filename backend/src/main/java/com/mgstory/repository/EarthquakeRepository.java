package com.mgstory.repository;

import com.mgstory.domain.Earthquake;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface EarthquakeRepository extends PagingAndSortingRepository<Earthquake, Integer> {
    Earthquake findById(Integer id);
    Iterable<Earthquake> findByYearBetween(Integer min, Integer max);

}
