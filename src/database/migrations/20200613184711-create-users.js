module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // não terá usuario sem nome
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, //  não poderá haver email repetido
      },
      password_hash: {
        type: Sequelize.STRING, // quando o usuario cadastrar a senha, ela será armazenada em forma de criptografia - hash
        allowNull: false,
      },
      provider: {
        /* O usuario pode ser tanto cliente quanto prestador de serviços, quando ele for o cliente
        o provider será false quando for prestador será true, por padrão todo usuario será um cliente */
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        // esses dois próximos são campos que irão armazenar data de criação e edição de cada registro
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
