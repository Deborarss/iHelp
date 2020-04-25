import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op, literal } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkUserHelper = await User.findOne({
      where: { id: req.userId, helper: true },
    });

    if (!checkUserHelper) {
      return res.status(401).json({ error: 'User is not a helper' });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const Appointments = await Appointment.findAll({
      where: {
        helper_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: literal('date DESC'),
    });

    return res.json(Appointments);
  }
}

export default new ScheduleController();
