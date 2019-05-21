const Cliente = require('../models').Cliente;
const models = require('../models');

module.exports = {
    list(req,res) {
        return Cliente.findAll()
            .then(
                (clientes) => res.status(200).send(clientes))
            .catch(
                (error) => res.status(400).send(error)
            )
    },
    getById (req,res) {
        return Cliente.findByPk(req.params.id,{})
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).send(
                        {message:'Cliente no encontrado'}
                        );
                }
                return res.status(200).send(cliente);
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    },
    create(req,res) {
                return Cliente.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    nro_documento: req.body.nro_documento,
                    tipo_documento: req.body.tipo_documento,
                    nacionalidad: req.body.nacionalidad,
                    email: req.body.email,
                    telefono: req.body.telefono,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                }).then ((cliente) => res.status(200).send({message:"Cliente creado con exito",cliente:cliente}))
            .catch((error) => res.status(400).send(error));
    },

    delete (req, res) {
        return Cliente.findByPk(req.params.id)
            .then ( cliente => {
                if (!cliente) {
                    return res.status(404).send(
                        {message:'Cliente no encontrado'}
                    );
                }
                return cliente.destroy()
                    .then( () => res.status(202).send())
                    .catch( (error) => res.status(400).send(error) )
            });
    },
    
    update (req, res) {
         return Cliente.findByPk(req.params.id,{})
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).send(
                        {message:'Cliente no encontrado'}
                        );
                }
                if(req.params.nombre)
                    cliente.nombre = req.params.nombre;
                if(req.params.apellido)
                    cliente.apellido = req.params.apellido;
                if(req.params.nro_documento)
                    cliente.nro_documento = req.params.nro_documento;
                if(req.params.tipo_documento)
                    cliente.tipo_documento = req.params.tipo_documento;
                if(req.params.nacionalidad)
                    cliente.nacionalidad = req.params.nacionalidad;
                if(req.params.email)
                    cliente.email = req.params.email;
                if(req.params.telefono)
                    cliente.telefono = req.params.telefono;
                if(req.params.fecha_nacimiento)
                    cliente.fecha_nacimiento = req.params.fecha_nacimiento;
             
                cliente.save();
                return res.status(200).send({'cliente': 'Cliente actualizado'});
            })
            .catch((error) =>
                res.status(400).send(error)
            );
    }
}
