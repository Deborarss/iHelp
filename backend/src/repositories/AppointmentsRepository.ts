import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  helper: string;
  date: Date;
  place: string;
  details: string;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  public create({
    helper,
    date,
    place,
    details,
  }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ helper, date, place, details });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
