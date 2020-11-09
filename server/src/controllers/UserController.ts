import { Request, Response } from 'express'

import { getRepository, Repository } from 'typeorm';

import User from '../models/User';

export default {
    async store(req: Request, res: Response) {
        const userRepository = getRepository(User)

        const { email, password } = req.body

        const userExists = await userRepository.findOne({ where: { email } })

        if (userExists) {
            res.sendStatus(409);
        }

        const user = userRepository.create({
            email,
            password
        })

        await userRepository.save(user)

        res.status(200).json(await userRepository.find());
    }
}