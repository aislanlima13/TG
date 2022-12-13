const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb+srv://clamp-deploy:deploy_clamp_tg2@cluster0.acj8e.mongodb.net/clamp?retryWrites=true&w=majority',
    {useNewUrlParser: true}, 5000);
} catch(err) {
    console.log(err);
}


mongoose.Promise = global.Promise;

module.exports = mongoose;