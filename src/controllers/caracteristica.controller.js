const { Caracteristica, Material, Detalle } = require('../models');
const { handleError } = require('../helpers/error.helper');

module.exports = {
    // Create or update record
    createOrUpdate: async (req, res) => {
        try {
            const {
                codigo_caracteristica,
                valor,
                estado,
                fecha_creacion,
                usuario_creacion,
                fecha_modificacion,
                usuario_modificacion,
                codigo_material,
                codigo_detalle
            } = req.body;

            // Validate required fields

            if (codigo_caracteristica == 0 || codigo_caracteristica === undefined) {
                // Create new record
                const newRecord = await Caracteristica.create({
                    valor: valor,
                    estado: estado,
                    fecha_creacion: fecha_creacion,
                    usuario_creacion: usuario_creacion,
                    fecha_modificacion: fecha_modificacion,
                    usuario_modificacion: usuario_modificacion,
                    codigo_material: codigo_material,
                    codigo_detalle: codigo_detalle
                });

                const response = await Caracteristica.findByPk(newRecord.codigo_caracteristica, {
                    include: [
                        { model: Detalle, as: 'detalle' },
                        { model: Material, as: 'material' }
                    ]
                });

                return res.status(201).json({
                    data: response,
                    length: 1
                });
            } else {
                // Update existing record
                const record = await Caracteristica.findByPk(codigo_caracteristica, {
                    include: [
                        { model: Detalle, as: 'detalle' },
                        { model: Material, as: 'material' }
                    ]
                });
                
                if (!record) {
                    return res.status(404).json({ error: 'Record not found' });
                }

                // Update fields
                if (valor !== undefined) record.valor = valor;
                if (estado !== undefined) record.estado = estado;
                if (fecha_creacion !== undefined) record.fecha_creacion = fecha_creacion;
                if (usuario_creacion !== undefined) record.usuario_creacion = usuario_creacion;
                if (fecha_modificacion !== undefined) record.fecha_modificacion = fecha_modificacion;
                if (usuario_modificacion !== undefined) record.usuario_modificacion = usuario_modificacion;
                if (codigo_material !== undefined) record.codigo_material = codigo_material;
                if (codigo_detalle !== undefined) record.codigo_detalle = codigo_detalle;
                
                await record.save();

                const updatedRecord = await Caracteristica.findByPk(codigo_caracteristica, {
                    include: [
                        { model: Detalle, as: 'detalle' },
                        { model: Material, as: 'material' }
                    ]
                });

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

            const { count, rows } = await Caracteristica.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    { model: Detalle, as: 'detalle' },
                    { model: Material, as: 'material' }
                ]
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
            
            const record = await Caracteristica.findByPk(id, {
                include: [
                    { model: Detalle, as: 'detalle' },
                    { model: Material, as: 'material' }
                ]
            });

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
            
            const record = await Caracteristica.findByPk(id);
            
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