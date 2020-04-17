package com.ipartek.formacion.api.controller;

import java.util.ArrayList;

public class ResponseBody {

	private String informacion;
	private ArrayList<String> errores;
	// private ArrayList<String> informacion;
	private ArrayList<Hypermedia> hypermedia;

	public ResponseBody() {
		super();
		this.errores = new ArrayList<String>();
		this.informacion = "";
		this.hypermedia = new ArrayList<Hypermedia>();
	}

	public ArrayList<String> getErrores() {
		return errores;
	}

	public void setErrores(ArrayList<String> errores) {
		this.errores = errores;
	}

	public ArrayList<Hypermedia> getHypermedia() {
		return hypermedia;
	}

	public void setHypermedia(ArrayList<Hypermedia> hypermedia) {
		this.hypermedia = hypermedia;
	}

	@Override
	public String toString() {
		return "ResponseBody [errores=" + errores + ", informacion=" + informacion + ", hypermedia=" + hypermedia + "]";
	}

	public void addError(String error) {
		this.errores.add(error);
	}

	class Hypermedia {

		private String info;
		private String url;

		public Hypermedia(String info, String url) {
			super();
			this.info = info;
			this.url = url;
		}
		

	}
}
