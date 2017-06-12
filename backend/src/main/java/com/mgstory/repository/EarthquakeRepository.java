package com.mgstory.repository;

import com.mgstory.domain.Earthquake;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;
@RepositoryRestResource(exported = false)
public interface EarthquakeRepository extends PagingAndSortingRepository<Earthquake, Integer> {
    Earthquake findById(Integer id);
}
