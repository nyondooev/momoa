const Sequelize = require('sequelize');
const config = require('../config/config.js')['development'];
// const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
module.exports = db;

db.Info = require('./Info')(sequelize, Sequelize);
module.exports = db;

db.Sheet = require('./Sheet')(sequelize, Sequelize);
module.exports = db;

db.DBhub = require('./DBhub')(sequelize, Sequelize);
module.exports = db;

// db.User.hasMany(db.Sheet, {
//   foreignKey: 'user_email', //Sheet 테이블에있는 거
//   sourceKey: 'user_email', //User테이블에있는 user_id
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

//user테이블하고 sheet테이블의 관계설정

db.User.hasMany(db.DBhub, {
  foreignKey: 'user_email', //Sheet 테이블에있는 거
  sourceKey: 'user_email', //User테이블에있는 user_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.DBhub.belongsTo(db.User, {
  foreignKey: 'user_email', // sheet테이블의 foreignkey
  targetKey: 'user_email', // user테이블의 user_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

//sheet테이블하고 info테이블의 관계설정

db.Sheet.hasMany(db.Info, {
  foreignKey: 'sheet_id', //Info 테이블에있는 거
  sourceKey: 'sheet_id', //Sheet테이블에있는 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.Info.belongsTo(db.Sheet, {
  foreignKey: 'sheet_id', // info테이블의 foreignkey
  targetKey: 'sheet_id', // sheet테이블의 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.Sheet.hasMany(db.DBhub, {
  foreignKey: 'sheet_id', //Info 테이블에있는 거
  sourceKey: 'sheet_id', //Sheet테이블에있는 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.DBhub.belongsTo(db.Sheet, {
  foreignKey: 'sheet_id', // DBhubo테이블의 foreignkey
  targetKey: 'sheet_id', // sheet테이블의 sheet_id
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
