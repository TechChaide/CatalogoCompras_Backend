const { Material, Proveedor, Tipo_material } = require('../models');
const { handleError } = require('../helpers/error.helper');

module.exports = {
    // Create or update record
    createOrUpdate: async (req, res) => {
        try {
            const {
                codigo_material,
                codigo_tipo_material,
                codigo_proveedor,
                material,
                descripcion_material,
                unidad_medida,
                estado,
                fecha_creacion,
                usuario_creacion,
                fecha_modificacion,
                usuario_modificacion
            } = req.body;

            // Validate required fields

            if (codigo_material == 0 || codigo_material === undefined) {
                // Create new record
                const newRecord = await Material.create({
                    codigo_tipo_material: codigo_tipo_material,
                    codigo_proveedor: codigo_proveedor,
                    material: material,
                    descripcion_material: descripcion_material,
                    unidad_medida: unidad_medida,
                    estado: estado,
                    fecha_creacion: fecha_creacion,
                    usuario_creacion: usuario_creacion,
                    fecha_modificacion: fecha_modificacion,
                    usuario_modificacion: usuario_modificacion
                });

                const response = await Material.findByPk(newRecord.codigo_material, {
                    include: [
                        { model: Proveedor, as: 'proveedor' },
                        { model: Tipo_material, as: 'tipo_material' }
                    ]
                });

                return res.status(201).json({
                    data: response,
                    length: 1
                });
            } else {
                // Update existing record
                const record = await Material.findByPk(codigo_material, {
                    include: [
                        { model: Proveedor, as: 'proveedor' },
                        { model: Tipo_material, as: 'tipo_material' }
                    ]
                });
                
                if (!record) {
                    return res.status(404).json({ error: 'Record not found' });
                }

                // Update fields
                if (codigo_tipo_material !== undefined) record.codigo_tipo_material = codigo_tipo_material;
                if (codigo_proveedor !== undefined) record.codigo_proveedor = codigo_proveedor;
                if (material !== undefined) record.material = material;
                if (descripcion_material !== undefined) record.descripcion_material = descripcion_material;
                if (unidad_medida !== undefined) record.unidad_medida = unidad_medida;
                if (estado !== undefined) record.estado = estado;
                if (fecha_creacion !== undefined) record.fecha_creacion = fecha_creacion;
                if (usuario_creacion !== undefined) record.usuario_creacion = usuario_creacion;
                if (fecha_modificacion !== undefined) record.fecha_modificacion = fecha_modificacion;
                if (usuario_modificacion !== undefined) record.usuario_modificacion = usuario_modificacion;
                
                await record.save();

                const updatedRecord = await Material.findByPk(codigo_material, {
                    include: [
                        { model: Proveedor, as: 'proveedor' },
                        { model: Tipo_material, as: 'tipo_material' }
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

            const { count, rows } = await Material.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    { model: Proveedor, as: 'proveedor' },
                    { model: Tipo_material, as: 'tipo_material' }
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
            
            const record = await Material.findByPk(id, {
                include: [
                    { model: Proveedor, as: 'proveedor' },
                    { model: Tipo_material, as: 'tipo_material' }
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
            
            const record = await Material.findByPk(id);
            
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