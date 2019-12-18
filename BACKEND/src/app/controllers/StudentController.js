import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import HelpOrder from '../models/HelpOrder';

class StudentController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    let search = '';

    if (q) search = q;

    const student = await Student.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 5,
      offset: (page - 1) * 5,
      order: [['name', 'ASC']],
    });

    return res.json(student);
  }

  async store(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'Aluno já cadastrado' });
    }

    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({ name, email, age, weight, height });
  }

  async update(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'O aluno não existe' });
    }

    const { name, email, age, weight, height } = await studentExists.update(
      req.body
    );

    return res.json({ name, email, age, weight, height });
  }

  async delete(req, res) {
    // Existe o plano
    const existStudent = await Student.findByPk(req.params.id);

    if (!existStudent) {
      return res.status(401).json({ error: 'O aluno não existe' });
    }

    // Localizando matricula com esse aluno
    const enrollment = await Enrollment.findAll({
      where: { student_id: req.params.id },
    });		
		
    if (enrollment.length) {
      return res.status(401).json({ error: 'O aluno está Matriculado' });
    }				
		
		// Deletando primeiro as perguntas
		const resultHelp = await HelpOrder.destroy({
      where: { student_id: req.params.id },
      truncate: false,
    });				
		
		// Agora os aluno
    const result = await Student.destroy({
      where: { id: req.params.id },
      truncate: false,
    });				

    if (!result) {
      return res.status(401).json({ error: 'Não foi possivel' });
    }
		
    if (!resultHelp) {
      return res.status(401).json({ error: 'Não foi possivel' });
    }
		

    return res.send();
  }
}

export default new StudentController();
