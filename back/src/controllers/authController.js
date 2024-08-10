import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

export const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({ 
      ...req.body,
      password: hashedPassword
    });
    await user.setRoles([1]);

    res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [Role]
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
    }

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token
    });
  } catch (error) {
    res.status(500).json({ 
      type: 'Server error',
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
  res.json({ message: 'Logged out successfully' });
};
