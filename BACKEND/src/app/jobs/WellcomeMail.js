import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WellcomeMail {
  // Devolve uma chave única
  get key() {
    return 'WellcomeMail';
  }

  // Envio do e-mail
  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.student.name} <${data.student.email}>`,
      subject: 'Academia GymPoint',
      template: 'wellcome',
      context: {
        student: data.student.name,
        plan: data.plan.title,
        enddate: format(
          parseISO(data.enrollment.end_date),
          "'dia' dd 'de' MMMM' de 'yyyy'",
          {
            locale: pt,
          }
        ),
        price: data.plan.price,
      },
    });
  }
}

export default new WellcomeMail();
