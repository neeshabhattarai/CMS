const { Sequelize } = require("sequelize");
const sequelize = require("./database");

const Product = sequelize.define("products", {
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  product_name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  product_desc: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM("Draft", "Published", "Archived"),
    defaultValue: "Draft"
  },
  created_by: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_by: {
    type: Sequelize.STRING(50)
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false 
});

module.exports = Product;
