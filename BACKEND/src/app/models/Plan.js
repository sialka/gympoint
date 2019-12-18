import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.STRING,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plan;
