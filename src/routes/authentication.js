const express = require("express");

const router = express.Router();

//codigo que responde  a la solicitud de inicion de seción y carga /signin

router.get('/signin', (req, res) => {
  res.render('./auth/signin');
});






 




















module.exports = router;
