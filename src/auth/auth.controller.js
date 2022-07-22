import authService from './auth.service.js';

class AuthController {
  async login(req, res) {
    try {
      const { name, password } = req.body;

      if (!name || !password)
        return res.status(400).send({ message: 'Missing name or password.' });

      const user = await authService.findUser(name);

      if (!user) return res.status(404).send({ message: 'User not found.' });

      const { id, role, password: hash } = user;

      const result = await authService.comparePasswords(password, hash);

      if (!result) return res.status(401).send({ message: 'Wrong password.' });

      const token = authService.generateToken(id, role);

      res.send({ value: token, user: { id, role } });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
}

export default new AuthController();
