import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const admin = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token)
      return res.status(401).send({ message: 'Authorization required.' });

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin')
      return res.status(403).send({ message: "You don't have permission." });

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send({ message: 'Authorization required.' });
  }
};

export default admin;
