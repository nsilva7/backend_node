const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const Regla = require('../models').Regla;
const Vencimiento = require('../models').Vencimiento;
const models = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
var sequelize = new Sequelize('backend_node', 'admin', 'admin',{dialect:"postgres"});
module.exports = {
    list(req,res) {
        let query = {}
        
        if(req.query.vigencia){
            if(req.query.vigencia == "vigentes")
                query.vigencia = `"Bolsa"."fecha_caducidad" >= '${new Date().toISOString().slice(0,10)}'` 
            else if(req.query.vigencia == "no_vigentes")
                query.vigencia = `"Bolsa"."fecha_caducidad" < '${new Date().toISOString().slice(0,10)}'`
        }

        if(req.query.cliente)
          query.cliente = `"Bolsa"."id_cliente" = '${req.query.cliente}'`
        
        if(req.query.dias) {
            let today = new Date().toISOString().slice(0,10);
            let caducidad = new Date(today);
            caducidad.setDate(caducidad.getDate() + Number(req.query.dias));
            query.dias = `"Bolsa"."fecha_caducidad" = '${caducidad.toISOString().slice(0,10)}'`
        }
        
        sequelize.query(`SELECT "Bolsa"."id", "fecha_asignacion", "fecha_caducidad", "puntaje_asignado", "puntaje_utilizado", "saldo", "monto_operacion", CONCAT("nombre",' ',"apellido") AS "cliente" FROM "Bolsas" AS "Bolsa" INNER JOIN "Clientes" ON "Clientes"."id" = "Bolsa"."id_cliente" WHERE ${req.query.vigencia?query.vigencia:true} AND ${req.query.dias?query.dias:true} AND ${req.query.cliente?query.cliente:true}`).then(([results, metadata]) => {
            return res.status(200).send(results);
          }).catch((error) =>
          res.status(400).send(error)
      );
        /*return Bolsa.findAll({
            where: query
        })
            .then(
                (bolsas) => res.status(200).send(bolsas))
            .catch(
                (error) => res.status(400).send(error)
            )*/
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
                            return Bolsa.create({
                                fecha_asignacion: today,
                                fecha_caducidad: caducidad.toISOString().slice(0,10) > vencimiento.fin_validez ? vencimiento.fin_validez:caducidad.toISOString().slice(0,10),
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
