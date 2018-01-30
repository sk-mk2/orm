const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database.sqlite'
});

const Project = sequelize.define('project', {
      title: Sequelize.STRING,
        description: Sequelize.TEXT
});

const Task = sequelize.define('task', {
      title: Sequelize.STRING,
        description: Sequelize.TEXT,
          deadline: Sequelize.DATE
});

(async ()=>{
    await sequelize.authenticate().catch(err=>{
        console.error('Unable to connect to the database:', err);
    });
    console.log('Connection has been established successfully.');
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    });
    const Source = sequelize.define('source', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    });
    User.hasMany(Source);
    Source.belongsTo(User);
    await sequelize.sync();
    await User.sync({force: true});
    await User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
    await User.create({
        firstName: 'John',
        lastName: 'Bonjovi'
    });
    await Source.sync({force: true});
    await Source.create({
        fileName: 'a.c',
        userId: 1
    });
    await Source.create({
        fileName: 'b.c',
        userId: 2
    });
    const users = await User.findAll({include:[Source]});
    console.log(JSON.stringify(users));
    /*const user  =  await User.findOne({ where: {firstName: 'John'}});
    console.log(user);*/
})();




