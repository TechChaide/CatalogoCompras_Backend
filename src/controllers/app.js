const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const AreaRoutes = require('./routes/Area.routes');
const area_materialRoutes = require('./routes/area_material.routes');
const caracteristicaRoutes = require('./routes/caracteristica.routes');
const detalleRoutes = require('./routes/detalle.routes');
const familia_materialRoutes = require('./routes/familia_material.routes');
const materialRoutes = require('./routes/material.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const tipo_caracteristicaRoutes = require('./routes/tipo_caracteristica.routes');
const tipo_materialRoutes = require('./routes/tipo_material.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Aceptar todos los orígenes, incluyendo undefined (para requests sin origin)
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'SQL Server API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/Area', AreaRoutes);
app.use('/api/area_material', area_materialRoutes);
app.use('/api/caracteristica', caracteristicaRoutes);
app.use('/api/detalle', detalleRoutes);
app.use('/api/familia_material', familia_materialRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/tipo_caracteristica', tipo_caracteristicaRoutes);
app.use('/api/tipo_material', tipo_materialRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

module.exports = app;