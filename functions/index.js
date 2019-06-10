const functions = require('firebase-functions');
var Mta = require('mta-gtfs');
var mta = new Mta({
    key: 'ad8e9ea7b72089fe0ee8d43a747754a1', // only needed for mta.schedule() method
    feed_id: 1                  // optional, default = 1
});

exports.fetchAllStations = functions.https.onRequest((request, response) => {
    mta.stop().then(function (result) {
        const stopsArr = Object.keys(result).map(i => result[i])
        console.log("stops ARR", stopsArr);
        response.send({ data: stopsArr });
    }).catch(function (err) {
        console.log(err);
    });
});


exports.fetchStationTimes = functions.https.onRequest((request, response) => {
    const { stopId } = request.body.data
    console.log("stop id", stopId)
    mta.schedule(stopId).then(function (result) {
        console.log("train times:", result);
        response.send({ data: result })
    }).catch(err => response.send(err))
})


