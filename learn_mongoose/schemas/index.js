const mongoose = require('mongoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://127.0.0.1:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
    }).then(() => {
        console.log("Mongodb connect sucessfully");
    }).catch((err) => {
        console.error('Mongodb connect failed', err);
    });
};

mongoose.connection.on('error', (error) => {
    console.error('Mongodb connect error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('Mongodb connection disconnected. Please try again');
});

module.exports = connect;
