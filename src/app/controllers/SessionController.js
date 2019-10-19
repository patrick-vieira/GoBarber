import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json('User not found');
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json('Password does not match');
    }

    const { id, name } = user;

    const payload = { id, name };

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign(payload, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
