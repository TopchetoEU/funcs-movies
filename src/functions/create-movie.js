const { app } = require('@azure/functions');

app.http('create-movie', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json();
        const movies = require('../client').movies;

        const movie = {
            name: String(body.name ?? 'Untitled'),
            genre: String(body.genre ?? 'unspecified'),
            description: String(body.description ?? ''),
            year: String(body.year ?? new Date().getFullYear()),

            producer: String(body.producer ?? 'John Doe'),
            actors: (body.actors ?? []).map(String),

            reviews: [],

            rating: 0,
            dirty: false,
        };

        const res = (await movies.insertOne(movie)).insertedId;

        return { jsonBody: { id: res } };
    }
});
