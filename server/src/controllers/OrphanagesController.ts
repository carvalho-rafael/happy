import { request, Request, Response } from 'express'

import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanages';
import User from '../models/User';
import OrphanagesView from '../views/OrphanagesView'

import * as yup from 'yup';

export default {
    async index(req: Request, res: Response) {
        const userId = req.userId
        const orphanagesRepository = getRepository(Orphanage);

        const userRepository = getRepository(User)
        const user = await userRepository.findOneOrFail(userId)
        let orphanages;
        if (!user.is_admin) {
            orphanages = await orphanagesRepository.find({
                where: {
                    is_visible: true
                },
                relations: ['images']
            });
        } else {
            orphanages = await orphanagesRepository.find({
                relations: ['images']
            });

        }
        res.status(200).json(OrphanagesView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(
            id,
            {
                relations: ['images']
            });

        res.status(200).json(OrphanagesView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }
        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.boolean().required(),
            images: yup.array(
                yup.object().shape({
                    path: yup.string().required()
                })
            )
        });
        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data)
        const result = await orphanagesRepository.save(orphanage)

        return res.status(201).json(result)
    },

    async setVisibility(req: Request, res: Response) {
        const { id } = req.params;
        const is_visible = req.body.is_visible
        const userId = req.userId

        const userRepository = getRepository(User)
        const user = await userRepository.findOneOrFail(userId)
        if (!user.is_admin) {
            return res.sendStatus(403)
        }

        const orphanagesRepository = getRepository(Orphanage);
        await orphanagesRepository.update(id, { is_visible: is_visible })

        return res.sendStatus(204)

    }
}