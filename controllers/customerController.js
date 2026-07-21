const Customer = require("../models/CustomerModel");

const addCustomer = async (req, res) => {
    console.log("Adding customer");
    try {

        const {
            name,
            email,
            phone,
            company,
            address,
            status
        } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, Email and Phone are required",
            });
        }

        const customer = await Customer.create({
            name,
            email,
            phone,
            company,
            address,
            status,
            createdBy: req.user.id,
        });

        res.status(201).json({
            message: "Customer added successfully",
            customer,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getCustomers = async (req, res) => {

    try {

        const customers = await Customer.find({
            createdBy: req.user.id,
        }).sort({
            createdAt: -1
        });

        res.json(customers);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const getCustomerById = async (req, res) => {

    try {

        const customer = await Customer.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found",
            });
        }

        res.json(customer);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updateCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOneAndUpdate({
                _id: req.params.id,
                createdBy: req.user.id,
            },
            req.body, {
                new: true,
            }
        );

        if (!customer) {

            return res.status(404).json({
                message: "Customer not found",
            });

        }

        res.json({
            message: "Customer updated successfully",
            customer,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const deleteCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!customer) {

            return res.status(404).json({
                message: "Customer not found",
            });

        }

        res.json({
            message: "Customer deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};