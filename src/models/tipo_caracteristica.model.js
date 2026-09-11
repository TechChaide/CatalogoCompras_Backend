const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tipo_caracteristica = sequelize.define('Tipo_caracteristica', {
        
        codigo_tipo_caracteristica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        nombre_tipo_caracteristica: {
            type: DataTypes.STRING
        },
        
        unidad_medida: {
            type: DataTypes.STRING
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.STRING
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        }
        
    }, {
        tableName: 'tipo_caracteristica',
        schema: 'dbo',
        timestamps: false,
        // SQL Server specific options
        dialectOptions: {
            options: {
                requestTimeout: 30000,
                encrypt: false,
                trustServerCertificate: true
            }
        }
    });

    // Setup relationships (only belongsTo)
    Tipo_caracteristica.associate = (models) => {
        
    };

    return Tipo_caracteristica;
};