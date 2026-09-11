const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Proveedor = sequelize.define('Proveedor', {
        
        codigo_proveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        nombre_proveedor: {
            type: DataTypes.STRING
        },
        
        email_proveedor: {
            type: DataTypes.STRING
        },
        
        ruc_proveedor: {
            type: DataTypes.STRING
        },
        
        direccion_proveedor: {
            type: DataTypes.STRING
        },
        
        telefono_proveedor: {
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
        },
        
        codigosap_proveedor: {
            type: DataTypes.STRING
        }
        
    }, {
        tableName: 'proveedor',
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
    Proveedor.associate = (models) => {
        
    };

    return Proveedor;
};