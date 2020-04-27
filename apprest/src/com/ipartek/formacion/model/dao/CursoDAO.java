package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class CursoDAO implements IDAO<Curso>{
	private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());
		
	private static CursoDAO INSTANCE = null;
	
	private static final String SQL_GET_ALL = "SELECT id, nombre, imagen, precio FROM curso ORDER BY id DESC LIMIT 100";
	private static final String SQL_GET_ALL_FILTER = "SELECT id, nombre, imagen, precio FROM curso WHERE nombre LIKE ? LIMIT 100";

	private static final String SQL_GET_BY_ID = "SELECT id, nombre, imagen, precio FROM curso WHERE id=?";

	private CursoDAO() {
		super();
	}
	
	public synchronized static CursoDAO getInstance() {
		if (INSTANCE == null) {
			INSTANCE = new CursoDAO();
		}
		return INSTANCE;
	}
	
	@Override
	public List<Curso> getAll() {
		LOGGER.info("Obtener todos los cursos disponibles");
		
		ArrayList<Curso> cursos = new ArrayList<Curso>();
		
		try(Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();)
			{	
				LOGGER.info(pst.toString());
					
				while (rs.next()) {
					cursos.add(mapper(rs)); 
				}
			}catch (SQLException e) {
				e.printStackTrace();
			}
		
		return cursos;
	}
	
	
		public List<Curso> getAllFilter(String filtro) throws Exception{
		LOGGER.info("Obtener todos los cursos disponibles con filtro: " + filtro);
		
		ArrayList<Curso> cursos = new ArrayList<Curso>();
		
		try(Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_FILTER);)
		
		{
			pst.setString(1, '%' + filtro + '%');
			LOGGER.info(pst.toString());
				
			try (ResultSet rs = pst.executeQuery()){

					while (rs.next()) {
						cursos.add(mapper(rs)); 
					}
				}
			}catch (SQLException e) {
				e.printStackTrace();
			}
		
		return cursos;
	}

	@Override
	public Curso getById(int id) throws Exception {
		
		Curso curso = null;
		try(Connection con = ConnectionManager.getConnection();
			PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);)
		{	
			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try(ResultSet rs = pst.executeQuery()){
				
				if (rs.next()) {
					curso = mapper(rs);
				}else {
					throw new Exception("No se ha encontrado el curso (" + id + ")" );
				}
				
			}catch(SQLException e) {
				e.printStackTrace();
				throw new SQLException("Error al acceder a los registros de cursos disponibles");	
			}
		}catch (Exception e) {
				e.printStackTrace();
				throw new Exception("No se ha podido obtener el curso (" + id + ")" );	
		}
		return curso;
	}

	@Override
	public Curso insert(Curso pojo) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
	}

	@Override
	public Curso delete(int id) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
	}
	
	@Override
	public Persona getByNombre(String nombre) throws Exception {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
	}

	private Curso mapper(ResultSet rs) throws SQLException{
		Curso c = new Curso();
		c.setId(rs.getInt("id"));
		c.setNombre(rs.getString("nombre"));
		c.setImagen(rs.getString("imagen"));
		c.setPrecio(rs.getFloat("precio"));
		return c;
	}


}
