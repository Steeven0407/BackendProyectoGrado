import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import argon2 from "argon2";

export const crearEvento = async (req, res, next) => {
    try {
        const { nombre, descripcion, fecha, usuario_subida } = req.body;


        const { rows } = await pool.query('INSERT INTO eventos (nombre, descripcion, fecha, usuario_subida) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, descripcion, fecha, usuario_subida])

        if (rows.length === 0 || !rows) {
            return res.status(400).json({ message: 'No se pudo crear el evento' })
        }

        return res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}

export const ObtenerEventos = async (req, res, next) => {

    try {
        const { rows } = await pool.query('SELECT * FROM eventos')

        if (rows.length === 0 || !rows) {
            return res.status(400).json({ message: 'No se pudo obtener los eventos' })
        }

        return res.json(rows);
    } catch (error) {
        next(error);
    }
};