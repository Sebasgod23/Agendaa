const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('./config/database'); // Conexión a la base de datos
const usuarioRoutes = require('./routes/usuarioRoutes'); // Rutas de usuarios
const tareaRoutes = require('./routes/tareaRoutes'); // Rutas de tareas
const verifyToken = require('./middlewares/authMiddleware'); // Middleware para autenticación

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas públicas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tareas', tareaRoutes);

// Ruta base (verificación del servidor)
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Ruta protegida de ejemplo
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida', user: req.user });
});

// Ruta para probar la conexión a la base de datos
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT 1 + 1 AS result', { type: QueryTypes.SELECT });
        res.json({ result: result[0].result });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        res.status(500).send('Error en la base de datos');
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

