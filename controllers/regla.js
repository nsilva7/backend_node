const Regla = require('../models').Regla;
const models = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
module.exports = {
    list(req,res) {
        return Regla.findAll()
            .then(
                (reglas) => res.status(200).send(reglas))
            .catch(
                (error) => res.status(400).send(error)
            )
    },
    getById (req,res) {
        return Regla.findByPk(req.params.id,{})
            .then((regla) => {
                if (!regla) {
                    return res.status(404).send(
                        {message:'Regla no encontrado'}
                        );
                }
                return res.status(200).send(regla);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    create(req,res) {
                return Regla.create({
                    limite_inferior: req.body.limite_inferior,
                    limite_superior: req.body.limite_superior,
                    monto:req.body.monto
                }).then ((regla) => res.status(200).send({message:"Regla creada con exito",regla:regla}))
            .catch((error) => res.status(400).send(error));
    },

    delete (req, res) {
        return Regla.findByPk(req.params.id)
            .then ( regla => {
                if (!regla) {
                    return res.status(404).send(
                        {message:'Regla no encontrado'}
                    );
                }
                return regla.destroy()
                    .then( () => res.status(202).send())
                    .catch( (error) => res.status(400).send(error) )
            });
    },

    consultar(req, res){
      Regla.findOne({ where: {
         limite_inferior: {[op.lte]: req.query.monto },
         limite_superior: {[op.or]:[null,{[op.gte]:req.query.monto}]}}})
         .then(regla  => {
            let puntos = Math.round(req.query.monto / regla.monto)
            return res.status(202).send(req.query.monto + " equivalen a " + puntos + " puntos");
         }).catch( (error) => res.status(400).send(error))
    }
}
