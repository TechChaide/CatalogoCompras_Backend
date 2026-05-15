const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Caracteristica = sequelize.define('Caracteristica', {
        
        codigo_caracteristica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        valor: {
            type: DataTypes.STRING
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_creacion: {
            type: DataTypes.DATE
        },
        
        usuario_creacion: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.DATE
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        },
        
        codigo_material: {
            type: DataTypes.INTEGER
        },
        
        codigo_detalle: {
            type: DataTypes.INTEGER
        }
        
    }, {
        tableName: 'caracteristica',
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
    Caracteristica.associate = (models) => {
        Caracteristica.belongsTo(models.Detalle, {
        foreignKey: 'codigo_detalle',
        as: 'detalle',
        targetKey: 'codigo_detalle'
    });
    Caracteristica.belongsTo(models.Material, {
        foreignKey: 'codigo_material',
        as: 'material',
        targetKey: 'codigo_material'
    });
    };

    return Caracteristica;
};