import User from '../models/User';
import File from '../models/File';

class HelperController {
  async index(req, res) {
    const helpers = await User.findAll({
      where: { helper: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(helpers);
  }
}

export default new HelperController();
