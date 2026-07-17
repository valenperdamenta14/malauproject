const Booking = require("../models/bookingModel");

const bookingController = {

    getAll: async (req, res) => {
        try {

            const data = await Booking.getAll();

            res.json({
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

            const data = await Booking.getById(req.params.id);

            res.json({
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

            const id = await Booking.create(req.body);

            res.status(201).json({
                success: true,
                booking_id: id,
                message: "Booking berhasil disimpan."
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

            await Booking.update(req.params.id, req.body);

            res.json({
                success: true,
                message: "Booking berhasil diubah."
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

            await Booking.delete(req.params.id);

            res.json({
                success: true,
                message: "Booking berhasil dihapus."
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }

};

module.exports = bookingController;