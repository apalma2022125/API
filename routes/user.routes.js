const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
   usuariosPost,
    usuariosGet,
  getUsuarioId,
putUsuarios,
usuariosDelete } = require('../controllers/user.controller');

const { existeEmail, esRoleValido,existeId } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
      check('id', 'No es un id válido').isMongoId(),
      check('id').custom(existeId),
      validarCampos
  ], getUsuarioId);

router.put(
  "/:id",
  [
      check('id', 'No es un id válido').isMongoId(),
      check('id').custom(existeId),
      check("role").custom(esRoleValido),
      validarCampos
  ], putUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check("password", "El password tiene que esr mas de 6 caracteres").isLength({ min: 6 }),
    check("correo", "Este no es un correo validao").isEmail(),
    check("correo").custom(existeEmail),
    check("role").custom(esRoleValido),
    validarCampos,
  ], usuariosPost);

module.exports = router;
