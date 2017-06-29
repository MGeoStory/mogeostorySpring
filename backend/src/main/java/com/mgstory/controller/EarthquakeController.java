package com.mgstory.controller;

import com.mgstory.model.EarthquakeModel;
import com.mgstory.repository.EarthquakeRepository;
import com.mgstory.domain.Earthquake;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;

@RestController
@RequestMapping(value = "api/v1/earthquakes")
public class EarthquakeController {

    Logger log = LoggerFactory.getLogger(EarthquakeController.class);
    Gson gson = new Gson();
    EarthquakeModel model = new EarthquakeModel();

    @Autowired
    EarthquakeRepository repository;

    Earthquake earthquake = new Earthquake();

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Earthquake> findAll() {
        return repository.findAll();
    }

    @RequestMapping(value = "/geo", method = RequestMethod.GET)
    public String findGeoAll() {
        Iterable<Earthquake> es = repository.findAll();
        String geojson = model.getGeoFromEarthquakes(es);
        return geojson;
    }

    @RequestMapping(value = "/geo/year/{min}/{max}", method = RequestMethod.GET)
    public String findGeoByYearBetween(@PathVariable(value = "min") Integer min,
            @PathVariable(value = "max") Integer max) {
        // log.info(min.toString());
        // log.info(max.toString());
        Iterable<Earthquake> es = repository.findByYearBetween(min, max);
        String geojson = model.getGeoFromEarthquakes(es);
        return geojson;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Earthquake findById(@PathVariable Integer id) {   
        return repository.findById(id);

    }

    @RequestMapping(value = "/geo/{id}", method = RequestMethod.GET)
    public String findGeoById(@PathVariable Integer id) {
        Earthquake e = repository.findById(id);
        String geojson = model.getGeoFromEarthquake(e);
        return geojson;
    }

    
}