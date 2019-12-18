import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class StudentHelpController {
  /**
   * Busca por id de Aluno
   */
  async index(req, res) {
    // Verifica se existe o aluno
    const student = await Student.findByPk(req.params.id);

    // const { page = 1 } = req.query;		

    if (!student) {
      return res.status(400).json({ error: 'O id do aluno não existe.' });
    }

    // Faz a pesquisa
    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id: req.params.id,
      },
      order: [['created_at', 'DESC']],			
      attributes: ['id', 'student_id', 'question', 'answer', 'created_at', 'updated_at'],
      // limit: 5,
      // offset: (page - 1) * 5,
    });

    return res.json(helpOrder);
  }

  /**
   * Respondendo para o Aluno
   */
  async store(req, res) {
    // Verifica se existe o id
    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Esse id não existe' });
    }

    // Armazena a reposta da academia para o aluno
    const {
      id,
      student_id,
      question,
      answer,
      answer_at,
    } = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const { student } = helpOrder;

    // Disparando o email através de fila
    await Queue.add(HelpOrderMail.key, {
      helpOrder,
      student,
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });
  }
}

export default new StudentHelpController();
