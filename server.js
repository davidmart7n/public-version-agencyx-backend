const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');


// Importar rutas
const authRoutes = require('./routes/authRoutes');

// Configuración de Firebase
 const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// const serviceAccount = require('./serviceAccount.json');


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Inicializar la aplicación de Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());   // Para procesar los datos JSON en el body de las peticiones

// Rutas
app.use('/api/auth', authRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

// Escuchar el puerto
app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
