const { Detalle, Tipo_caracteristica, Familia_material } = require('../models');
const { handleError } = require('../helpers/error.helper');

module.exports = {
    // Create or update record
    createOrUpdate: async (req, res) => {
        try {
            const {
                codigo_detalle,
                estado,
                fecha_modificacion,
                usuario_modificacion,
                codigo_familia_material,
                codigo_tipo_caracteristica
            } = req.body;

            // Validate required fields

            if (codigo_detalle == 0 || codigo_detalle === undefined) {
                // Create new record
                const newRecord = await Detalle.create({
                    estado: estado,
                    fecha_modificacion: fecha_modificacion,
                    usuario_modificacion: usuario_modificacion,
                    codigo_familia_material: codigo_familia_material,
                    codigo_tipo_caracteristica: codigo_tipo_caracteristica
                });

                const response = await Detalle.findByPk(newRecord.codigo_detalle, {
                    include: [
                        { model: Familia_material, as: 'familia_material' },
                        { model: Tipo_caracteristica, as: 'tipo_caracteristica' }
                    ]
                });

                return res.status(201).json({
                    data: response,
                    length: 1
                });
            } else {
                // Update existing record
                const record = await Detalle.findByPk(codigo_detalle, {
                    include: [
                        { model: Familia_material, as: 'familia_material' },
                        { model: Tipo_caracteristica, as: 'tipo_caracteristica' }
                    ]
                });
                
                if (!record) {
                    return res.status(404).json({ error: 'Record not found' });
                }

                // Update fields
                if (estado !== undefined) record.estado = estado;
                if (fecha_modificacion !== undefined) record.fecha_modificacion = fecha_modificacion;
                if (usuario_modificacion !== undefined) record.usuario_modificacion = usuario_modificacion;
                if (codigo_familia_material !== undefined) record.codigo_familia_material = codigo_familia_material;
                if (codigo_tipo_caracteristica !== undefined) record.codigo_tipo_caracteristica = codigo_tipo_caracteristica;
                
                await record.save();

                const updatedRecord = await Detalle.findByPk(codigo_detalle, {
                    include: [
                        { model: Familia_material, as: 'familia_material' },
                        { model: Tipo_caracteristica, as: 'tipo_caracteristica' }
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

            const { count, rows } = await Detalle.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    { model: Familia_material, as: 'familia_material' },
                    { model: Tipo_caracteristica, as: 'tipo_caracteristica' }
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
            
            const record = await Detalle.findByPk(id, {
                include: [
                    { model: Familia_material, as: 'familia_material' },
                    { model: Tipo_caracteristica, as: 'tipo_caracteristica' }
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
            
            const record = await Detalle.findByPk(id);
            
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