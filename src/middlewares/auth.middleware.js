const axios = require('axios');

// Usar referencia directa al contenedor dentro de Docker
// Para desarrollo local, agregar AUTH_API_URL al .env
// Nota: Traefik quita el prefijo /seguridadesGuard, por eso la ruta interna es solo /api/auths/checkToken
const AUTH_API_URL = process.env.AUTH_API_URL || 'http://seguridades_guard_service:5400/api/auths/checkToken';

const verifyToken = async (req, res, next) => {
    let token = null;

    const authHeader = req.headers['authorization'];
    const cookieToken = req.cookies?.token;

    console.log('Starting token verification process...');
    console.log('Authorization header:', authHeader ? '[present]' : '[missing]');
    console.log('Cookie token:', cookieToken ? '[present]' : '[missing]');

    // 1. Intentar obtener el token del header Authorization
    if (authHeader) {
        token = authHeader.replace('Bearer ', '').trim();
        console.log('✅ Token obtained from Authorization header');
    }

    // 2. Si no hay token en header, intentar obtenerlo de la cookie
    if (!token && cookieToken) {
        token = cookieToken;
        console.log('✅ Token obtained from cookie');
    }

    if (!token) {
        console.log('❌ No token found in Authorization header or cookie');
        return res.status(403).json({ 
            message: 'Authentication token required',
            code: 'MISSING_TOKEN'
        });
    }

    try {
        console.log('Validating token against:', AUTH_API_URL);

        // Validar token contra API externa
        const response = await axios.get(AUTH_API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: 15000 // 15 segundos de timeout
        });

        // La API retorna true si el token es válido
        if (response.data === true) {
            // Token válido, continuar
            // Opcionalmente, puedes guardar el token en req para usarlo después
            req.token = token;
            next();
        } else {
            // Token inválido o expirado
            return res.status(401).json({ 
                message: 'Invalid or expired token',
                code: 'INVALID_TOKEN'
            });
        }
    } catch (error) {
        // Error en la validación (error de conexión, timeout, etc.)
        console.error('Token validation error:', error.message);
        
        return res.status(401).json({ 
            message: 'Token validation failed',
            code: 'VALIDATION_ERROR',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { verifyToken };