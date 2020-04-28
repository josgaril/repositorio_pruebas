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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.dao.CursoDAO;

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

/*	 @GET
	 public ArrayList<Curso> getAll() {
		LOGGER.info("Obtener todos los cursos disponibles");
		 
		ArrayList<Curso> cursos = (ArrayList<Curso>) cursoDAO.getAll();
		 return cursos;
	 }
*/

	@GET
	public Response getAll(@QueryParam("filtro") String filtro) throws Exception {
		LOGGER.info("Obtener todos los cursos disponibles");
		
		ArrayList<Curso> cursos = new ArrayList<Curso>();
		
		if (filtro == null || "".equals(filtro.trim())) {
			cursos = (ArrayList<Curso>) cursoDAO.getAll();
		} else {
			cursos = (ArrayList<Curso>) cursoDAO.getAllFilter(filtro);
		}
		Response response = Response.status(Status.OK).entity(cursos).build();

		return response;
	}

	@GET
	 @Path("/{id: \\d+}")
	 public Response getById(@PathParam("id") int id) throws Exception {
		LOGGER.info("Obtener el curso por id");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		try {
			Curso curso= cursoDAO.getById(id);

			if (curso== null) {
				response = Response.status(Status.NOT_FOUND).build();
				LOGGER.warning("No se ha encontrado el curso con id " + id);
				throw new Exception("No se ha encontrado el curso buscado");

			} else {
				response = Response.status(Status.OK).entity(curso).build();
				LOGGER.info("Encontrado curso: " + curso);
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.warning("No se ha podido obtener el curso con id " + id);
		}
		return response;
}}
