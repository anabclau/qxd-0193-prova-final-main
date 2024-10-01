import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Project } from '../entity/Project';
import { User } from '../entity/User';

const validateProjectData = (data: any) => {
    const errors = [];

    if (!data.name || data.name.length < 3 || data.name.length > 100) {
        errors.push('O nome do projeto deve ter entre 3 e 100 caracteres.');
    }

    if (!data.description || data.description.length < 10 || data.description.length > 500) {
        errors.push('A descrição do projeto deve ter entre 10 e 500 caracteres.');
    }

    if (data.progress < 0 || data.progress > 100) {
        errors.push('O progresso deve ser um valor entre 0 e 100.');
    }

    return errors;
};

export const listProjects = async (req: Request, res: Response) => {
    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository.find({ relations: ['user'] });
    res.json({ data: projects });
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    const projectRepository = AppDataSource.getRepository(Project);
    const userRepository = AppDataSource.getRepository(User);

    const errors = validateProjectData(req.body);
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const user = await userRepository.findOneBy({ id: req.body.userId });
    if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
    }

    const project = new Project();
    project.name = req.body.name;
    project.description = req.body.description;
    project.progress = req.body.progress;
    project.user = user;

    await projectRepository.save(project);
    res.status(201).json({ data: project });
};

export const removeProject = async (req: Request, res: Response): Promise<void> => {
    const projectId = parseInt(req.params.id, 10);
    const projectRepository = AppDataSource.getRepository(Project);
    
    const project = await projectRepository.findOneBy({ id: projectId });
    if (!project) {
        res.status(404).json({ error: 'Projeto não encontrado.' });
        return;
    }

    await projectRepository.remove(project);
    res.status(204).send(); 
};

export const getProjectsByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id, 10);

    const projectRepository = AppDataSource.getRepository(Project);

    const projects = await projectRepository.find({
        where: { user: { id: userId } },
        relations: ['user']
    });

    if (projects.length === 0) {
        res.status(404).json({ error: 'Nenhum projeto encontrado para este usuário.' });
        return;
    }

    res.json({ data: projects });
};

