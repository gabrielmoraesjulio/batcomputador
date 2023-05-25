const Sequelize = require('sequelize');
const connection = require('./database.js')

const Criminals = connection.define('criminals', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    age: {
        type: Sequelize.STRING,
        allowNull: true
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    weakness: {
        type: Sequelize.STRING,
        allowNull: true
    },

    risklevel: {
        type: Sequelize.STRING,
        allowNull: false
    },

    arrested: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Criminals.sync({force:false}).then(() => {

});

module.exports = Criminals;