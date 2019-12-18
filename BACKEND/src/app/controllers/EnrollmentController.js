import { Op } from 'sequelize';
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import WellcomeMail from '../jobs/WellcomeMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  // List Enrollment
  async index(req, res) {
    const { page = 1 } = req.query;		

    const enrollment = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
      order: [['start_date', 'ASC']],			
    });

    return res.json(enrollment);
  }

  // store Enrollment
  async store(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Verifica a existência do aluno
    const student = await Student.findOne({
      where: { id: req.body.student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'O id do aluno não existe.' });
    }

    // Verificando a existência do plano
    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'O id do plano não existe.' });
    }

    // Verificando duplicidade de matricula
    const existEnrollment = await Enrollment.findOne({
      where: { student_id: req.body.student_id },
    });

    if (existEnrollment) {
      return res.status(400).json({ error: 'O aluno já está matriculado.' });
    }

    // Criando a Matricula

    // Data Final
    const endPeriod = addMonths(parseISO(req.body.start_date), plan.duration);

    // Calculando o preço
    const sumPrice = plan.duration * plan.price;

    const { student_id, plan_id, start_date } = req.body;
    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: endPeriod,
      price: sumPrice,
    });

    const data = await Enrollment.findByPk(enrollment.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price'],
        },
      ],
    });

    // Disparando o email através de fila
    await Queue.add(WellcomeMail.key, {
      enrollment,
      plan,
      student,
    });

    return res.json(data);
  }

  // update Enrollment
  async update(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Verificando a existência do plano
    const plan = await Plan.findOne({
      where: { id: req.body.plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'O id do plano não existe.' });
    }

    // Verificando duplicidade de matricula
    const enrollment = await Enrollment.findOne({
      where: { id: req.params.id },
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Matricula não existe.' });
    }

    // Atualizando a Matricula

    // Data Final
    const period = addMonths(parseISO(req.body.start_date), plan.duration);

    // Calculando o preço
    const total = plan.duration * plan.price;

    const {
      id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await enrollment.update({
      plan_id: plan.id,
      start_date: req.body.start_date,
      end_date: period,
      price: total,
    });

    return res.json({
      id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  // delete Enrollment
  async delete(req, res) {
    // Existe o plano
    const existEnrollment = await Enrollment.findByPk(req.params.id);

    if (!existEnrollment) {
      return res.status(401).json({ error: 'Enrollment not exists.' });
    }

    const result = await Enrollment.destroy({
      where: { id: req.params.id },
      truncate: false,
    });

    if (!result) {
      return res.status(401).json({ error: 'It was not possible' });
    }

    return res.send();
  }
}

export default new EnrollmentController();
