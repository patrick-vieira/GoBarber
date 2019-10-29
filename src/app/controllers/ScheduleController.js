import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Date not provided' });
    }

    const checkProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkProvider) {
      return res.status(400).json('Not autorized.');
    }

    const { date } = req.query;

    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
