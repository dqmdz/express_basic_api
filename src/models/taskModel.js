import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Task extends Model { }

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Task'
});

export default Task;
