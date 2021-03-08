import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller';

const User = require('../models/User');

const jwt = require('jsonwebtoken');

// routes
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

router.post('/register', async (req, res)=>{
    //guardamos el user dentro de la base de datos
    const {email,password}= req.body;
    const newUser = new User({email,password});
    await newUser.save();
    
    //crear el token
    const token = jwt.sign({_id: newUser._id}, 'secretkey')
    res.status(200).json({token})

})

router.post('/signin', async(req, res)=>{

    const{email,password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("El email no existe");
    if(user.password !== password) return res.status(401).send("Constraseña incorrecta");

    const token =  jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
});






export default router;

function verifyToken(req: { headers: { authorization: any; }; }){
    console.log(req.headers.authorization)

}