package com.ipartek.formacion.model.dao;

import java.sql.SQLException;
import java.util.List;

import com.ipartek.formacion.model.Persona;

/**
 * 
 * @return
 */
public interface IDAO<P> {

	List<P> getAll();
	
	/**
	 * Busca una persona por su nombre, tiene que ser único
	 * @param nombre String
	 * @return persona
	 * @throws Exception si no encuentra la persona
	 */
	Persona getByNombre(String nombre) throws Exception;
	
	
	/**
	 * busca un pojo por su id
	 * @param id
	 * @return
	 * @throws Exception si no encuentra pojo
	 */
	P getById(int id) throws Exception;
	
	/**
	 * Crea un nuevo Pojo
	 * @param pojo
	 * @return el Pojo con le id actualizado
	 * @throws Exception Si no cumple las validaciones
	 * @throws SQLException si existe alguna constraint, por ejemplo UNIQUE_INDEX
	 */
	P insert(P pojo) throws Exception, SQLException;
	
	/**
	 * Modifica un Pojo
	 * @param pojo
	 * @return
	 * @throws Exception si no pasa validacion o no encuentra por Id
	 * @throws SQLException si existe alguna constraint
	 */
	P update(P pojo)throws Exception, SQLException;
	
	/**
	 * Elimina pojo por su id
	 * @param id
	 * @return el pojo eliminado
	 * @throws Exception si no encuntra id
	 * @throws SQLException si existe alguna contrsain con otras tablas
	 */
	P delete(int id) throws Exception, SQLException;

	


	
}
