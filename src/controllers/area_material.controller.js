const { Area_material, Material, Area } = require('../models');
const { handleError } = require('../helpers/error.helper');

module.exports = {
    // Create or update record
    createOrUpdate: async (req, res) => {
        try {
            const {
                codigo_area_material,
                estado,
                fecha_modificacion,
                usuario_modificacion,
                codigo_area,
                codigo_material
            } = req.body;

            // Validate required fields

            if (codigo_area_material == 0 || codigo_area_material === undefined) {
                // Create new record
                const newRecord = await Area_material.create({
                    estado: estado,
                    fecha_modificacion: fecha_modificacion,
                    usuario_modificacion: usuario_modificacion,
                    codigo_area: codigo_area,
                    codigo_material: codigo_material
                });

                const response = await Area_material.findByPk(newRecord.codigo_area_material, {
                    include: [
                        { model: Area, as: 'Area' },
                        { model: Material, as: 'material' }
                    ]
                });

                return res.status(201).json({
                    data: response,
                    length: 1
                });
            } else {
                // Update existing record
                const record = await Area_material.findByPk(codigo_area_material, {
                    include: [
                        { model: Area, as: 'Area' },
                        { model: Material, as: 'material' }
                    ]
                });
                
                if (!record) {
                    return res.status(404).json({ error: 'Record not found' });
                }

                // Update fields
                if (estado !== undefined) record.estado = estado;
                if (fecha_modificacion !== undefined) record.fecha_modificacion = fecha_modificacion;
                if (usuario_modificacion !== undefined) record.usuario_modificacion = usuario_modificacion;
                if (codigo_area !== undefined) record.codigo_area = codigo_area;
                if (codigo_material !== undefined) record.codigo_material = codigo_material;
                
                await record.save();

                const updatedRecord = await Area_material.findByPk(codigo_area_material, {
                    include: [
                        { model: Area, as: 'Area' },
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

            const { count, rows } = await Area_material.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    { model: Area, as: 'Area' },
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
            
            const record = await Area_material.findByPk(id, {
                include: [
                    { model: Area, as: 'Area' },
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
            
            const record = await Area_material.findByPk(id);
            
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