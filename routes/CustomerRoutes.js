const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customerController");

router.get("/", auth, getCustomers);

router.get("/:id", auth, getCustomerById);

router.post("/", auth, addCustomer);

router.put("/:id", auth, updateCustomer);

router.delete("/:id", auth, deleteCustomer);

module.exports = router;