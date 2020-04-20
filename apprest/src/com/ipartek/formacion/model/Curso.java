package com.ipartek.formacion.model;

import java.math.BigDecimal;

import javax.validation.constraints.NotEmpty;
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
	
	//Constructores
	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.imagen = "";
		this.precio = 0;
	}
	
	public Curso(int id, String nombre, String imagen, float precio) {
		this();
		this.id = id;
		this.nombre = nombre;
		this.imagen = imagen;
		this.precio = precio;
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

	//ToString
	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", precio=" + precio + "]";
	}
		
}
