import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import { hashPassword, comparePasswords, generateToken, verifyToken, checkAccess, getAuthorities } from '../utils/security.js';

export const signup = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

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

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

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
