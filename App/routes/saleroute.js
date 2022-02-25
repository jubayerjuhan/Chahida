const express = require('express');
const { addSale, getAllSale } = require('../controllers/salecontroller.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();

router.route('/sale/new').post(authorizeUser, authorizeAdmin, addSale);
router.route('/sale/all').get(getAllSale);


module.exports = router;