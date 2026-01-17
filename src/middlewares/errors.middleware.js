export const errorHandler = (err, req, res, next) => {

    switch (err.code) {

        case '23505':
            return res.status(409).json({
                message: 'El registro ya existe (valor duplicado)'
            });

        case '23503':
            return res.status(400).json({
                message: 'Referencia inválida (clave foránea no existe)'
            });

        case '23502':
            return res.status(400).json({
                message: `El campo '${err.column}' no puede ser nulo`
            });

        case '23514':
            return res.status(400).json({
                message: 'El valor no cumple con las reglas definidas'
            });

        case '22P02':
            return res.status(400).json({
                message: 'Formato de dato inválido'
            });

        default:
            return res.status(500).json({
                message: 'Error interno del servidor'
            });
    }
}