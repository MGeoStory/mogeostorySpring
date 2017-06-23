package com.mgstory.model;

import com.mgstory.domain.Earthquake;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class EarthquakeModel {

    Logger log = LoggerFactory.getLogger(EarthquakeModel.class);

    public EarthquakeModel() {

    }

    /**
     * @param:Earthquake
     */
    public String getGeoFromEarthquake(Earthquake e) {
        //first{"type","FeatureCollection"} 
        JsonObject geojson = new JsonObject();
        geojson.addProperty("type", "FeatureCollection");

        //first{"features",points}
        JsonArray points = new JsonArray();

        //{"features":[{"type","Feature"}]}
        JsonObject point = new JsonObject();
        point.addProperty("type", "Feature");

        //{"features":[{"properties",{"id",id}}]}
        JsonObject properties = new JsonObject();
        properties.addProperty("id", e.getId());

        //{"features":[{"geometry":{"type","Point"}}]}
        JsonObject geometry = new JsonObject();
        geometry.addProperty("type", "Point");

        //{"features":[{"geometry":{"coordinates",lngLat}}]}
        double[] lngLat = { e.getLng(), e.getLat() };
        geometry.add("coordinates", new Gson().toJsonTree(lngLat));

        //single point
        point.add("properties", properties);
        point.add("geometry", geometry);

        //add all points
        points.add(point);

        //first{"features",points}
        //add points to features
        geojson.add("features", points);

        return geojson.toString();
    }//.getGeojsonFromEarthquake

    public String getGeoFromEarthquakes(Iterable<Earthquake> es) {
        //first{"type","FeatureCollection"} 
        JsonObject geojson = new JsonObject();
        geojson.addProperty("type", "FeatureCollection");

        //first{"features",points}
        JsonArray points = new JsonArray();

        //add points to features
        es.forEach((e) -> {
            //{"features":[{"type","Feature"}]}
            JsonObject point = new JsonObject();
            point.addProperty("type", "Feature");

            //{"features":[{"properties",{"id",id}}]}
            JsonObject properties = new JsonObject();
            properties.addProperty("id", e.getId());
            properties.addProperty("deep",e.getDeep());
            properties.addProperty("scale",e.getScale());
            properties.addProperty("region",e.getRegion());
            // properties.addProperty("code",e.getCode());
            // properties.addProperty("center",e.getCenter());
            // properties.addProperty("date",e.getDate());
            // properties.addProperty("year",e.getYear());

            //{"features":[{"geometry":{"type","Point"}}]}
            JsonObject geometry = new JsonObject();
            geometry.addProperty("type", "Point");

            //{"features":[{"geometry":{"coordinates",lngLat}}]}
            double[] lngLat = { e.getLng(), e.getLat() };
            geometry.add("coordinates", new Gson().toJsonTree(lngLat));

            //single point
            point.add("properties", properties);
            point.add("geometry", geometry);

            //add all points
            points.add(point);

        });
        //first{"features",points}
        geojson.add("features", points);
        return geojson.toString();
    }
}