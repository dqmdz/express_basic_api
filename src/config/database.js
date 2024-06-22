import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const isTest = process.env.NODE_ENV === 'test';
const storage = isTest ? ':memory:' : process.env.FILENAME || 'database.sqlite';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage
});
