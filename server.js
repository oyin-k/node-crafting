let app = require('./practice');
let port = process.env.port || 3000;

let server = app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});