package com.mgstory.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

    @Column(name = "code_yn")
    private String codeYN;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "deep")
    private Double deep;

    @Column(name = "scale")
    private Double scale;

    @Column(name = "year_")
    private Integer year;

    @Column(name = "region")
    private String region;

    @Column(name = "center")
    private String center;

    @Column(name = "time_")
    private String date;

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getCodeYN() {
        return codeYN;
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

    public String getRegion() {
        return region;
    }

    public String getCenter() {
        return center;
    }

    public Integer getYear() {
        return year;
    }

    public String getDate() {
        return date;
    }

    public Earthquake() {
    }
}