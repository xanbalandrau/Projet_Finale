const { body, params } = require("express-validator");

exports.validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isLength({ max: 50 })
    .withMessage("L'email doit faire moins de 50 characteres"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire"),
];

// Skill
exports.validateCreateSkill = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 2 })
    .withMessage("le titre du skill doit faire au moins 2 characteres")
    .isLength({ max: 20 })
    .withMessage("le titre du skill doit faire moins de 20 characteres"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categorie est obligatoire")
    .isLength({ min: 2 })
    .withMessage("La categorie du skill doit faire au moins 2 characteres")
    .isLength({ max: 20 })
    .withMessage("La categorie du skill doit faire moins de 20 characteres"),

  body("level").trim().notEmpty().withMessage("Le niveau est obligatoire"),
];
