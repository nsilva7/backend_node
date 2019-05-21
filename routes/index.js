var express = require('express');
var router = express.Router();
const clienteController = require('../controllers').clienteController;
const canjeController = require('../controllers').canjeController;
const reglaController = require('../controllers').reglaController;
const vencimientoController = require('../controllers').vencimientoController;
const bolsaController = require('../controllers').bolsaController;
const usoController = require('../controllers').usoController;
const Cliente = require('../models').Cliente;
const Canje = require('../models').Canje;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/canjear', function(req, res, next) {
  Cliente.findAll()
    .then((clientes) => {
      Canje.findAll()
        .then((canjes) => {
          res.render('canjear', { clientes: clientes, canjes: canjes});
        })
    }).catch((error) => res.status(400).send(error))
});

/* GET Bolsa page. */
router.get('/bolsas', function(req, res, next) {
  Cliente.findAll().then((clientes) => {
    res.render('bolsas', { title: 'Bolsas de Puntos', clientes: clientes });

  })
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
router.get('/api/regla/consultar',reglaController.consultar);
router.get('/api/regla/:id',reglaController.getById);
router.post('/api/regla',reglaController.create);
router.delete('/api/regla/:id',reglaController.delete);

/* Vencimientos */
router.get('/api/vencimiento',vencimientoController.list);
router.get('/api/vencimiento/:id',vencimientoController.getById);
router.post('/api/vencimiento',vencimientoController.create);
router.delete('/api/vencimiento/:id',vencimientoController.delete);

/* Bolsas */
router.get('/api/bolsa',bolsaController.list);
router.get('/api/bolsa/:id',bolsaController.getById);
router.get('/api/bolsa/cliente/:id_cliente',bolsaController.getByCliente);
router.post('/api/bolsa',bolsaController.create);
router.post('/api/bolsa/cargar',bolsaController.cargar);
router.delete('/api/bolsa/:id',bolsaController.delete);

/* Uso de Puntos */
router.get('/api/uso/',usoController.list);
router.post('/api/uso',usoController.create);


module.exports = router;
