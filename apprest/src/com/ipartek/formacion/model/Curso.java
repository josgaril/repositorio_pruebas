package com.ipartek.formacion.model;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class Curso {
    
    //Variables
    private int id;
    
    @Size (min=2, max=100, message="El nombre tiene que tener entre 2 y 100 caracteres")
    private String nombre;
    
    @NotEmpty (message = "La imágen del curso no puede ser nula")
    private String imagen;
    
    @Positive (message="El precio del curso debe ser positivo")
    private float precio;
    
    @NotNull 
    @Valid //Valida la Persona
    private Persona profesor;
    
    //Constructores
    public Curso() {
        /*
         * super(); this.id = 0; this.nombre = ""; this.imagen = ""; this.precio = 0;
         * this.profesor = new Persona();
         */
    }
    
    public Curso(int id, String nombre, String imagen, float precio, Persona profesor) {
        this();
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.profesor = profesor;
    }

    //Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public Persona getProfesor() {
        return profesor;
    }

    public void setProfesor(Persona profesor) {
        this.profesor = profesor;
    }

    @Override
    public String toString() {
        return "Curso [id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", precio=" + precio + ", profesor="
                + profesor + "]";
    }
        
}
