import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import { hashPassword, comparePasswords, generateToken, getAuthorities } from '../utils/security.js';
import InvalidCredentialsError from '../error/invalidCredentialsError.js';

export const signup = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const user = await User.create({ 
      ...req.body,
      password: hashedPassword
    });
    await user.setRoles([1]);

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [Role]
    });
    if (!user) throw new InvalidCredentialsError('Invalid credentials');

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) throw new InvalidCredentialsError('Invalid credentials');

    const token = generateToken(user.id, user.username);
    const authorities = await getAuthorities(user);

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out successfully!"
    });
  } catch (error) {
    return next(error);
  }
};
