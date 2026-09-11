const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Material = sequelize.define('Material', {
        
        codigo_material: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        codigo_tipo_material: {
            type: DataTypes.INTEGER
        },
        
        codigo_proveedor: {
            type: DataTypes.INTEGER
        },
        
        material: {
            type: DataTypes.STRING
        },
        
        descripcion_material: {
            type: DataTypes.STRING
        },
        
        unidad_medida: {
            type: DataTypes.STRING
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_creacion: {
            type: DataTypes.STRING
        },
        
        usuario_creacion: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.STRING
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        },
        
        estado_material: {
            type: DataTypes.STRING
        }
        
    }, {
        tableName: 'material',
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
    Material.associate = (models) => {
        Material.belongsTo(models.Proveedor, {
        foreignKey: 'codigo_proveedor',
        as: 'proveedor',
        targetKey: 'codigo_proveedor'
    });
    Material.belongsTo(models.Tipo_material, {
        foreignKey: 'codigo_tipo_material',
        as: 'tipo_material',
        targetKey: 'codigo_tipo_material'
    });
    };

    return Material;
};