const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    animalesPost,
    animalesGet,
    getAnimalesById,
    putAnimales,
    animalesDelete} = require('../controllers/animal.controller');


const { existeAnimalesById } = require('../helpers/db-validators');

const router = Router();

router.get("/", animalesGet);

    router.get(
        "/:id",
        [
            check('id','No es un id valido').isMongoId(),
             check('id').custom(existeAnimalesById), 
            validarCampos
        ], getAnimalesById);
    

        router.put(
            "/:id",
            [
                check('id', 'NO es un id valido').isMongoId(),
                check('id').custom(existeAnimalesById),
               /*  check('role').custom(esRoleValido), */
                validarCampos
            ], putAnimales);

    router.post(
        "/",
        [
            check("animal", "El tipo de animal no puede estar vacio").not().isEmpty(),
            check("Raza","La Raza no puede estar vacia").not().isEmpty(),
            check("edad" , "La edad no puede estar vacia").not().isEmpty(),
            check("sexo", "El sexo no puede estar vacio").not().isEmpty(),
            check("Sesion", "La fecha de la secion no puede estar vacia").not().isEmpty(),
            validarCampos,
        ], animalesPost);

        router.delete(
            "/:id",
            [
            check('id', 'No es un id válido').isMongoId(),
            check("id").custom(existeAnimalesById),
            validarCampos,
            ],animalesDelete);

            module.exports = router;


