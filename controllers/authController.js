const firebaseAdmin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Función para manejar el login
const login = async (req, res) => {
  const authHeader = req.headers.authorization;

  // Validación del header y extracción del token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Token de Firebase no recibido o incorrecto en el header");
    return res.status(400).json({ error: 'Token de Firebase inválido o ausente'});
  }

  const idToken = authHeader.split(" ")[1]; // Extraemos el token real

  try {
    console.log("Chequeando la solicitud...");
    // Verificar el token de Firebase
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken; // Extraemos UID y email 

    console.log('Decoded Token: ', decodedToken);

    // Crear JWT personalizado
    const jwtToken = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET_KEY || 'secret',
      { expiresIn: 'private information' }
    );

    // Enviar el JWT en el header de la respuesta
    return res.status(200).json({ token: jwtToken, message: "Login exitoso" });

  } catch (error) {
    console.error("Error verificando el token:", error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const authHeader = req.headers.authorization;

  console.log("📥 Received DELETE request for userId:", userId);
  console.log("🔐 Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ Token ausente o mal formado");
    return res.status(400).json({ error: "Token no recibido o incorrecto en el header" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    console.log("✅ Token verificado. UID del solicitante:", decodedToken.uid);

    // Verificar que el usuario exista antes de eliminar
    try {
      const userRecord = await firebaseAdmin.auth().getUser(userId);
      console.log("👤 Usuario encontrado en Auth:", userRecord.email);
    } catch (getUserError) {
      console.error("❌ Usuario no encontrado en Firebase Auth:", getUserError.code);
      return res.status(404).json({ error: "Usuario no encontrado en Firebase Auth" });
    }

    // Eliminar usuario de Firebase Auth
    await firebaseAdmin.auth().deleteUser(userId);
    console.log(`🗑️ Usuario ${userId} eliminado correctamente de Firebase Auth`);

    // Eliminar también de Firestore
    try {
      await firebaseAdmin.firestore().collection('users').doc(userId).delete();
      console.log("🗑️ Documento del usuario eliminado de Firestore");
    } catch (firestoreError) {
      console.warn("⚠️ Error eliminando de Firestore (no crítico):", firestoreError.message);
    }

    return res.status(200).json({ message: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error("❌ Error general en deleteUser:", error.code || error.message);
    return res.status(500).json({ error: "No se pudo eliminar el usuario", details: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const listUsersResult = await firebaseAdmin.auth().listUsers(1000);
    const uids = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
    }));
    res.json(uids);
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    res.status(500).json({ error: "No se pudieron listar los usuarios" });
  }
};



module.exports = { login, deleteUser, listUsers };
