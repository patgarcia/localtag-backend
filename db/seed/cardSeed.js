const Card = require('../../models/card')
const Location = require('../../models/location') 
const Image = require('../../models/image') 
const User = require('../../models/user')

let locations;

(async () => {
    await require('./locationSeed')
    await require('./imagesSeed')
    await require('./users.js')
    locations = await Location.find().then(doc => doc)
})()



// const images = Image.find().then(doc => doc)
// const users = User.find().then(doc => doc)


// locations.forEach((locale, key) => {
//     Card.create({
//         image: images[images.length%key].hq_image_url,
//         owner: users[users.length%key],
//         location: locale,
//         vote_tally: 0,
//         represents_collection: false,
//         collectionID: key
//     })
// })

console.log("THIS IS THE LOCATIoNS", locations)