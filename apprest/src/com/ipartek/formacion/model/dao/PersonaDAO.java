package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona> {

	private static final String SQL_DELETE = "DELETE FROM persona WHERE id=?";
	private static final String SQL_GET_BY_ID = "SELECT id, nombre, avatar, sexo FROM persona WHERE id=?";
	private static final String SQL_INSERT = "INSERT INTO persona (nombre, avatar, sexo) VALUES(?,?,?)";
	private static final String SQL_UPDATE = "UPDATE persona SET nombre=?, avatar=?, sexo=? WHERE id=?";
	private static final String SQL_GET_ALL = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id LIMIT 500";

	@Override
	public List<Persona> getAll() {

		ArrayList<Persona> registros = new ArrayList<Persona>();

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			while (rs.next()) {

				Persona p = new Persona();
				p.setId(rs.getInt("id"));
				p.setNombre(rs.getString("nombre"));
				p.setAvatar(rs.getString("avatar"));
				p.setSexo(rs.getString("sexo"));

				registros.add(p);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Persona getById(int id) throws Exception {
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID)) {
			pst.setInt(1, id);
			try (ResultSet rs = pst.executeQuery()) {
				Persona persona = null;
				if (rs.next()) {
					persona = new Persona(rs.getInt("id"), rs.getString("nombre"), rs.getString("avatar"),
							rs.getString("sexo"));
				} else {
					persona = null;
				}
				return persona;
			} catch (SQLException e) {
				e.printStackTrace();
				throw new Exception("Error al acceder a los registros de personas");

			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error al conectar para obtener la persona: " + id);
		}
		
	}

	@Override
	public Persona insert(Persona persona) throws Exception, SQLException {

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());

			int numeroRegistrosModificados = pst.executeUpdate();

			if (numeroRegistrosModificados != 1) {
				throw new Exception("Se ha hecho mas o menos de una insert");
			}

			Integer idGenerado = null;
			ResultSet generatedKeys = pst.getGeneratedKeys();
			if (generatedKeys.next()) {
				idGenerado = generatedKeys.getInt(1);
			}
			persona.setId(idGenerado);
			return persona;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("No se ha podido agregar la persona", e);
		}
	}

	@Override
	public Persona update(Persona persona) throws Exception, SQLException {

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE)) {
			pst.setString(1, persona.getNombre());
			pst.setString(2, persona.getAvatar());
			pst.setString(3, persona.getSexo());
			pst.setInt(4, persona.getId());

			int numeroRegistrosModificados = pst.executeUpdate();

			if (numeroRegistrosModificados != 1) {
				throw new Exception("Se ha hecho menos o mas de un update");
			}
			return persona;
		} catch (SQLException e) {
			throw new Exception("Error al conectar para modificar la persona." + e);
		}
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		
		persona = getById(id);
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_DELETE)) {
			pst.setInt(1, id);

			int registrosModificados = pst.executeUpdate();
			if (registrosModificados != 1) {
				throw new Exception("Se ha hecho más o menos de una delete");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new Exception("Error al borrar la persona con id: " + id, e);

		}
	}

}
