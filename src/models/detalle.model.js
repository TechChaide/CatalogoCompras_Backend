const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Detalle = sequelize.define('Detalle', {
        
        codigo_detalle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.STRING
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        },
        
        codigo_familia_material: {
            type: DataTypes.INTEGER
        },
        
        codigo_tipo_caracteristica: {
            type: DataTypes.INTEGER
        },
        orden: {
            type: DataTypes.INTEGER
        }
        
    }, {
        tableName: 'detalle',
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
    Detalle.associate = (models) => {
        Detalle.belongsTo(models.Familia_material, {
        foreignKey: 'codigo_familia_material',
        as: 'familia_material',
        targetKey: 'codigo_familia_material'
    });
    Detalle.belongsTo(models.Tipo_caracteristica, {
        foreignKey: 'codigo_tipo_caracteristica',
        as: 'tipo_caracteristica',
        targetKey: 'codigo_tipo_caracteristica'
    });
    };

    return Detalle;
};