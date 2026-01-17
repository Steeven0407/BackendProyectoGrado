import { pool } from "../db.js";



export const BuscarTodosLosUsuarios = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM usuarios')
    res.json(rows)
};

export const BuscarUsusarioPorCodigo = async (req, res) => {
    const { id } = req.params;

    // const { rows } = await pool.query(`SELECT * FROM usuarios where codigo = ${id}`)
    const { rows } = await pool.query('SELECT * FROM usuarios where codigo = $1', [id])

    if (rows.length === 0 || !rows) {
        return res.status(404).json({ message: 'Usuario no encontrado en el sistema' })
    }
    res.json(rows)
};

export const CrearUsuario = async (req, res, next) => {
    try {
        const { codigo, cedula, nombre, correo } = req.body;

        const { rows } = await pool.query('INSERT INTO usuarios (codigo, cedula, nombre, correo, contrasena, primerinicio) VALUES ($1, $2, $3, $4, 123456789, true) RETURNING *', [codigo, cedula, nombre, correo])

        if (rows.length === 0 || !rows) {
            return res.status(400).json({ message: 'No se pudo crear el usuario' })
        }

        return res.json(rows);
    } catch (error) {
        next(error);
    }
};


export const EliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM usuarios where codigo = ${id} RETURNING *`)

    if (rowCount === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado en el sistema para ser eliminado' })
    }

    return res.sendStatus(204);
};

export const ActualizarUsuario = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    const { rows, rowCount } = await pool.query(`UPDATE usuarios SET cedula = $1, nombre = $2, correo = $3 WHERE codigo = $4 RETURNING *`, [data.cedula, data.nombre, data.correo, id])

    if (rowCount === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado en el sistema para ser actualizado' })
    }

    return res.json(rows[0]);

};



export const IniciarSesion = async (req, res) => {
    const { codigo, cedula, contrasena } = req.body;

    const { rows } = await pool.query('SELECT * FROM usuarios where codigo = $1 AND cedula = $2 AND contrasena = $3', [codigo, cedula, contrasena]);

    if (rows.length === 0 || !rows) {
        return res.status(404).json({ message: 'Credenciales inválidas' })
    }

    res.json(rows[0]);
};

