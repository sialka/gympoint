import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrder = await HelpOrder.findAll({
      where: {
        answer: null,
      },
			include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
      order: ['created_at'],
      attributes: ['id', 'student_id', 'question', 'answer'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(helpOrder);
  }

  async store(req, res) {
		
    // Validação de dados
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados' });
    }
    // Verificando se existe o aluno
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'O id do aluno não existe.' });
    }

    // Registrando Ajuda
    const { id, student_id, question } = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });

    return res.json({ id, student_id, question });
  }

}

export default new HelpOrderController();
