const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
  //valider les données de la requete
  const errors = validationResult(req);

  //si les données sont invalides renvoyer une erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
