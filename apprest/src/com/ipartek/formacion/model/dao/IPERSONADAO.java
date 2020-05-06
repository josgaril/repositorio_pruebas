package com.ipartek.formacion.model.dao;

import java.sql.SQLException;

import com.ipartek.formacion.model.Persona;

public interface IPERSONADAO extends IDAO<Persona> {

	/**
	 * Se contrata un curso para el alumno. Se pasa como parámetro el id del alumno
	 * y el id del curso a contratar
	 * 
	 * @param idPersona
	 * @param idCurso
	 * @return
	 * @throws Exception    si no encuentra el el alumno o el curso
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
