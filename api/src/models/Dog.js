const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false // unique: true || false ---> not repeat 
    },
    img: {
      type: DataTypes.STRING, /// ''
      allowNull: true
    },
    minHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minLifeExp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxLifeExp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
