import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  helper: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  place: string;

  @Column('text')
  details: string;
}

export default Appointment;
