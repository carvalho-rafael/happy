import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import Image from './Images';
import  bcrypt from 'bcryptjs'

@Entity('users')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_admin: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

}