import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  helper: string;

  date: Date;

  place: string;

  details: string;

  constructor({ helper, date, place, details }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.helper = helper;
    this.date = date;
    this.place = place;
    this.details = details;
  }
}

export default Appointment;
