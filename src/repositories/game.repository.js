import { Op } from 'sequelize';
import { Game } from '../models/game.model.js';
import { Genre } from '../models/genre.model.js';

export const gameRepository = {
  async findAll({ genre_id, search, platform, sort }) {
    const whereClause = { active: true };
    if (genre_id) whereClause.genre_id = genre_id;
    if (platform) whereClause.platform = platform;
    if (search) whereClause.title = { [Op.like]: `%${search}%` };

    let order = [['createdAt', 'DESC']];
    if (sort === 'az') order = [['title', 'ASC']];
    if (sort === 'za') order = [['title', 'DESC']];

    return await Game.findAll({
      where: whereClause,
      order: order,
      include: [{ model: Genre, attributes: ['id', 'name'] }]
    });
  },

  async findById(id) {
    return await Game.findOne({
      where: { id, active: true },
      include: [{ model: Genre, attributes: ['id', 'name'] }]
    });
  },

  async create(data) {
    return await Game.create(data);
  },

  async update(id, data) {
    await Game.update(data, { where: { id } });
    return await this.findById(id);
  },

  async delete(id) {
    return await Game.update({ active: false }, { where: { id } });
  }
};
