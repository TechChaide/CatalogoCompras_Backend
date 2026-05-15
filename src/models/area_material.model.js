const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Area_material = sequelize.define('Area_material', {
        
        codigo_area_material: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        estado: {
            type: DataTypes.STRING
        },
        
        fecha_modificacion: {
            type: DataTypes.DATE
        },
        
        usuario_modificacion: {
            type: DataTypes.STRING
        },
        
        codigo_area: {
            type: DataTypes.INTEGER
        },
        
        codigo_material: {
            type: DataTypes.INTEGER
        }
        
    }, {
        tableName: 'area_material',
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
    Area_material.associate = (models) => {
        Area_material.belongsTo(models.Area, {
        foreignKey: 'codigo_area',
        as: 'Area',
        targetKey: 'codigo_area'
    });
    Area_material.belongsTo(models.Material, {
        foreignKey: 'codigo_material',
        as: 'material',
        targetKey: 'codigo_material'
    });
    };

    return Area_material;
};