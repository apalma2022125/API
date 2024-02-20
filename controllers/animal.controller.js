const Animal = require('../models/animales');
const { response } = require('express');



const animalesGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        animales
    });
}


const getAnimalesById = async (req, res) => {
    const {id} = req.params;
    const animales = await Animal.findOne({_id: id});

    if(!animales.estado){
        return res.status(400).json({
            msg: "El usuario no esxiste, fue eliminado"
        });
    }

    res.status(200).json({
        animales
    });
}


const putAnimales = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...resto } = req.body;



    const animales = await Animal.findByIdAndUpdate(id, resto);


    if(!animales.estado){
        return res.status(400).json({
            msg: "El usuario fue eliminado, no se puede actualizar"
        });
    }

    const Actualizado = await Animal.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
        msg: 'Animal Actualizado Exitosamente!!!',
        Actualizado
    });
}

const animalesDelete = async (req, res) => {
    const {id} = req.params;
    const animales = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Animal eliminado exitosamente!!!',
        animales
    });
}


const animalesPost = async (req, res) => {
    const {animal,Raza,edad, sexo, Sesion } = req.body;
    const animales = new Animal({animal,Raza,edad, sexo, Sesion});


    await animales.save();
    res.status(202).json({
        animales
    });
}

module.exports = {
    animalesPost,
    animalesGet,
    getAnimalesById,
    putAnimales,
    animalesDelete
}