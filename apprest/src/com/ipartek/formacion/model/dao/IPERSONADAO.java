package com.ipartek.formacion.model.dao;

import java.sql.SQLException;
import java.util.List;

import com.ipartek.formacion.model.Persona;

public interface IPERSONADAO extends IDAO<Persona>{

	/**
	 * Se obtienen las personas, filtrando por su Rol para saber si son alumnos o profesores
	 * @param rol
	 * @return
	 * @throws Exception En caso de que Rol no exista o Rol == null
	 */
	List<Persona> getAllByRol( String rol ) throws Exception;

	/**
	 * Se contrata un curso para el alumno. Se pasa como parámetro el id del alumno y el id del curso a contratar
	 * @param idPersona
	 * @param idCurso
	 * @return
	 * @throws Exception si no encuentra el el alumno o el curso
	 * @throws SQLException Si ya tiene contratado ese curso
	 */
	boolean contratarCurso(int idPersona, int idCurso) throws Exception, SQLException;
 
	/**
	 * 
	 * @param idPersona
	 * @param idCurso
	 * @return
	 * @throws Exception Si no encuentra el curso contratado a eliminar 
	 */
	boolean eliminarCursoContratado(int idPersona, int idCurso) throws Exception;
	
	
}
