const express = require ('express');
const router = express.Router();
const controllerMail = require('/views/raftminhowed/js/mail.controller.js')    

router.post('/mail', controllerMail.sendMail);