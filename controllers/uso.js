const Uso = require('../models').Uso;
const DetalleUso = require('../models').DetalleUso;
const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const Canje = require('../models').Canje;
const models = require('../models');
const Sequelize = require('sequelize');
module.exports = {
    list(req,res) {
        const Op = Sequelize.Op
        let query = {}
        if(req.query.canje)
          query.id_canje = req.query.canje
        if(req.query.cliente)
          query.id_cliente = req.query.cliente
        if(req.query.fecha_desde && req.query.fecha_hasta){
          query.fecha = {[Op.between]: [req.query.fecha_desde, req.query.fecha_hasta]}
        }else {
          if(req.query.fecha_desde)
            query.fecha = {[Op.gte]: req.query.fecha_desde}
          if(req.query.fecha_hasta)
            query.fecha = {[Op.lte]: req.query.fecha_hasta}
        }


        console.log(query)
        return Uso.findAll({
            where: query
        })
        .then(
            (usos) => res.status(200).send(usos)
        )
        .catch(
            (error) => {console.log(error); res.status(400).send(error)}
        )
    },
    create(req,res) {
      return Cliente.findByPk(req.body.id_cliente,{}).then(function (cliente) {
        return Canje.findByPk(req.body.id_canje,{}).then(function (canje){
          return Bolsa.findAll({
            where: {
              id_cliente: cliente.id,
            },
            order: [['fecha_asignacion', 'ASC']]
          }).then(function (bolsas) {
            console.log(bolsas[0].id)
            if(bolsas.reduce(getSum, 0) < req.body.puntaje_utilizado)
              return res.status(200).send({message:"No tiene suficientes puntos"})
            return Uso.create({
                id_cliente: req.body.id_cliente,
                puntaje_utilizado: req.body.puntaje_utilizado,
                fecha: req.body.fecha,
                id_canje: canje.id,
              }).then(function (uso){
                let puntaje = req.body.puntaje_utilizado;
                let utilizado = 0;
                for(let bolsa of bolsas){
                  console.log(bolsa.id)
                  if(bolsa.saldo > puntaje){
                    utilizado = puntaje
                    bolsa.saldo -= puntaje;
                    puntaje = 0;
                  }else{
                    utilizado = bolsa.saldo
                    puntaje -= bolsa.saldo;
                    bolsa.saldo = 0;
                  }
                  bolsa.puntaje_utilizado += parseInt(utilizado)
                  bolsa.save()
                  DetalleUso.create({
                    id_uso: uso.id,
                    puntaje_utilizado: utilizado,
                    id_bolsa: bolsa.id
                  })
                  if(!puntaje)
                    break;
                }
                return res.status(200).send({message:"Puntos usados correctamente",uso:uso})
              }).catch((error) => res.status(400).send(error))
            }).catch((error) => res.status(400).send({message: 'No se encontron bolsas', error:error}))
          }).catch((error) => res.status(400).send({message: 'No se encontró el canje', error:error}))
        }).catch((error) => res.status(400).send({message: 'No se encontró el Cliente', error:error}))
    },
}

function getSum(total, bolsa){
  return total + bolsa.saldo
}
