import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import argon2 from "argon2";

const signatureKey = process.env.SIGNATURE_KEY;

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

        let codigoString = codigo.toString();

        const hashedPassword = await argon2.hash(codigoString, {
            type: argon2.argon2id,
            memoryCost: 2 ** 4,
            timeCost: 1,
            parallelism: 1
        });

        const { rows } = await pool.query('INSERT INTO usuarios (codigo, cedula, nombre, correo, contrasena, primerinicio) VALUES ($1, $2, $3, $4, $5, true) RETURNING *', [codigo, cedula, nombre, correo, hashedPassword])

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

    return res.json({ message: 'Usuario actualizado correctamente', usuario: rows[0].codigo });

};



export const IniciarSesion = async (req, res, next) => {
    try {
        const { codigo, cedula, contrasena } = req.body;

        let contrasenaBD = await pool.query('SELECT contrasena FROM usuarios where codigo = $1 AND cedula = $2', [codigo, cedula]);
        contrasenaBD = contrasenaBD.rows[0]?.contrasena;

        const valido = await argon2.verify(contrasenaBD, contrasena);

        if (!valido) {
            return res.status(404).json({ message: 'Credenciales inválidas' })
        }

        const { rows } = await pool.query('SELECT codigo, cedula, nombre, correo, primerinicio FROM usuarios where codigo = $1 AND cedula = $2', [codigo, cedula]);

        if (rows.length === 0 || !rows) {
            return res.status(404).json({ message: 'Credenciales inválidas', contra: hashedPassword })
        }

        const dataUser = rows[0];

        const token = jwt.sign(
            {
                id: dataUser.id,
                codigo: dataUser.codigo,
                correo: dataUser.correo
            },
            signatureKey,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            token,
            dataUser
        });
    } catch (error) {
        next(error);
    }
};

