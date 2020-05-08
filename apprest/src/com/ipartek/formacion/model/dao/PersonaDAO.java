package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IPERSONADAO {

	private static final Logger LOGGER = Logger.getLogger(PersonaDAO.class.getCanonicalName());

	private static PersonaDAO INSTANCE = null;

	private static final String SQL_GET_ALL = 
			"	SELECT \n" + 
			"	p.id as persona_id, \n" + 
			"	p.nombre as persona_nombre, \n" + 
			"	p.avatar as persona_avatar, \n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	p.rol as persona_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen, \n"+ 
			"	c.precio as curso_precio,\n" + 
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
			"	FROM (persona p \n" + 
			"	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona)\n" + 
			"	LEFT JOIN curso c ON cc.id_curso = c.id \n" + 
			"   LEFT JOIN persona pf ON c.profesor = pf.id\n" + 
			"	ORDER BY persona_id , curso_nombre LIMIT 500";

	private static final String SQL_GET_BY_ID = 
			"	SELECT \n" + 
			"	p.id as persona_id, \n" + 
			"	p.nombre as persona_nombre, \n" + 
			"	p.avatar as persona_avatar, \n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	p.rol as persona_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen, \n" + 
			"	c.precio as curso_precio,\n" +
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
			"	FROM (persona p \n" + 
			"	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona)\n" + 
			"	LEFT JOIN curso c ON cc.id_curso = c.id\n" + 
			"   LEFT JOIN persona pf ON c.profesor = pf.id\n" + 
			"	WHERE p.id = ?" + 
			" 	LIMIT 500";

	private static final String SQL_INSERT = "INSERT INTO persona (nombre, avatar, sexo,rol) VALUES(?,?,?,?)";
	private static final String SQL_UPDATE = "UPDATE persona SET nombre=?, avatar=?, sexo=?, rol=? WHERE id=?";
	private static final String SQL_DELETE = "DELETE FROM persona WHERE id=?";

	private static final String SQL_CONTRATAR_CURSO = "INSERT INTO cursos_contratados (id_persona, id_curso) VALUES (?,?)";
	private static final String SQL_ELIMINAR_CURSO_CONTRATADO = "DELETE FROM cursos_contratados WHERE id_persona = ? AND id_curso= ?";
	
	private static final String SQL_GET_ALL_ALUMNOS = 
			"	SELECT\n" + 
			"	p.id as persona_id,\n" + 
			"	p.nombre as persona_nombre,\n" + 
			"	p.avatar as persona_avatar,\n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	p.rol as persona_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen,\n" + 
			"	c.precio as curso_precio, \n" + 
			"	c.profesor as curso_profesor,\n" + 
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
			" 	FROM persona p \n" + 
			" 	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona\n" + 
			" 	LEFT JOIN curso c ON cc.id_curso = c.id\n" + 
			" 	LEFT JOIN persona pf ON c.profesor = pf.id\n" +
			"	JOIN rol r ON p.rol = r.id\n" + 
			"	WHERE r.nombre LIKE 'alumno' \n" +
			"	ORDER BY p.id, c.nombre \n" + 
			"	LIMIT 500";

	private static final String SQL_GET_ALL_PROFESORES = 
			"	SELECT\n" + 
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen,\n" + 
			"	c.precio as curso_precio, \n" + 
			"	c.profesor as curso_profesor \n" + 
			" 	FROM persona pf \n" + 
			" 	LEFT JOIN curso c ON pf.id = c.profesor\n" + 
			"	JOIN rol r ON pf.rol = r.id\n" +
			"	WHERE r.nombre LIKE 'profesor' \n" + 
			"	ORDER BY profesor_id, curso_nombre\n" + 
			"	LIMIT 500";

	private static final String SQL_ALUMNO_BY_NOMBRE = 
			"	SELECT\n" + 
			"	p.id as persona_id,\n" + 
			"	p.nombre as persona_nombre,\n" + 
			"	p.avatar as persona_avatar,\n" + 
			"	p.sexo as persona_sexo, \n" + 
			"	p.rol as persona_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen,\n" + 
			"	c.precio as curso_precio, \n" + 
			"	c.profesor as curso_profesor,\n" + 
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
			" 	FROM persona p \n" + 
			" 	LEFT JOIN cursos_contratados cc ON p.id= cc.id_persona\n" + 
			" 	LEFT JOIN curso c ON cc.id_curso = c.id\n" + 
			" 	LEFT JOIN persona pf ON c.profesor = pf.id\n" +
			"	JOIN rol r ON p.rol = r.id\n" + 
			"	WHERE r.nombre LIKE 'alumno' AND p.nombre LIKE ? \n" + 
			"	LIMIT 500";

	private static final String SQL_PROFESOR_BY_NOMBRE = 
			"	SELECT\n" + 
			"	pf.id as profesor_id, \n" + 
			"	pf.nombre as profesor_nombre,\n" + 
			"	pf.avatar as profesor_avatar, \n" + 
			"	pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol, \n" + 
			"	c.id as curso_id, \n" + 
			"	c.nombre as curso_nombre, \n" + 
			"	c.imagen as curso_imagen,\n" + 
			"	c.precio as curso_precio, \n" + 
			"	c.profesor as curso_profesor \n" + 
			" 	FROM persona pf \n" + 
			" 	LEFT JOIN curso c ON pf.id = c.profesor\n" + 
			"	JOIN rol r ON pf.rol = r.id\n" +
			"	WHERE r.nombre LIKE 'profesor' AND pf.nombre LIKE ? \n" + 
			"	LIMIT 500";

			;

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

		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();) {

			LOGGER.info(pst.toString());

			while (rs.next()) {
				mapper(rs, hmPersonas);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return new ArrayList<Persona>(hmPersonas.values());
	}

	
	public List<Persona> getAllAlumnos() throws Exception {
		LOGGER.info("getAllAlumnos");
		ArrayList<Persona> alumnos = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmAlumno = new HashMap<Integer, Persona>();

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_ALUMNOS);
				ResultSet rs = pst.executeQuery();) {

			LOGGER.info(pst.toString());

			while (rs.next()) {
				mapper(rs, hmAlumno);
			}

		} catch (SQLException e) {
			LOGGER.warning("Error al obtener los alumnos");
			throw new SQLException("Error al obtener los alumnos");
		}
		alumnos = new ArrayList<Persona>(hmAlumno.values());
		return alumnos;

	}

	
	public List<Persona> getAllProfesores() throws Exception {
		ArrayList<Persona> profesores = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmProfesor = new HashMap<Integer, Persona>();

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_PROFESORES);
				ResultSet rs = pst.executeQuery()) {

			LOGGER.info(pst.toString());

			while (rs.next()) {
				mapperProfesor(rs, hmProfesor);
			}
		} catch (SQLException e) {
			LOGGER.warning("Error al buscar profesores");
			throw new SQLException("Error al buscar profesores");
		}
		profesores = new ArrayList<Persona>(hmProfesor.values());
		return profesores;
	}

	
	@Override
	public Persona getById(int id) throws Exception {
		LOGGER.info("getById (" + id + ")");
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();

		Persona persona = null;

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID)) {
			pst.setInt(1, id);
			LOGGER.info(pst.toString());

			try (ResultSet rs = pst.executeQuery()) {

				if (rs.next()) {
					mapper(rs, hmPersonas);
					while (rs.next()) {
						mapper(rs, hmPersonas);
					}
				} else {
					throw new Exception("No se ha encontrado la persona: " + id);
				}

				persona = hmPersonas.get(id);
			}
		}
		return persona;
	}

	
	@Override
	public Persona insert(Persona persona) throws Exception, SQLException {
		LOGGER.info("insert");

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());
			pst.setInt(4, persona.getRol());
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
			throw new SQLException("No se ha podido agregar la persona", e);
		}
		return persona;
	}

	@Override
	public Persona update(Persona persona) throws Exception, SQLException {
		LOGGER.info("update");

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());
			pst.setInt(4, persona.getRol());
			pst.setInt(5, persona.getId());
			LOGGER.info(pst.toString());

			int numeroRegistrosModificados = pst.executeUpdate();

			if (numeroRegistrosModificados != 1) {
				throw new Exception("Se ha hecho menos o mas de un update");
			}

		} catch (SQLException e) {
			throw new SQLException("No se ha podido modificar la persona." + e);
		}
		return persona;
	}

	
	@Override
	public Persona delete(int id) throws Exception, SQLException {
		LOGGER.info("delete (" + id + ")");

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
			throw new SQLException("No se ha podido eliminar la persona con id: " + id, e.getMessage());

		}
		return persona;
	}

	
	@Override
	public boolean contratarCurso(int idPersona, int idCurso) throws Exception, SQLException {
		boolean correcto = false;

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_CONTRATAR_CURSO)) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());

			int numeroRegistrosModificados = pst.executeUpdate();
			if (numeroRegistrosModificados == 1) {
				correcto = true;
			} else {
				throw new SQLException();
			}
		}
		return correcto;
	}

	
	@Override
	public boolean eliminarCursoContratado(int idPersona, int idCurso) throws Exception {
		boolean correcto = false;

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ELIMINAR_CURSO_CONTRATADO);) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());

			int numeroRegistrosModificados = pst.executeUpdate();
			if (numeroRegistrosModificados == 1) {
				correcto = true;
			} else {
				throw new Exception("No se ha encontrado el curso " + idCurso);
			}
		}
		return correcto;
	}

	
	private Persona mapper(ResultSet rs, HashMap<Integer, Persona> hm) throws SQLException {

		int key = rs.getInt("persona_id");
		Persona p = hm.get(key);

		// Comprobamos si existe el id en el HashMap, si no existe se crea
		if (p == null) {
			p = new Persona();
			p.setId(key);
			p.setNombre(rs.getString("persona_nombre"));
			p.setAvatar(rs.getString("persona_avatar"));
			p.setSexo(rs.getString("persona_sexo"));
			p.setRol(rs.getInt("persona_rol"));
		}

		// Añadimos los cursos
		int idCurso = rs.getInt("curso_id");
		// Comprobamos si existe el curso, en caso contrario se crea
		if (idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setImagen(rs.getString("curso_imagen"));
			c.setPrecio(rs.getFloat("curso_precio"));

			// Añadimos el profesor del curso
			Persona profesor = new Persona();
			profesor.setId(rs.getInt("profesor_id"));
			profesor.setNombre(rs.getString("profesor_nombre"));
			profesor.setAvatar(rs.getString("profesor_avatar"));
			profesor.setSexo(rs.getString("profesor_sexo"));
			profesor.setRol(rs.getInt("profesor_rol"));

			c.setProfesor(profesor);

			p.getCursos().add(c);
		}

		// Actualizamos HashMap
		hm.put(key, p);

		return p;
	}

	
	private Persona mapperProfesor(ResultSet rs, HashMap<Integer, Persona> hmProfesor) throws SQLException {

		int key = rs.getInt("profesor_id");
		Persona pf = hmProfesor.get(key);

		if (pf == null) {
			pf = new Persona();
			pf.setId(key);
			pf.setNombre(rs.getString("profesor_nombre"));
			pf.setAvatar(rs.getString("profesor_avatar"));
			pf.setSexo(rs.getString("profesor_sexo"));
			pf.setRol(rs.getInt("profesor_rol"));
		}

		int idCurso = rs.getInt("curso_id");
		if (idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setImagen(rs.getString("curso_imagen"));
			c.setPrecio(rs.getFloat("curso_precio"));

			Persona profesor = new Persona();
			profesor.setId(rs.getInt("profesor_id"));
			profesor.setNombre(rs.getString("profesor_nombre"));
			profesor.setAvatar(rs.getString("profesor_avatar"));
			profesor.setSexo(rs.getString("profesor_sexo"));
			profesor.setRol(rs.getInt("profesor_rol"));

			c.setProfesor(profesor);
			pf.getCursos().add(c);

		}
		hmProfesor.put(key, pf);
		return pf;
	}

	public Persona getAlumnoByNombre(String nombre) throws Exception {
		LOGGER.info("GetAlumnoByNombre");
		
		HashMap<Integer, Persona> hmAlumno = new HashMap<Integer, Persona>();
		Persona alumno = new Persona();
		
		try(Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ALUMNO_BY_NOMBRE)){
			
			pst.setString(1, nombre);
			LOGGER.info(pst.toString());
			
			try(ResultSet rs = pst.executeQuery()){
				
				if( rs.next()) {
					alumno = mapper(rs, hmAlumno);
					while (rs.next()) {
						alumno = mapper(rs, hmAlumno);
					}
				}else {
					throw new Exception("No se ha encontrado el alumno: " + nombre);
				}
			}
		} catch (SQLException e) {
			LOGGER.log(Level.SEVERE , "Exception de SQL", e);				
		}
		
		return alumno;
	}

	public Persona getProfesorByNombre(String nombre) throws Exception {
		LOGGER.info("GetProfesorByNombre");
		
		HashMap<Integer, Persona> hmProfesor= new HashMap<Integer, Persona>();
		Persona profesor = new Persona();
		
		try(Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_PROFESOR_BY_NOMBRE)){
			
			pst.setString(1, nombre);
			LOGGER.info(pst.toString());
			
			try(ResultSet rs = pst.executeQuery()){
				
				if( rs.next()) {
					profesor = mapperProfesor(rs, hmProfesor);
					while (rs.next()) {
						profesor = mapperProfesor(rs, hmProfesor);
					}
				}else {
					throw new Exception("No se ha encontrado el Profesor: " + nombre);
				}
			}
		} catch (SQLException e) {
			LOGGER.log(Level.SEVERE , "Exception de SQL", e);				
		}
		
		return profesor;
	}

	
	
}
