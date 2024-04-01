const { app } = require('@azure/functions');

app.http('reset-ratings', {
    methods: [ 'GET' ],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const movies = require('../client').movies;
        
        context.log("Updating ratings...");

        // await movies.updateMany({}, [
        //     { $set: { rating: { $avg: "$reviews.rating" } } }
        // ])

        // Bad code but the above isn't supported :(
        const res = await movies.updateMany({ }, { $set: { rating: 0, dirty: true } });
        // for (const movie of await .toArray()) {
        //     await movies.updateOne({ _id: movie._id }, { $set: { rating: movie.rating } });
        // }

        context.log("Updated ratings!");
    }
});
