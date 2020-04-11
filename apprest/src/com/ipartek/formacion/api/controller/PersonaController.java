package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import com.ipartek.formacion.model.Persona;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	
	@Context
	private ServletContext context;
	
	private static ArrayList<Persona> personas = new ArrayList<Persona>();
	
	
	static {
		personas.add( new Persona(1,"Arantxa","avatar1.png", "M") );
		personas.add( new Persona(2,"Idoia","avatar2.png","M") );
		personas.add( new Persona(3,"Iker","avatar3.png","H") );
		personas.add( new Persona(4,"Alberto","avatar4.png","H") );
		personas.add( new Persona(5,"Leticia","avatar5.png","M") );
		personas.add( new Persona(6,"Roberto","avatar6.png","H") );

	}
	
	public PersonaController() {
		super();
	}




	@GET
	public ArrayList<Persona> getAll() {	
		LOGGER.info("getAll");
		return personas;
	}
	
	
}
