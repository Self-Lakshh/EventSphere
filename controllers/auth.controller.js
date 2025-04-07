const authservice = require('../services/auth.service');

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authservice.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authservice.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const autoLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await authservice.autoLogin(token);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { registerUser, loginUser, autoLogin };
