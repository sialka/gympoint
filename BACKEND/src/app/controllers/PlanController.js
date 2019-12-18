import * as Yup from 'yup';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class PlanController {
  // List Plans
  async index(req, res) {
    if (req.query.page == undefined) {
      const plans = await Plan.findAll();

      return res.json(plans);
    }

    const { page } = req.query;
    const plans = await Plan.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      order: [['title', 'ASC']],
    });

    return res.json(plans);
  }

  // Add Plan
  async store(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados' });
    }

    // Verify exists plan
    const existPlans = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (existPlans) {
      return res.status(401).json({ error: 'O plano não existe' });
    }

    // Create plan
    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    // Validação de dados
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados' });
    }

    // Existe o plano
    const existPlans = await Plan.findByPk(req.params.id);

    if (!existPlans) {
      return res.status(401).json({ error: 'O plano não existe' });
    }

    // Atualiza
    const { title, duration, price } = await existPlans.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    // Existe o plano
    const existPlans = await Plan.findByPk(req.params.id);

    if (!existPlans) {
      return res.status(401).json({ error: 'O Plano não existe' });
    }

    // Localizando matricula com esse aluno
    const enrollment = await Enrollment.findAll({
      where: { plan_id: req.params.id },
    });

    if (enrollment.length) {
      return res.status(401).json({ error: 'O plano está sendo usado na matricula' });
    }

    const result = await Plan.destroy({
      where: { id: req.params.id },
      truncate: false,
    });

    if (!result) {
      return res.status(401).json({ error: 'Não foi possivel' });
    }

    return res.send();
  }
}

export default new PlanController();
