const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true });

const inventorySchema = new mongoose.Schema({
    productName: String,
    price: Number,
    piecesPerBox: Number,
    box: Number,
    total: Number,
    doa: Date,
    status: String,
    shippingMark: String,
    warehouseSlip: String,
    cbm: Number
});

const Inventory = mongoose.model('Inventory', inventorySchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', upload.single('warehouseSlip'), (req, res) => {
    const data = new Inventory({
        productName: req.body.productName,
        price: req.body.price,
        piecesPerBox: req.body.piecesPerBox,
        box: req.body.box,
        total: req.body.total,
        doa: req.body.doa,
        status: req.body.status,
        shippingMark: req.body.shippingMark,
        warehouseSlip: req.file.filename,
        cbm: req.body.cbm
    });
    data.save((err) => {
        if (err) {
            res.status(500).json({ message: 'Error saving data' });
        } else {
            res.json({ message: 'Data submitted successfully' });
        }
    });
});

app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    Inventory.find({
        $or: [
            { productName: new RegExp(query, 'i') },
            { status: new RegExp(query, 'i') },
            { shippingMark: new RegExp(query, 'i') }
        ]
    }, (err, items) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.json(items);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
