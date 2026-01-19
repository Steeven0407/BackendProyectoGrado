import jwt from 'jsonwebtoken';

const signatureKey = process.env.SIGNATURE_KEY;

export const ValidarToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Sesión no encontrada' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, signatureKey);

        req.usuario = decoded;


        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Sesión expirada' });
        }

        return res.status(401).json({ message: 'Sesión inválida' });
    }

};