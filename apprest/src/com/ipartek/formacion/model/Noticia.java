package com.ipartek.formacion.model;

import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Noticia {
	
	private int id;
	
	@Size (min=2, max=250, message="El titulo tiene que tener entre 2 y 250 caracteres")
	private String titulo;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone="Europe/Madrid")
	private Date fecha;
	
	@NotEmpty
	private String contenido;
	
	public Noticia(int id, String titulo, Date fecha, String contenido) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.fecha = fecha;
		this.contenido = contenido;
	}

	public Noticia() {

		}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	@Override
	public String toString() {
		return "Noticia [id=" + id + ", titulo=" + titulo + ", fecha=" + fecha + ", contenido=" + contenido + "]";
	}
			
}
