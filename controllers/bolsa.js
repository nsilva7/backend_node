const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const Regla = require('../models').Regla;
const Vencimiento = require('../models').Vencimiento;
const models = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = {
    list(req,res) {
        return Bolsa.findAll()
            .then(
                (bolsas) => res.status(200).send(bolsas))
            .catch(
                (error) => res.status(400).send(error)
            )
    },
    getByCliente (req,res) {
      return Bolsa.findAll({
          where: {
          id_cliente: req.params.id_cliente,
        }
      })
            .then((bolsa) => {
                if (!bolsa) {
                    return res.status(404).send(
                        {message:'bolsa de puntos no encontrada'}
                        );
                }
                return res.status(200).send(bolsa);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    getById (req,res) {
        return Bolsa.findByPk(req.params.id,{})
            .then((bolsa) => {
                if (!bolsa) {
                    return res.status(404).send(
                        {message:'bolsa de puntos no encontrada'}
                        );
                }
                return res.status(200).send(bolsa);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    create(req,res) {
        Cliente.findByPk(req.body.id_cliente,{}).then(function (cliente) {
                return Bolsa.create({
                    fecha_asignacion: req.body.fecha_asignacion,
                    fecha_caducidad: req.body.fecha_caducidad,
                    puntaje_asignado: req.body.puntaje_asignado,
                    puntaje_utilizado: req.body.puntaje_utilizado,
                    saldo: req.body.saldo,
                    monto_operacion: req.body.monto_operacion ,
                    id_cliente: req.body.id_cliente,
                }).then ((bolsa) => res.status(200).send({message:"Bolsa de puntos creada con exito",bolsa:bolsa}))
            .catch((error) => res.status(400).send(error))
            }).catch((error) => res.status(400).send({message:"No se encontro el cliente",error:error}))
    },

    cargar(req,res) {
        Cliente.findByPk(req.body.id_cliente,{}).then(function (cliente) {
           Regla.findOne({ where: {
                limite_inferior: {[op.lte]: req.body.monto_operacion },
                limite_superior: {[op.or]:[null,{[op.gte]:req.body.monto_operacion}]}}}).then(regla => {
                    let today = new Date().toISOString().slice(0,10);
                    Vencimiento.findOne({ where: {
                        inicio_validez: {[op.lte]: today },
                        fin_validez: {[op.gte]: today}}}).then(vencimiento => {
                            let caducidad = new Date(today);
                            caducidad.setDate(caducidad.getDate() + vencimiento.dias_validez);
                            console.log(Math.round(req.body.monto_operacion/regla.monto),req.body.monto_operacion,regla.monto)
                            return Bolsa.create({
                                fecha_asignacion: today,
                                fecha_caducidad: caducidad.toISOString().slice(0,10),
                                puntaje_asignado: Math.round(req.body.monto_operacion/regla.monto),
                                puntaje_utilizado: 0,
                                saldo: Math.round(req.body.monto_operacion/regla.monto),
                                monto_operacion: req.body.monto_operacion ,
                                id_cliente: req.body.id_cliente,
                            }).then ((bolsa) => res.status(200).send({message:"Bolsa de puntos creada con exito",bolsa:bolsa}))
            
                 }).catch((error) => res.status(400).send({message:"No se encontro un vencimiento configurado",error:error}))
         }).catch((error) => res.status(400).send({message:"No se encontro el una regla",error:error}))
                
            })
    },

    delete (req, res) {
        return Bolsa.findByPk(req.params.id)
            .then ( bolsa => {
                if (!bolsa) {
                    return res.status(404).send(
                        {message:'Bolsa de puntos no encontrada'}
                    );
                }
                return bolsa.destroy()
                    .then( () => res.status(202).send())
                    .catch( (error) => res.status(400).send(error) )
            });
    },
}
