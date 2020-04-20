package com.ipartek.formacion.model.dao;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.api.controller.PersonaController;
import com.ipartek.formacion.model.Curso;

@Path("/cursos")
@Produces("application/json")
@Consumes("application/json")
public class CursoController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());

	private static CursoDAO cursoDAO = CursoDAO.getInstance();

	ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	public CursoController() {
		super();
	}
	
	 @GET
	 public ArrayList<Curso> getAll() {
		LOGGER.info("Obtener todos los cursos disponibles");
		 
		ArrayList<Curso> cursos = (ArrayList<Curso>) cursoDAO.getAll();
		 return cursos;
	 }
	
	/*
	 * @GET public ArrayList<Curso> getAllFiltro(@QueryParam ("filtro") String
	 * filtro) { LOGGER.info("Obtener todos los cursos disponibles" + filtro);
	 * 
	 * //if filtro == null o esta vacio //mostrar ultimos 100 cursos --> SELECT *
	 * FROM curso ORDER BY id DESC LIMIT 100; //else //filtrar por nombre SELECT *
	 * FROM curso WHERE nombre LIKE '%filtro% LIMIT 100; eso dentro del dao
	 * ArrayList<Curso> cursos = (ArrayList<Curso>) cursoDAO.getAll(); return
	 * cursos; }
	 */
	 
	 @GET
	 @Path("/{id: \\d+}")
	 public Response getById(@PathParam("id") int id) {
		LOGGER.info("Obtener el curso por id");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		Curso curso = null;

		
		return response;
	 }
}
