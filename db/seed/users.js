const User = require('../../models/user');
const usersData = require('./users.json');

const seedUsers = async () => {
    await User.deleteMany({});

    const ans = await Promise.all(
        usersData.map(async user => {
            const u = new User(user);
            return u.save();
        })
    ).then(docs => docs);

    return ans;
};

if (require.main === module) {
    seedUsers()
        .then(docs => console.log('INSIDE USERS', docs))
        .finally(() => process.exit());
} else {
    module.exports = seedUsers;
}
