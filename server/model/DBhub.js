const DBhub = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'DBhub',
    {
      data_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      sheet_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      auth: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },

      guest: {
        type: DataTypes.STRING(50),
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      tableName: 'DBhub',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = DBhub;
