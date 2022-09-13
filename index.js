const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');
const analyticRoutes = require('./routes/analytic');
const keys = require('./config/keys')

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('success connect mongo db'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/category', categoryRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'working'
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist/client'))

    app.get('*', (req,res) => {
      res.sendFile(
        path.resolve(
            __dirname, 'client', 'dist', 'client', 'index.html'
        )
      )
    })
}


app.listen(port,() => console.log(`Server started on port: ${port}`));




