'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todolist = sequelize.define('Todolist', {
    item: DataTypes.STRING,
    description: DataTypes.TEXT,
    iscompleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todolist;
};