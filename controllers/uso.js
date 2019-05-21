const Uso = require('../models').Uso;
const DetalleUso = require('../models').DetalleUso;
const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const Canje = require('../models').Canje;
const models = require('../models');
const Sequelize = require('sequelize');
const nodemailer = require("nodemailer");
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
          const Op = Sequelize.Op
          let query = {}
          query.id_cliente = cliente.id
          query.fecha_caducidad = {[Op.gte]: new Date().toISOString().slice(0,10)}
          return Bolsa.findAll({
            where: query,
            order: [['fecha_asignacion', 'ASC']]
          }).then(function (bolsas) {
            if(bolsas.reduce(getSum, 0) < canje.puntos_requeridos)
              return res.status(200).send({message:"No tiene suficientes puntos", tittle: 'Error'})
            return Uso.create({
                id_cliente: req.body.id_cliente,
                puntaje_utilizado: canje.puntos_requeridos,
                fecha: new Date().toISOString().slice(0,10),
                id_canje: canje.id,
              }).then(function (uso){
                let puntaje = canje.puntos_requeridos;
                let utilizado = 0;
                for(let bolsa of bolsas){
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
                sendEmail(cliente, canje)
                return res.status(200).send({message:"Puntos usados correctamente", tittle: 'Operación Exitosa'})
              }).catch((error) => res.status(400).send(error))
            }).catch((error) => res.status(400).send({message: 'No se encontron bolsas', error:error}))
          }).catch((error) => {console.log(error); res.status(400).send({message: 'No se encontró el canje', error:error})})
        }).catch((error) => res.status(400).send({message: 'No se encontró el Cliente', error:error}))
    },
}

function getSum(total, bolsa){
  return total + bolsa.saldo
}

async function sendEmail(cliente, canje){
  var transporter = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
           user: 'josedacak@gmail.com',
           pass: 'qraeisdmhhopwtlk'
       }
  });
  let today =  new Date().toISOString().slice(0,10)
  var mailOptions = {
       from: 'Administración',
       to: cliente.email,
       subject: 'Confirmación de canje',
       text: 'En la fecha ' + today + ' se canjeó "' + canje.descripcion + '" por valor de ' + canje.puntos_requeridos + ' puntos.'
  };

  transporter.sendMail(mailOptions, function(error, info){
      console.log('sendMail')
      if (error){
        console.log(error);
      } else {
        console.log("Email sent");
      }
  });
}
