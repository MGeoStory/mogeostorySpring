package com.mgstory.controller;

import com.mgstory.repository.EarthquakeRepository;
import com.mgstory.domain.Earthquake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(value = "api/v1/earthquake")
public class EarthquakeController {

    @Autowired
    EarthquakeRepository repository;

    Earthquake article = new Earthquake();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Earthquake> findAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Earthquake findById(@PathVariable Integer id) {
        return repository.findById(id);
    }

}