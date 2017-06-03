package com.mgstory.controller;

import com.mgstory.repository.PostDisposableRepository;
import com.mgstory.domain.PostDisposable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/disposable")
public class PostDisposableController {
    @Autowired
    PostDisposableRepository repository;

    PostDisposable disposable = new PostDisposable();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<PostDisposable> findAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{year}", method = RequestMethod.GET)
    public Iterable<PostDisposable> findByYear(@PathVariable Integer year) {
        System.out.print(year);
        return repository.findByYears(year);
    }

    @RequestMapping(value="/{year}/city/{cityId}",method=RequestMethod.GET)
    public Iterable<PostDisposable> findByYearAndCityId(
        @PathVariable("year") Integer year, 
        @PathVariable("cityId")String cityId){
            return repository.findByYearsAndCityId(year, cityId.toUpperCase());
    }
}