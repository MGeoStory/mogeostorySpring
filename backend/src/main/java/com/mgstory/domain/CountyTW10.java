package com.mgstory.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.MultiPolygon;
import org.hibernate.annotations.Type;
import com.bedatadriven.jackson.datatype.jts.*;
// import com.vividsolutions.jts.geom.GeometryCollection;

@Entity
@Table(name = "county_tw_10")
public class CountyTW10 implements Serializable {

    private static final long serialVersionUID = 100002L;

    // Object-Relational Mapping => generate primary key
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ogc_fid;
    
    // @Column(name = "wkb_geometry",columnDefinition="geometry(Geometry,4326)")
    @Column(name = "wkb_geometry")
    // @Type(type="org.hibernate.spatial.GeometryType")
    private String wkb_geometry;
    public String getWKBGeometry() {
        return wkb_geometry;
    }

    @Column(name = "countyid")
    private String countyId;

    @Column(name = "countycode")
    private String countyCode;

    @Column(name = "countyname")
    private String countyName;

    @Column(name = "countyEng")
    private String countyEnd;

    public Integer getId() {
        return ogc_fid;
    }


    public String getCountyId() {
        return countyId;
    }

    public String getCountyCode() {
        return countyCode;
    }

    public String getCountryName() {
        return countyName;
    }

    public CountyTW10() {
    }
}