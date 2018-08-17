let mongoose = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds123852.mlab.com:23852/building-an-api', { useNewUrlParser: true })
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));