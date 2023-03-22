const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'User',
    {
      user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },

      user_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: null,
      },

      user_pw: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },

      refresh_token: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },

      isKakao: {
        type: DataTypes.STRING(5),
        allownull: true,
        defaultValue: null,
      },
    },
    {
      tableName: 'User',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
