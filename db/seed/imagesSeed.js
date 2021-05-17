const Image = require("../../models/image");
const seedData = require("./images.json");

// clears collection and adds data
Image.deleteMany({})
  .then(() => {
    return Image.insertMany(seedData);
  })
  .then(console.log) // if successful
  .catch(console.error) // if there is an error
  .finally(() => {
    process.exit();
  });
