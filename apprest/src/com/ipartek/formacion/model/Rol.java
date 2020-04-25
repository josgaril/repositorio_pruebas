package com.ipartek.formacion.model;

import javax.validation.constraints.Size;

public class Rol {

    private int rol;
    
    @Size (min=2, max=50, message= "El nombre tiene que tener entre 2 y 50 caracteres")
    private String nombre;

    
    public Rol(int rol, String nombre) {
        super();
        this.rol = rol;
        this.nombre = nombre;
    }
    
    public Rol() {
        super();
        this.rol = 0;
        this.nombre = "";
    }
    
    public int getRol() {
        return rol;
    }
    
    public void setRol(int rol) {
        this.rol = rol;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    @Override
    public String toString() {
        return "Rol [rol=" + rol + ", nombre=" + nombre + "]";
    }
    
    
}

