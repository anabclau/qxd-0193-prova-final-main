import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Project } from './entity/Project';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User, Project],
    migrations: [],
    subscribers: [],
});
