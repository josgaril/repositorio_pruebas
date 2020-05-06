package com.ipartek.formacion.model;

import java.util.ArrayList;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class Persona {

	private int id;
	
	@Size (min=2, max=50, message= "El nombre tiene que tener entre 2 y 50 caracteres")
	private String nombre;
	
	@NotEmpty
	private String avatar;
	
	@Pattern(regexp = "^[h|m]{1}$", message ="El sexo debe ser h(hombre) o m(mujer")
	private String sexo;
	
	private ArrayList<Curso> cursos;
	
	@NotNull
	private int rol;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";
		this.avatar = "avatar1.png";
		this.sexo = "";
		this.cursos = new ArrayList<Curso> ();
		this.rol= 1;

	}

	public Persona(int id, String nombre, String avatar, String sexo, int rol) {		
		this();
		this.id = id;
		this.nombre = nombre;
		this.avatar = avatar;
		this.sexo = sexo;	
		this.rol= rol;
		
	}

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

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public ArrayList<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(ArrayList<Curso> cursos) {
		this.cursos = cursos;
	}

	public int getRol() {
		return rol;
	}

	public void setRol(int rol) {
		this.rol = rol;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + ", cursos="
				+ cursos + ", rol=" + rol + "]";
	}


	
}
