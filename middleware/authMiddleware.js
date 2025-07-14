const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Token en formato Bearer

  if (!token) {
    return res.status(401).send({ error: 'Acceso denegado' });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Token inválido' });
  }
};

module.exports = { verifyToken };
