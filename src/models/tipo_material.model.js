const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tipo_material = sequelize.define('Tipo_material', {
        
        codigo_tipo_material: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        codigo_familia_material: {
            type: DataTypes.INTEGER
        },
        
        nombre_tipo_material: {
            type: DataTypes.STRING
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.DATE
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        }
        
    }, {
        tableName: 'tipo_material',
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
    Tipo_material.associate = (models) => {
        Tipo_material.belongsTo(models.Familia_material, {
        foreignKey: 'codigo_familia_material',
        as: 'familia_material',
        targetKey: 'codigo_familia_material'
    });
    };

    return Tipo_material;
};