package com.ipartek.formacion.model.dao;

import java.sql.SQLException;
import java.util.List;

/**
 * 
 * @return
 */
public interface IDAO<P> {

	List<P> getAll();
	
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
	 * @throws Exception si no encuentra id
	 * @throws SQLException si existe alguna constraint con otras tablas
	 */
	P delete(int id) throws Exception, SQLException;
	


	
}
