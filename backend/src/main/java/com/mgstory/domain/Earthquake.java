package com.mgstory.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "earthquake")
public class Earthquake implements Serializable {

    // private static final long serialVersionUID = 100001L
    // Object-Relational Mapping => generate primary key
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "code")
    private String code;

    @Column(name = "date_")
    private Date date_;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "deep")
    private Double deep;

    @Column(name = "scale")
    private Double scale;

    @Column(name = "county")
    private String county;

    @Column(name = "location_")
    private String location_;

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public Date getDate() {
        return date_;
    }

    public Double getLng() {
        return lng;
    }

    public Double getLat() {
        return lat;
    }

    public Double getDeep() {
        return deep;
    }

    public Double getScale() {
        return scale;
    }

    public String getCounty() {
        return county;
    }

    public String getLocation() {
        return location_;
    }

    public Earthquake() {
    }

}