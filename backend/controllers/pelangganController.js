const Pelanggan = require("../models/pelangganModel");

const pelangganController = {

    getAll: async (req, res) => {
        try {
            const data = await Pelanggan.getAll();

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

    getById: async (req, res) => {
        try {
            const data = await Pelanggan.getById(req.params.id);

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
            await Pelanggan.create(req.body);

            res.status(201).json({
                success: true,
                message: "Data pelanggan berhasil ditambahkan."
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
            await Pelanggan.update(req.params.id, req.body);

            res.status(200).json({
                success: true,
                message: "Data pelanggan berhasil diubah."
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
            await Pelanggan.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Data pelanggan berhasil dihapus."
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

};

module.exports = pelangganController;