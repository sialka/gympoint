import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  // List checkins
  async index(req, res) {
    const { id } = req.params;
    // const { page = 1 } = req.query;

    // Verifica se o id existe
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'O id do aluno não existe.' });
    }

    // Verifica se o student fez Check-in
    const checkin = await Checkin.findAll({
      where: { student_id: id },
      attributes: ['id', 'student_id', 'createdAt'],
      // limit: 5,
      // offset: (page - 1) * 5,
			order: [
				['id'],
			],
    });

    if (checkin.length === 0) {
      return res.status(400).json({ error: 'O aluno não fez checkin ainda.' });
    }

    return res.json(checkin);
  }

  // Check-in
  async store(req, res) {
    // Verifica se o id existe
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'O id do aluno não existe.' });
    }

    // Verifica se já fez 5 checkins dentro de um periodo de 7 dias corridos

    const today = new Date();
    const ago = subDays(today, 7);

    const search = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.lt]: today,
          [Op.gt]: ago,
        },
      },
    });

    if (search.count >= 5) {
      return res.status(400).json({
        error: 'Você já atingiu o limite de 5 checkins nos últimos 7 dias ',
      });
    }

    // Registra o checkin		
    const { id, student_id } = await Checkin.create({
      student_id: req.params.id,
    });
		

		return res.json({ id, student_id });		
  }
}

export default new CheckinController();
