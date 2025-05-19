const express = require('express');
const db = require('../db'); 
const multer = require('multer');
const router = express.Router();
const path=require('path');

const app = express();
app.use('/uploads',express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


router.get('/students/getStudents', (req, res) => {
    db.query('SELECT * FROM student', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

router.post('/students/addStudent', upload.single('image'), (req, res) => {
    const { first_name, last_name, email, country, city, sector } = req.body;
    const imagePath = req.file ? req.file.path : null;

    db.query(
        "INSERT INTO student (first_name, last_name, email, country, city, image, sector) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, country, city, imagePath, sector],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send({ message: 'Student added successfully' });
            }
        }
    );
});

//edit student
router.get('/students/editStudent/:id_student', (req, res) => {
    const studentId = req.params.id_student;
    db.query('SELECT * FROM student WHERE id_student = ?', [studentId], (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results[0]);
    });
});

router.put('/students/updateStudent/:id_student', upload.single('image'), (req, res) => {
    const studentId = req.params.id_student;
    const { first_name, last_name, email, country, city, sector } = req.body;
    const imagePath = req.file ? req.file.path : req.body.image;

    db.query(
        "UPDATE student SET first_name = ?, last_name = ?, email = ?, country = ?, city = ?, image = ?, sector = ? WHERE id_student = ?",
        [first_name, last_name, email, country, city, imagePath, sector, studentId],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send({ message: 'Student updated successfully' });
            }
        }
    );
});
//delete student
router.delete('/students/deleteStudent/:id_student', (req, res) => {
    const studentId = req.params.id_student;
    db.query('DELETE FROM student WHERE id_student = ?', [studentId], (err) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({ message: 'Student deleted successfully' });
    });
});
//search  
router.get('/students/searchStudents', (req, res) => {
    const { name = '', country = '' } = req.query;

    // Split countries into an array
    const countriesArray = country ? country.split(',') : [];

    // Build the SQL query dynamically
    let query = 'SELECT * FROM student WHERE 1=1';
    const queryParams = [];

    if (name) {
        query += ' AND (first_name LIKE ? OR last_name LIKE ?)';
        queryParams.push(`%${name}%`, `%${name}%`);
    }

    if (countriesArray.length > 0) {
        query += ` AND country IN (${countriesArray.map(() => '?').join(',')})`;
        queryParams.push(...countriesArray);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});
module.exports = router;