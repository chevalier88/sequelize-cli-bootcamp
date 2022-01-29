import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

// import model functions here
import initTripModel from './trip.mjs';
import initAttractionModel from './attraction.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);

// this connects the one to many stuff because of the trip ID in the
db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
