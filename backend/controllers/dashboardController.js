const Dashboard = require("../models/dashboardModel");

const dashboardController = {

    summary: async (req, res) => {

        try {

            const data =
                await Dashboard.getSummary();

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

    }

};

module.exports = dashboardController;