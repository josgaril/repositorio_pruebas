package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.dao.CursoDAO;
import com.ipartek.formacion.model.dao.PersonaDAO;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());

	private static PersonaDAO personaDAO = PersonaDAO.getInstance();

	ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	public PersonaController() {
		super();
	}

	/*
	 * @GET public ArrayList<Persona> getAll() { LOGGER.info("getAll");
	 * ArrayList<Persona> registros = (ArrayList<Persona>) personaDAO.getAll();
	 * return registros; }
	 */

	@GET
	public Response getAll( @QueryParam("nombre") String nombre){
		LOGGER.info("getAllNombre");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		if ( nombre == null || "".equals(nombre.trim())) {
			LOGGER.info("Obtenemos todas las personas");
			ArrayList<Persona> registros = (ArrayList<Persona>) personaDAO.getAll();
			response = Response.status(Status.OK).entity(registros).build();
		}else {
			LOGGER.info("Obenemos la persona con nombre: " + nombre);
			try {
				Persona registro = new Persona();
				registro = personaDAO.getByNombre(nombre);
				response = Response.status(Status.OK).entity(registro).build();
			} catch (Exception e) {
				LOGGER.info("No se ha encontrado la persona: " + nombre);
				response = Response.status(Status.NOT_FOUND).entity(null).build();
			}
			
		}
		
		return response;

	}
	
	@GET
	@Path("/{id: \\d+}")
	public Response getById(@PathParam("id") int id) {
		LOGGER.info("getById(" + id + ")");

		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		ArrayList<String> error = new ArrayList<String>();

		try {
			Persona persona = personaDAO.getById(id);
				response = Response.status(Status.OK).entity(persona).build();
				LOGGER.info("Recibida la persona:" + persona);
		} catch (Exception e) {
			error.add(e.getMessage());
			LOGGER.warning("No se ha encontrado la persona con id " + id);
			response = Response.status(Status.NOT_FOUND).entity(error).build();
			
		}
		return response;
	}

	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");
		ArrayList<String> errores = new ArrayList<String>();
		
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {
			try {

				personaDAO.insert(persona);
				response = Response.status(Status.CREATED).entity(persona).build();
				LOGGER.info("Se ha creado la persona: " + persona);

			} catch (Exception e) {
				errores.add("Ha introducido el nombre de una persona existente");				
				LOGGER.warning("Ha introducido el nombre de una persona existente");
				response = Response.status(Status.CONFLICT).entity(errores).build();
			}

		} else {

			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}
			LOGGER.warning("No se cumplen las validaciones para crear la persona: " + errores);
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}
		return response;

	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") Long id, Persona persona) {
		LOGGER.info("update(" + id + ", " + persona + ")");

		Response response = Response.status(Status.NOT_FOUND).entity(persona).build();
		
		ArrayList<String> errores = new ArrayList<String>();

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {

			try {
				personaDAO.update(persona);
				response = Response.status(Status.OK).entity(persona).build();
				LOGGER.info("Se ha modificado la persona:" + persona);

			} catch (Exception e) {
				errores.add("Ha introducido el nombre de una persona existente");
				LOGGER.warning("Ha introducido el nombre de una persona existente");
				response = Response.status(Status.CONFLICT).entity(errores).build();
			}
		} else {
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}
			LOGGER.warning("No se cumplen las validaciones para modificar la persona: " + errores);
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}
		return response;

	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response delete(@PathParam("id") int id) {
		LOGGER.info("delete(" + id + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		ArrayList<String> errores = new ArrayList<String>();

		Persona persona = null;

		try {
			
			persona = personaDAO.delete(id);
			response = Response.status(Status.OK).entity(persona).build();
			LOGGER.info("Persona borrada: " + id);

		} catch (SQLException e) {
			LOGGER.warning(e.getMessage());
			errores.add("La persona seleccionada tiene cursos activos. No se puede eliminar");				
			LOGGER.warning("La persona seleccionada tiene cursos activos. No se puede eliminar");
			response = Response.status(Status.CONFLICT).entity(errores).build();
		} catch (Exception e) {
			errores.add("No se ha encontrado el id de la persona a eliminar");				
			LOGGER.warning("No se ha encontrado el id de la persona a eliminar");
			response = Response.status(Status.NOT_FOUND).entity(errores).build();
		}
		return response;
	}
	
	
	  @POST
	  @Path("/{idPersona}/curso/{idCurso}")
	  public Response contratarCurso(@PathParam("idPersona") int idPersona,@PathParam("idCurso") int idCurso) {
		  LOGGER.info("Contratar curso " + idCurso + " para la persona " + idPersona);
			Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
			ArrayList<String> error = new ArrayList<String>();

		 try {
			 personaDAO.contratarCurso(idPersona, idCurso);
			 Curso curso = CursoDAO.getInstance().getById(idCurso);
			 
			 response = Response.status(Status.CREATED).entity(curso).build();
			 LOGGER.info("Curso contratado correctamente");
			 
		} catch (Exception e) {
			
			
		      if (e.getMessage().contains("Duplicate entry")){
		         error.add("Ya tiene contratado este curso");
		      } 
		      if (e.getMessage().contains("cursos_contratados-curso_FK")){
		    	  error.add( "No existe el curso que quiere contratar");
		      }
		      if (e.getMessage().contains("cursos_contratados-persona_FK")){
		    	  error.add( "No existe la persona para contratar ese curso");
		      }

			LOGGER.warning("Error: " + error);
			response = Response.status(Status.CONFLICT).entity(error).build();
		}
		return response;
		  
	  }
	  
	  @DELETE
	  @Path("/{idPersona}/curso/{idCurso}")
	  public Response eliminarCursoContratado(@PathParam("idPersona") int idPersona,@PathParam("idCurso") int idCurso) {
		  LOGGER.info("Eliminar curso contratado " + idCurso + " de la persona " + idPersona);
			Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
			ArrayList<String> mensaje = new ArrayList<String>();
			ArrayList<String> error = new ArrayList<String>();


		 try {
			 personaDAO.eliminarCursoContratado(idPersona, idCurso);
			  
			  mensaje.add("Curso eliminado con éxito");
			 LOGGER.info("Curso eliminado con éxito");
			 response = Response.status(Status.OK).entity(mensaje).build();
			 
		} catch (Exception e) {
			error.add(e.getMessage());
			LOGGER.warning("Error: " + error);
			response = Response.status(Status.NOT_FOUND).entity(error).build();
		}
		return response;
		  
	  }

	
}
