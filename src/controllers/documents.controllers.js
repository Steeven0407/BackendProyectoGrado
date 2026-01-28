import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import argon2 from "argon2";

export const crearDocumento = async (req, res, next) => {
    try {
        const { nombre, categoria, descripcion, extension, tamanio } = req.body;


        const { rows } = await pool.query('INSERT INTO documentos (nombre, categoria, descripcion, extension, tamanio, enlace) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nombre, categoria, descripcion, extension, tamanio, "link.real.com"])

        if (rows.length === 0 || !rows) {
            return res.status(400).json({ message: 'No se pudo crear el usuario' })
        }

        return res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}

export const ObtenerDocumentosLobby = async (req, res, next) => {

    try {
        const { rows } = await pool.query('SELECT * FROM documentos')

        if (rows.length === 0 || !rows) {
            return res.status(400).json({ message: 'No se pudo obtener los documentos' })
        }

        return res.json(rows);
    } catch (error) {
        next(error);
    }
};