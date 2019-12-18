import Mail from '../../lib/Mail';

class HelpOrderMail {
  // Devolve uma chave única
  get key() {
    return 'HelpOrderMail';
  }

  // Envio do e-mail
  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student.name} <${data.student.email}>`,
      subject: 'Academia GymPoint',
      template: 'helporder',
      context: {
        name: data.student.name,
        question: data.helpOrder.question,
        answer: data.helpOrder.answer,
      },
    });
  }
}

export default new HelpOrderMail();
