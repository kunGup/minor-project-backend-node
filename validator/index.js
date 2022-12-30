exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email is required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain @")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Email must be between 4 to 32 characters");
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
    })
    .withMessage("password must be atleast 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain atleast one number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
