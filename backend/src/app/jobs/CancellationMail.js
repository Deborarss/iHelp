import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    // console.log('A fila executou');

    await Mail.sendEmail({
      to: `${appointment.helper.name} <${appointment.helper.email}>`,
      subject: 'Cancelamento de ajuda',
      template: 'cancellation',
      context: {
        helper: appointment.helper.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
