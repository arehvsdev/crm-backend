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

        if (!name || !email || !phone || name.trim() === "" || email.trim() === "" || phone.trim() === "") {
            return res.status(400).json({
                message: "Name, Email and Phone are required and cannot be empty",
            });
        }

        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }

        // Phone validation
        if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
            return res.status(400).json({
                message: "Please enter a valid phone number",
            });
        }

        // Check duplicate email for this user
        const existingCustomer = await Customer.findOne({ email, createdBy: req.user.id });
        if (existingCustomer) {
            return res.status(400).json({
                message: "A customer with this email already exists",
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

        let query = {
            createdBy: req.user.id
        };
        if (req.user.role === "Admin") {
            query = {};
        }

        const customers = await Customer.find(query).sort({
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
        const { name, email, phone } = req.body;

        // Validations if fields are being updated
        if (name !== undefined && name.trim() === "") {
            return res.status(400).json({
                message: "Name cannot be empty",
            });
        }

        if (email !== undefined) {
            if (email.trim() === "") {
                return res.status(400).json({
                    message: "Email cannot be empty",
                });
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                return res.status(400).json({
                    message: "Please enter a valid email address",
                });
            }

            // Check duplicate email for this user
            const existingCustomer = await Customer.findOne({
                email,
                createdBy: req.user.id,
                _id: { $ne: req.params.id }
            });
            if (existingCustomer) {
                return res.status(400).json({
                    message: "A customer with this email already exists",
                });
            }
        }

        if (phone !== undefined) {
            if (phone.trim() === "") {
                return res.status(400).json({
                    message: "Phone cannot be empty",
                });
            }
            if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
                return res.status(400).json({
                    message: "Please enter a valid phone number",
                });
            }
        }

        const customer = await Customer.findOneAndUpdate({
                _id: req.params.id,
                createdBy: req.user.id,
            },
            req.body, {
                new: true,
                runValidators: true,
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