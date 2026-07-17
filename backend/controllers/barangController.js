const Barang = require("../models/barangModel");
const barangController = {

    getAll: async (req, res) => {
        try {
            const data = await Barang.getAll();
            res.status(200).json({
                success: true,
                message: "Data barang berhasil diambil.",
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    getById: async (req, res) => {
        try {
            const data = await Barang.getById(req.params.id);
            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    create: async (req, res) => {
        try {
            await Barang.create(req.body);
            res.status(201).json({
                success: true,
                message: "Data barang berhasil ditambahkan."
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    update: async (req, res) => {
        try {
            await Barang.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: "Data barang berhasil diubah."
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    delete: async (req, res) => {
        try {
            await Barang.delete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Data barang berhasil dihapus."
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = barangController;