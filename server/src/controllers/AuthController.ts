import { Request, Response } from 'express'

import { getRepository, Repository } from 'typeorm';

import User from '../models/User';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default {
    async authenticate(req: Request, res: Response) {
        const userRepository = getRepository(User)

        const { email, password } = req.body

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.sendStatus(401)
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.sendStatus(401)
        }

        const secret = process.env.SECRET as string

        const token = jwt.sign({ id: user.id, profile: 'rafael' }, secret, { expiresIn: '1d' });

        delete user.password;

        return res.status(200).json({
            user,
            token
        });
    }
}