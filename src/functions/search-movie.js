const { app } = require('@azure/functions');

app.http('search-movie', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const movies = require('../client').movies;
        const reviews = require('../client').reviews;

        const count = await movies.countDocuments();

        let els = (await movies.find({
            name: { $regex: request.query.get('s') ?? '' }
        }).toArray());
        els = els.map(v => ({
            id: v._id,
            name: v.name,
            genre: v.genre,
            description: v.description,
            year: v.year,
            producer: v.producer,
            actors: v.actors,
            rating: v.rating,
            reviews: v.reviews,
        }))

        return { jsonBody: els };
    }
});
