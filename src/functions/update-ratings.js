const { app } = require('@azure/functions');

app.timer('update-ratings', {
    schedule: '0 30 11 * * *',
    handler: async (myTimer, context) => {
        const movies = require('../client').movies;
        
        context.log("Updating ratings...");

        // await movies.updateMany({}, [
        //     { $set: { rating: { $avg: "$reviews.rating" } } }
        // ])

        // Bad code but the above isn't supported :(
        const res = await movies.aggregate([
            { $match: { dirty: true } },
            { $project: { rating: { $avg: "$reviews.rating" } } }
        ]).toArray();

        for (const movie of res) {
            await movies.updateOne({ _id: movie._id }, { $set: { rating: res.rating, dirty: false } });
        }

        context.log("Updated ratings!");
    }
});
