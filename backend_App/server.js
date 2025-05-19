const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentRoutes = require('./apis/student');

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads')); // Serve uploaded images


app.use('/api', studentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});