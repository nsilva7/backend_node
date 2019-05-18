var express = require('express');
var router = express.Router();
const clienteController = require('../controllers').clienteController;
const canjeController = require('../controllers').canjeController;
const reglaController = require('../controllers').reglaController;
const vencimientoController = require('../controllers').vencimientoController;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Clientes */
router.get('/api/cliente',clienteController.list);
router.get('/api/cliente/:id',clienteController.getById);
router.post('/api/cliente',clienteController.create);
router.delete('/api/cliente/:id',clienteController.delete);

/* Canjes */
router.get('/api/canje',canjeController.list);
router.get('/api/canje/:id',canjeController.getById);
router.post('/api/canje',canjeController.create);
router.delete('/api/canje/:id',canjeController.delete);

/* Reglas */
router.get('/api/regla',reglaController.list);
router.get('/api/regla/:id',reglaController.getById);
router.post('/api/regla',reglaController.create);
router.delete('/api/regla/:id',reglaController.delete);

/* Vencimientos */
router.get('/api/vencimiento',vencimientoController.list);
router.get('/api/vencimiento/:id',vencimientoController.getById);
router.post('/api/vencimiento',vencimientoController.create);
router.delete('/api/vencimiento/:id',vencimientoController.delete);


module.exports = router;
