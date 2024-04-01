const { app } = require('@azure/functions');
const { ObjectId } = require('mongodb');

app.http('create-review', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json();
        const reviews = require('../client').reviews;
        const movies = require('../client').movies;

        body.movieId = body.movieId ?? '';
        body.rating = Number(body.rating);

        if (isNaN(body.rating) || body.rating < 1 || body.rating > 10) return { status: 400, body: 'Invalid rating' };

        const review = {
            title: String(body.title ?? 'A well-constructed review'),
            contents: String(body.contents ?? ''),
            rating: body.rating,
        };

        const res = await movies.findOneAndUpdate({ _id: body.movieId }, {
            $push: {
                reviews: review
            },
            $set: {
                dirty: true,
            }
        });

        if (!res) return { status: 400, body: 'Invalid movie' };
    }
});
