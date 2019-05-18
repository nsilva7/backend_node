const Vencimiento = require('../models').Vencimiento;
const models = require('../models');

module.exports = {
    list(req,res) {
        return Vencimiento.findAll()
            .then(
                (vencimientos) => res.status(200).send(vencimientos))
            .catch(
                (error) => res.status(400).send(error)
            )
    },
    getById (req,res) {
        return Vencimiento.findByPk(req.params.id,{})
            .then((vencimiento) => {
                if (!vencimiento) {
                    return res.status(404).send(
                        {message:'vencimiento no encontrado'}
                        );
                }
                return res.status(200).send(vencimiento);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    create(req,res) {
                console.log(req.body)
                return Vencimiento.create({
                    inicio_validez: req.body.inicio_validez,
                    fin_validez: req.body.fin_validez,
                    dias_validez: req.body.dias_validez
                }).then ((vencimiento) => res.status(200).send({message:"vencimiento creado con exito",vencimiento:vencimiento}))
            .catch((error) => res.status(400).send(error));
    },

    delete (req, res) {
        return Vencimiento.findByPk(req.params.id)
            .then ( vencimiento => {
                if (!vencimiento) {
                    return res.status(404).send(
                        {message:'vencimiento no encontrado'}
                    );
                }
                return vencimiento.destroy()
                    .then( () => res.status(202).send())
                    .catch( (error) => res.status(400).send(error) )
            });
    },
}
