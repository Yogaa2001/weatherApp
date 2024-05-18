// routes.js
const express = require('express');
const router = express.Router();

const weathercontroller = require('../controller/weathercontroller')
const weathercrudapi = require('../controller/weathercrudapi')

router.get('/weather/:city/:from/:to', weathercontroller.getFilterData);

router.get('/weather/:city', weathercrudapi.getData);
router.post('/create', weathercrudapi.createData);
router.get('/getall', weathercrudapi.getAllData);
router.patch('/update', weathercrudapi.updateData);
router.delete('/delete', weathercrudapi.deleteData);

module.exports = router;