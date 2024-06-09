const express = require('express');
const router = express.Router();
const Order = require('../models/Carreers'); // Ensure the correct path and spelling

router.post('/CareerData', async (req, res) => {
    let data = req.body.career_data;

    // Check if career_data is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'career_data should be an array' });
    }

    // Add order_date at the beginning of the array
    await data.splice(0, 0, { Career_date: req.body.career_date });

    // Check if the email exists in the database
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);

        if (eId === null) {
            // If the email does not exist, create a new document
            try {
                console.log(data);
                console.log(req.body.email);

                await Order.create({
                    email: req.body.email,
                    career_data: data
                });

                return res.json({ success: true });
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        } else {
            // If the email exists, update the document
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { career_data: data } } ).then(() => {
                        res.json({success : true})
                    })
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        }
});

module.exports = router;
