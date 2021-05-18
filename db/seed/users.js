const User = require('../../models/user');
const usersData = require('./users.json');

User.deleteMany({});

usersData.forEach(user => {
    const {display_name, email, password} = user;
    console.log({display_name, email, password});
    User.create({display_name, email, password})
    .then(doc => console.log(doc))
    .catch(console.error)
});
