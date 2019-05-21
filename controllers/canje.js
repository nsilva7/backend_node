const Canje = require('../models').Canje;
const models = require('../models');

module.exports = {
    list(req,res) {
        return Canje.findAll()
            .then(
                (canjes) => res.status(200).send(canjes))
            .catch(
                (error) => res.status(400).send(error)
            )
    },
    getById (req,res) {
        return Canje.findByPk(req.params.id,{})
            .then((canje) => {
                if (!canje) {
                    return res.status(404).send(
                        {message:'Canje no encontrado'}
                        );
                }
                return res.status(200).send(canje);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    create(req,res) {
                return Canje.create({
                    descripcion: req.body.descripcion,
                    puntos_requeridos: req.body.puntos_requeridos,
                }).then ((canje) => res.status(200).send({message:"Canje creado con exito",canje:canje}))
            .catch((error) => res.status(400).send(error));
    },

    delete (req, res) {
        return Canje.findByPk(req.params.id)
            .then ( canje => {
                if (!canje) {
                    return res.status(404).send(
                        {message:'Canje no encontrado'}
                    );
                }
                return canje.destroy()
                    .then( () => res.status(202).send())
                    .catch( (error) => res.status(400).send(error) )
            });
    },
    
    update(req,res) {
       return Canje.findByPk(req.params.id,{})
          .then((canje) => {
              if (!canje) 
                  return res.status(404).send({message:'Canje no encontrado'});
              
               if(req.body.descripcion)
                    canje.descripcion = req.body.descripcion;
                if(req.body.puntos_requeridos)
                    canje.puntos_requeridos = req.body.puntos_requeridos;
             
                canje.save();
              return res.status(200).send({message:'Canje actuslizado con exito'});
          })
          .catch((error) =>
              res.status(400).send(error)
          );
    },
}
