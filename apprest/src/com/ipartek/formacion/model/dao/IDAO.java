package com.ipartek.formacion.model.dao;

import java.sql.SQLException;
import java.util.List;

/**
 * Interfaz para las operaciones básicas de CRUD
 * @author JoseAngel
 *
 * @param <P>
 */
public interface IDAO<P> {

	List<P> getAll();
	
	/**
	 * Busca una persona por su nombre, tiene que ser único
	 * @param nombre String
	 * @return persona
	 * @throws Exception Si no encuentra la persona
	 */
	P getByNombre(String nombre) throws Exception;
	
	
	/**
	 * Busca un pojo por su id
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
	 * @throws SQLException Si existe alguna constraint, por ejemplo UNIQUE_INDEX
	 */
	P insert(P pojo) throws Exception, SQLException;
	
	/**
	 * Modifica un Pojo
	 * @param pojo
	 * @return
	 * @throws Exception si no pasa validación o no encuentra por Id
	 * @throws SQLException si existe alguna constraint
	 */
	P update(P pojo)throws Exception, SQLException;
	
	/**
	 * Elimina pojo por su id
	 * @param id
	 * @return el pojo eliminado
	 * @throws Exception si no encuentra id
	 * @throws SQLException si existe alguna constraint con otras tablas
	 */
	P delete(int id) throws Exception, SQLException;
	
}
