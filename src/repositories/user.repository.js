import { User } from '../models/user.model.js';

export const userRepository = {
  async create(userData) {
    return await User.create(userData);
  },

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  },

  async findById(id) {
    return await User.findByPk(id);
  },

  async update(id, data) {
    return await User.update(data, { where: { id } });
  }
};
