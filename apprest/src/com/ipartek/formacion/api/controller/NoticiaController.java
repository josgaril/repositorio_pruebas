package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import com.ipartek.formacion.model.Noticia;
import com.ipartek.formacion.model.dao.NoticiaDAO;

@Path("/noticias")
@Produces("application/json")
@Consumes("application/json")
public class NoticiaController {

	private static final Logger LOGGER = Logger.getLogger(NoticiaDAO.class.getCanonicalName());

	private NoticiaDAO noticiaDAO = NoticiaDAO.getInstance();
	
	ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	Validator validator = factory.getValidator();

	@Context
	private ServletContext context;
	
	public NoticiaController() {
		super();
	}
	
	/**
	 * Obtener noticias
	 * @return Devuelve todas las noticias
	 */
	@GET
	public ArrayList<Noticia> getAll(){
		LOGGER.info("getAll");
		ArrayList<Noticia> noticias = (ArrayList<Noticia>) noticiaDAO.getAll() ;				
		
		return noticias;
		
	}
	
}
