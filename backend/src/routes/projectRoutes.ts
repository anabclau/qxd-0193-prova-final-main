import { Router } from 'express';
import { listProjects, createProject, getProjectsByUserId, removeProject } from '../controllers/ProjectController';

const router = Router();

router.get('/', listProjects);
router.post('/', createProject);
router.delete('/:id', removeProject);
router.get('/:id', getProjectsByUserId);

export default router;