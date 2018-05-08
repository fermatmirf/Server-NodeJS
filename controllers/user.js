'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Follow = require('../models/follow');
var User = require('../models/user');
var jwt = require('../services/jwt');


//métodos de pruebas
function home (req,res){
    res.status(200).send({
        message: 'Hola mundo desde el servidor de NodeJS'
    });
}
//registro
function saveUser(req,res){
    var params = req.body;
    var user = new User();
    console.log(req.body);

    if(params.name && params.surname && params.nick && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_ USER';
        user.image = null;
        console.log('llego peticsion');

        //controlar usuarios duplicados
        User.find({ $or: [
                            {email: user.email.toLowerCase()},
                            {nick: user.nick.toLowerCase()}
                    ]}).exec((err, users) => {
                        if(err) return res.status(500).send({message: 'Error en la petición de usuario'});
                        if(users && users.length >= 1){
                            //console.log(users);
                            return res.status(200).send({message: 'El usuario que intenta registrar ya existe'})
                        }else{
                             //cifra password y guarda los datos
                            bcrypt.hash(params.password, null, null, (err, hash) =>{
                                user.password = hash;
                                
                                user.save((err,userStored) =>{
                                    if(err) return res.status(500).send({message: 'error al guardar'});
                                    if(userStored){
                                        res.status(200).send({user: userStored});
                                        
                                    }else{
                                        res.status(404).send({message: 'No se ha registrado el usuario'});
                                    }
                    
                                });         
                                
                            });

                        }
                    });
       
        
        
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }

}

//login
function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password; 

    User.findOne({email: email},(err, user) => {
        
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(user){
            
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    //devolver datos de usuario
                    if(params.gettoken){
                        //devolver token
                        //generar token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        //devolver daros de usuario
                        user.password = undefined;
                        return res.status(200).send({user});

                    }
                    
                }else{
                    return res.status(404).send({message: 'El usuario no se ha podido verificar'});
                }

            });
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido verificar!!'});
        }
    });

}

//conseguir datos de un usuario

function getUser(req, res){
    var userId = req.params.id;
    User.findById(userId,(err, user) =>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!user) return res.status(404).send({message: 'El usuario no existe'});
        Follow.findOne({"user":req.user.sub, "followed": userId}).exec((err, follow) => {
            return res.status(200).send({user, follow});    
        });
    });

}

//devolver un listado de usuarios paginados

function getUsers(req, res){
    var identity_user_id = req.user.sub;
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 5;
    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

        return res.status(200).send({users, total, pages: Math.ceil(total/itemsPerPage)
        });

    });
}

//actualizar los datos del usuario

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    //borrar la propiedad password
    delete update.password;
    //para que solo el usuario dueño de la cuenta pueda cambiar sus datos
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
    }
    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!userUpdated) return res.status(404).send({message: 'No hay usuarios disponibles'});
        return res.status(200).send({user: userUpdated});
    });
}

//subir archivos de imagen/avatar de usuario

function uploadImage(req, res){
    var userId = req.params.id;
  
    if(req.files){
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[2];
        console.log(file_name);

        var ext_slpit = file_name.split('\.');
        var file_ext = ext_slpit[1];
        console.log(ext_slpit);
        console.log(file_ext);

        //para que solo el usuario dueño de la cuenta pueda cambiar su imagen
        if(userId != req.user.sub){
            return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar el avatar de usuario');
            

        }

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            //Actualizar documento de usuario logueado

            User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated) => {
                if(err) return res.status(500).send({message: 'Error en la petición'});
                if(!userUpdated) return res.status(404).send({message: 'No hay usuarios disponibles'});
                return res.status(200).send({user: userUpdated});
            });

        }else{
            return removeFilesOfUploads(res, file_path,'Extensión no valida');
        }
        
    }else{
        return res.status(200).send({message: 'No se han subido imagenes'});
    }
}

function removeFilesOfUploads(res,file_path, message){
    fs.unlink(file_path, (err) => {
        return res.status(200).send({message: message});
    });

}

function getImageFile(req, res){
    var image_file = req.params.imageFile;
    var path_file = './uploads/users/' + image_file;
    fs.exists(path_file, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}



module.exports = {
    home,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile

}