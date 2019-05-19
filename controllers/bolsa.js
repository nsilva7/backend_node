const Bolsa = require('../models').Bolsa;
const Cliente = require('../models').Cliente;
const models = require('../models');

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
