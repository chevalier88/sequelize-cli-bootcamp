// import the object we created with everything in it from index.mjs
import db from './models/index.mjs';

// a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database).
//  Although a model is a class, you should not create instances by using the new operator directly. Sequelize provides the create method for this
// https://sequelize.org/master/manual/model-instances.html

if (process.argv[2] === 'create') {
  db.Trip.create({
    name: process.argv[3],
  })
    .then((trip) => {
      console.log('success!');
      console.log(trip);
    })
    .catch((error) => console.log(error));
}
