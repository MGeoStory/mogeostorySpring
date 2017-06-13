package com.mgstory.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
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
import java.awt.List;

@RestController
@RequestMapping(value = "api/v1/earthquake")
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
        Earthquake e = repository.findById(id);
        log.info(gson.toJson(e));
        JsonObject geojson= new JsonObject();

        JsonObject geometry= new JsonObject();
        JsonObject properties = new JsonObject();
        geojson.addProperty("type","Feature");

        geometry.addProperty("type","Point");
        geometry.addProperty("cordinates","["+e.getLng().toString()+","+e.getLat().toString()+"]");
        geojson.add("geometry",new Gson().toJsonTree(geometry));

        properties.addProperty("id",e.getId().toString());
        properties.addProperty("code",e.getCode().toString());
        properties.addProperty("date",e.getDate().toString());
        properties.addProperty("deep",e.getDeep().toString());
        properties.addProperty("scale",e.getScale().toString());
        properties.addProperty("county",e.getCounty().toString());
        properties.addProperty("location",e.getLocation().toString());
        geojson.add("properties",properties);
        JsonArray array = new JsonArray();
        array.add(geojson);
        array.add(geojson);
        array.add(geojson);

        // JsonObject[] test = new JsonObject();


        log.info(array.toString());
        return repository.findById(id);
    }
}