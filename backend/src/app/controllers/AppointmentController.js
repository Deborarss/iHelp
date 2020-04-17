import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import { literal } from 'sequelize';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import CancellationMail from '../jobs/CancellationMail';

import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: literal('date DESC'),
      attributes: ['id', 'date', 'place', 'details', 'past'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'helper',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      helper_id: Yup.number().required(),
      date: Yup.date().required(),
      place: Yup.string()
        .required()
        .max(200),
      details: Yup.string()
        .required()
        .max(600),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { helper_id, date, place, details } = req.body;

    /* check if helper_id is a helper  */
    const checkIsHelper = await User.findOne({
      where: { id: helper_id, helper: true },
    });

    if (!checkIsHelper) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with helpers' });
    }

    // eslint-disable-next-line eqeqeq
    if (helper_id == req.userId) {
      return res
        .status(401)
        .json({ error: 'You cannot create appointment to yourself' });
    }

    // Check for paste dates
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Check date availability
    const checkAvailability = await Appointment.findOne({
      where: {
        helper_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      helper_id,
      date: hourStart,
      place,
      details,
    });

    // Notify appointment helper
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo pedido de ajuda de ${user.name} para ${formattedDate}`,
      user: helper_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'helper',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    // if the user id is different of the logged user
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    if (appointment.canceled_at) {
      return res.status(401).json({ error: 'You already canceled the help' });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
