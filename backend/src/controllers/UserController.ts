import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';

const validateUserData = (data: any) => {
    const errors = [];

    if (!data.name || data.name.length < 3 || data.name.length > 50) {
        errors.push('O nome deve ter entre 3 e 50 caracteres.');
    }

    if (!data.username || data.username.length < 3 || data.username.length > 20) {
        errors.push('O username deve ter entre 3 e 20 caracteres.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('O email deve ser um endereço válido.');
    }

    if (!data.password || data.password.length < 6) {
        errors.push('A senha deve ter pelo menos 6 caracteres.');
    }

    if (!data.role || data.role.length < 4 || data.role.length > 20) {
        errors.push('O papel deve ter entre 4 e 20 caracteres.');
    }

    return errors;
};

export const listUsers = async (req: Request, res: Response) => {
    const userRepository =  AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json({ data: users});
}


export const createUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User)
    const { name, username, email, password, role } = req.body;

    const validationErrors = validateUserData(req.body);
    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
    } else {
        try {
            const user = userRepository.create({ name, username, email, password, role });
            await userRepository.save(user);
            res.status(201).json({ data: user });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário.', error });
        }
    }

};

export const updateUser = async (req: Request, res: Response) => {
    const userRepository =  AppDataSource.getRepository(User)
    const id = Number(req.params.id);
    const { name, username, email, password } = req.body;

    if(isNaN(id)) {
        res.status(400).json({ errors: ["Id inválido"] });
    }

    const validationErrors = validateUserData(req.body);
    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
    }

    try {
        const user = await userRepository.findOneBy({id});
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        } else {

            user.name = name;
            user.username = username;
            user.email = email;
            user.password = password;
    
            await userRepository.save(user);
            res.status(200).json({ data: user });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
    }
};

