const { Schema, model} = require('mongoose');

const AnimalesSchema = Schema({


    animal:{
        type:String,
        required:[true, 'EL tipo de animal es Obligatorio']
    },

    Raza:{
        type: String,
        required:[true, 'La raza es obligatoria']
    },

    edad:{
        type:String,
        required:[true, 'La edad es Obligatorio']
    },

    sexo:{
        type:String,
        required:[true, 'El sexo es Obligatorio']
    },

    Sesion:{
        type: String,
        required:[true, 'La sesion es obligatoria']
    },

    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('animales', AnimalesSchema);