import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, 'secret123', {
    expiresIn: '30d'
  });
};

export default generateToken;