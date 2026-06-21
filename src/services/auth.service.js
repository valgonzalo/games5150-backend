import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository.js';
import { ServerError } from '../utils/ServerError.js';
import { signToken, verifyToken } from '../utils/jwt.utils.js';
import { sendVerificationEmail } from '../config/mailer.js';

export const authService = {
  async register({ name, email, password }) {
    if (!name || name.length < 3) throw new ServerError('El nombre debe tener al menos 3 caracteres', 400);
    if (!email || !/\S+@\S+\.\S+/.test(email)) throw new ServerError('Email inválido', 400);
    if (!password || password.length < 6) throw new ServerError('La contraseña debe tener al menos 6 caracteres', 400);

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new ServerError('El email ya está en uso', 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const verificationToken = signToken({ email }, '24h');

    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      email_verified: false,
      verification_token: verificationToken
    });

    await sendVerificationEmail(email, verificationToken);

    return { message: 'Revisa tu email para verificar tu cuenta' };
  },

  async verifyEmail(token) {
    if (!token) throw new ServerError('Token de verificación requerido', 400);
    
    let email;
    try {
      const decoded = verifyToken(token);
      email = decoded.email;
    } catch (e) {
      throw new ServerError('Token inválido o expirado', 400);
    }

    const user = await userRepository.findByEmail(email);
    if (!user) throw new ServerError('Usuario no encontrado', 404);
    if (user.email_verified) throw new ServerError('El email ya está verificado', 400);

    await userRepository.update(user.id, {
      email_verified: true,
      verification_token: null
    });

    return { message: 'Email verificado. Ya podés iniciar sesión.' };
  },

  async login({ email, password }) {
    if (!email || !password) throw new ServerError('Email y contraseña son requeridos', 400);

    const user = await userRepository.findByEmail(email);
    if (!user) throw new ServerError('Credenciales inválidas', 401);

    if (!user.email_verified) throw new ServerError('Verificá tu email antes de iniciar sesión', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ServerError('Credenciales inválidas', 401);

    const access_token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  },

  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new ServerError('Usuario no encontrado', 404);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
};
