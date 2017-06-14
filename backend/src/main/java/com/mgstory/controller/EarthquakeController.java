package com.mgstory.controller;

import com.mgstory.repository.EarthquakeRepository;
import com.mgstory.domain.Earthquake;
import com.vividsolutions.jts.geom.Geometry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@RestController
@RequestMapping(value = "api/v1/earthquakes")
public class EarthquakeController {

    Logger log = LoggerFactory.getLogger(EarthquakeController.class);
    Gson gson = new Gson();

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

    @RequestMapping(value= "/geo/{id}", method = RequestMethod.GET)
    public String findGById(@PathVariable Integer id){
        Earthquake e = repository.findById(id);
        
        //first{"type","FeatureCollection"} 
        JsonObject geojson = new JsonObject();
        geojson.addProperty("type","FeatureCollection");

        //first{"features",points}
        JsonObject featrues = new JsonObject();
        JsonArray points = new JsonArray();
        featrues.add("featrues", points);
        
        //{"features":[{"type","Feature"}]}
        JsonObject point = new JsonObject();
        point.addProperty("type","Feature");
        
        //{"features":[{"properties",{"id",id}}]}
        JsonObject properties = new JsonObject();
        properties.addProperty("id",e.getId());

        //{"features":[{"geometry":{"type","Point"}}]}
        JsonObject geometry = new JsonObject();
        geometry.addProperty("type","Point");

        //{"features":[{"geometry":{"coordinates",lngLat}}]}
        double[] lngLat = {e.getLng(),e.getLat()};
        geometry.add("coordinates", new Gson().toJsonTree(lngLat));
        
        //single point
        point.add("properties",properties);
        point.add("geometry",geometry);
        
        //add all points
        points.add(point);
        points.add(point);

        //add points to features
        geojson.add("features",points);

        return geojson.toString();
    }
}