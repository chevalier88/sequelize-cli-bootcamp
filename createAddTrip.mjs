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

if (process.argv[2] === 'add-attrac') {
  // getting tripId first for later insert into attractions table
  const getTripIDAddAttraction = async () => {
    try {
      const tripResponse = await db.Trip.findOne({
        where: {
          name: process.argv[3],
        },
      });

      if (tripResponse === null) {
        throw 'this trip does not exist';
      }

      const tripId = tripResponse.id;
      console.log(`type of tripId: ${typeof tripId}`);
      console.log(`tripId: ${tripId}`);

      db.Attraction.create({
        name: process.argv[4],
        trip_id: tripId,
      });
    // catch errors thrown by client.query
    } catch (error) {
      console.log(error);
    }
  };
  getTripIDAddAttraction();
}

if (process.argv[2] === 'trip') {
  // getting tripId first for later insert into attractions table
  const getTripIdAllAttractions = async () => {
    try {
      const tripResponse = await db.Trip.findOne({
        where: {
          name: process.argv[3],
        },
      });

      if (tripResponse === null) {
        throw 'this trip does not exist';
      }

      const tripId = tripResponse.id;
      console.log(`tripId: ${tripId}`);

      const getAttractionsByTripID = await
      db.Attraction.findAll({
        where: {
          trip_id: tripId,
        },
      });
      console.log('getting all attractions by trip_id...');
      // at Zaver's suggestion - why does this work so well??
      console.log(getAttractionsByTripID.map((result) => result.name));
    // catch errors thrown by client.query
    } catch (error) {
      console.log(error);
    }
  };
  getTripIdAllAttractions();
}
