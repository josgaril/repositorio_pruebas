package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona> {

	private static final Logger LOGGER = Logger.getLogger(PersonaDAO.class.getCanonicalName());

	private static PersonaDAO INSTANCE = null;
	
	private static final String SQL_GET_ALL= 
			"	SELECT \n" + 
			"	p.id as persona_id, \n" + 
			"	p.nombre as persona_nombre, \n" + 
			"	p.avatar as persona_avatar, \n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen, \n" + 
			"	c.precio as curso_precio\n" + 
			"	FROM (persona p \n" + 
			"	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona)\n" + 
			"	LEFT JOIN curso c ON cc.id_curso = c.id\n" + 
			"	LIMIT 500";
	
	private static final String SQL_GET_BY_ID = 
			"	SELECT \n" + 
			"	p.id as persona_id, \n" + 
			"	p.nombre as persona_nombre, \n" + 
			"	p.avatar as persona_avatar, \n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen, \n" + 
			"	c.precio as curso_precio\n" + 
			"	FROM (persona p \n" + 
			"	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona)\n" + 
			"	LEFT JOIN curso c ON cc.id_curso = c.id\n" + 
			"	WHERE p.id = ? LIMIT 500";
	
	private static final String SQL_GET_ALL1 = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id LIMIT 500";
	private static final String SQL_GET_BY_ID1 = "SELECT id, nombre, avatar, sexo FROM persona WHERE id=?";
	private static final String SQL_INSERT = "INSERT INTO persona (nombre, avatar, sexo) VALUES(?,?,?)";
	private static final String SQL_UPDATE = "UPDATE persona SET nombre=?, avatar=?, sexo=? WHERE id=?";
	private static final String SQL_DELETE = "DELETE FROM persona WHERE id=?";

	private PersonaDAO() {
		super();
	}

	public synchronized static PersonaDAO getInstance() {
		if (INSTANCE == null) {
			INSTANCE = new PersonaDAO();
		}
		return INSTANCE;
	}

	@Override
	public List<Persona> getAll() {
		LOGGER.info("getAll");

		//ArrayList<Persona> personas = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {
			
			LOGGER.info(pst.toString());

			while (rs.next()) {
				mapper(rs, hmPersonas);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return new ArrayList<Persona> (hmPersonas.values());
	}

	@Override
	public Persona getById(int id) throws Exception {
	
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();

		Persona persona = null;

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID)) {
			pst.setInt(1, id);
			LOGGER.info(pst.toString());

			try (ResultSet rs = pst.executeQuery()) {

				if (rs.next()) {
					mapper(rs,hmPersonas);
				} else {
					throw new Exception("No se ha encontrado la persona: " + id);
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new Exception("Error al acceder a los registros de personas");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("No se ha podido obtener la persona: " + id);
		}
		return persona;
	}

	@Override
	public Persona insert(Persona persona) throws Exception, SQLException {

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());
			LOGGER.info(pst.toString());

			int numeroRegistrosModificados = pst.executeUpdate();
			if (numeroRegistrosModificados == 1) {
				ResultSet rs = pst.getGeneratedKeys();
				if (rs.next()) {
					persona.setId(rs.getInt(1));
				}
			} else {
				throw new Exception("Se ha hecho mas o menos de una insert");
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("No se ha podido agregar la persona", e);
		}
		return persona;

	}

	@Override
	public Persona update(Persona persona) throws Exception, SQLException {

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());
			pst.setInt(4, persona.getId());
			LOGGER.info(pst.toString());

			int numeroRegistrosModificados = pst.executeUpdate();

			if (numeroRegistrosModificados != 1) {
				throw new Exception("Se ha hecho menos o mas de un update");
			}
			
		} catch (SQLException e) {
			throw new Exception("No se ha podido modificar la persona." + e);
		}
		return persona;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {

		Persona persona = null;

		persona = getById(id);

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_DELETE)) {
			pst.setInt(1, id);
			LOGGER.info(pst.toString());

			int registrosModificados = pst.executeUpdate();
			if (registrosModificados != 1) {
				throw new Exception("Se ha hecho más o menos de una delete");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error al borrar la persona con id: " + id, e);

		}
		return persona;
	}

	private void mapper(ResultSet rs, HashMap<Integer, Persona> hm) throws SQLException {
		
		int key = rs.getInt("persona_id");
	
		Persona p = hm.get(key);
		
		//Comprobamos si existe el id en el HashMap, si no existe se crea
		
		if (p==null) {
			p = new Persona();
			p.setId(key);
			p.setNombre(rs.getString("persona_nombre"));
			p.setAvatar(rs.getString("persona_avatar"));
			p.setSexo(rs.getString("persona_sexo"));
		}
		
		//Añadimos los cursos

		int idCurso = rs.getInt("curso_id");
		//COmprobamos si existe el curso, si no lo crea
		if(idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setImagen(rs.getString("curso_imagen"));
			c.setPrecio(rs.getFloat("curso_precio"));
			p.getCursos().add(c);
		}
		
		//actualizamos HashMap
		hm.put(key, p);

	}

}
