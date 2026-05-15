const { Proveedor } = require('../models');
const { handleError } = require('../helpers/error.helper');

module.exports = {
    // Create or update record
    createOrUpdate: async (req, res) => {
        try {
            const {
                codigo_proveedor,
                nombre_proveedor,
                email_proveedor,
                ruc_proveedor,
                direccion_proveedor,
                telefono_proveedor,
                estado,
                fecha_modificacion,
                usuario_modificacion
            } = req.body;

            // Validate required fields

            if (codigo_proveedor == 0 || codigo_proveedor === undefined) {
                // Create new record
                const newRecord = await Proveedor.create({
                    nombre_proveedor: nombre_proveedor,
                    email_proveedor: email_proveedor,
                    ruc_proveedor: ruc_proveedor,
                    direccion_proveedor: direccion_proveedor,
                    telefono_proveedor: telefono_proveedor,
                    estado: estado,
                    fecha_modificacion: fecha_modificacion,
                    usuario_modificacion: usuario_modificacion
                });

                const response = await Proveedor.findByPk(newRecord.codigo_proveedor);

                return res.status(201).json({
                    data: response,
                    length: 1
                });
            } else {
                // Update existing record
                const record = await Proveedor.findByPk(codigo_proveedor);
                
                if (!record) {
                    return res.status(404).json({ error: 'Record not found' });
                }

                // Update fields
                if (nombre_proveedor !== undefined) record.nombre_proveedor = nombre_proveedor;
                if (email_proveedor !== undefined) record.email_proveedor = email_proveedor;
                if (ruc_proveedor !== undefined) record.ruc_proveedor = ruc_proveedor;
                if (direccion_proveedor !== undefined) record.direccion_proveedor = direccion_proveedor;
                if (telefono_proveedor !== undefined) record.telefono_proveedor = telefono_proveedor;
                if (estado !== undefined) record.estado = estado;
                if (fecha_modificacion !== undefined) record.fecha_modificacion = fecha_modificacion;
                if (usuario_modificacion !== undefined) record.usuario_modificacion = usuario_modificacion;
                
                await record.save();

                const updatedRecord = await Proveedor.findByPk(codigo_proveedor);

                return res.status(200).json({
                    data: updatedRecord,
                    length: 1
                });
            }
        } catch (error) {
            handleError(res, error, 'Error creating or updating record');
        }
    },

    // Get all records
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 50 } = req.query;
            const offset = (page - 1) * limit;

            const { count, rows } = await Proveedor.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            return res.status(200).json({
                data: rows,
                length: rows.length,
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit)
            });
        } catch (error) {
            handleError(res, error, 'Error fetching records');
        }
    },

    // Get record by ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const record = await Proveedor.findByPk(id);

            if (!record) {
                return res.status(404).json({ 
                    error: 'Record not found',
                    id: id
                });
            }

            return res.status(200).json({
                data: record,
                length: 1
            });
        } catch (error) {
            handleError(res, error, 'Error fetching record by ID');
        }
    },

    // Deactivate record (soft delete)
    deactivate: async (req, res) => {
        try {
            const { id } = req.params;
            
            const record = await Proveedor.findByPk(id);
            
            if (!record) {
                return res.status(404).json({ error: 'Record not found' });
            }

            // Soft delete by setting status
            record.estado = 'INACTIVE';
            await record.save();

            return res.status(200).json({
                message: 'Record deactivated successfully',
                id: id
            });
        } catch (error) {
            handleError(res, error, 'Error deactivating record');
        }
    }
};