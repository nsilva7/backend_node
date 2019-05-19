const Uso = require('../models').Uso;
const DetalleUso = require('../models').DetalleUso;
const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const models = require('../models');

module.exports = {
    list(req,res) {
        return Uso.findAll({
            where: {
            id_cliente: req.params.id_cliente,
          }
        })
        .then(
            (usos) => res.status(200).send(usos)
        )
        .catch(
            (error) => res.status(400).send(error)
        )
    },
    create(req,res) {
        Cliente.findByPk(req.body.id_cliente,{}).then(function (cliente) {
            Bolsa.findAll({
                where: {
                    id_cliente: req.body.id_cliente,
                },
                order: [['fecha_asignacion', 'ASC']]
            }).then(
                (bolsas) => {
                    if(bolsas.reduce(getSum, 0) < req.body.puntaje_utilizado){
                      res.status(200).send({message:"No tiene suficientes puntos"})
                      return;
                    }
                    Uso.create({
                      id_cliente: req.body.id_cliente,
                      puntaje_utilizado: req.body.puntaje_utilizado,
                      fecha: req.body.fecha,
                      concepto: req.body.concepto
                    }).then(
                      (uso) => {
                        let puntaje = req.body.puntaje_utilizado;
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
                          bolsa.puntaje_utilizado += utilizado
                          bolsa.save()
                          DetalleUso.create({
                            id_uso: uso.id,
                            puntaje_utilizado: utilizado,
                            id_bolsa: bolsa.id
                          })
                          if(!puntaje)
                            break;
                        }
                        res.status(200).send({message:"Puntos usados correctamente",uso:uso})
                      }
                    )
                }
            ).catch((error) => res.status(400).send(error))
        }).catch((error) => res.status(400).send({message:"No se encontro el cliente",error:error}))
    },
}

function getSum(total, bolsa){
  return total + bolsa.saldo
}
