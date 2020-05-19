import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  helper_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'helper_id' })
  helper: User;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  place: string;

  @Column('text')
  details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
