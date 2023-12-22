// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const userRoute = require('./routes/users');
// const authRoute = require('./routes/auth');
// const postRoute = require('./routes/posts');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');


// const url = "mongodb+srv://admin:admin123@socailmediaappdb.4kp6w8r.mongodb.net/"

// // Connect to MongoDB
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Event handlers for successful connection and error
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });


// // middlewares
// app.use(express.json());
// app.use(helmet());
// app.use(morgan('common'));
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors({ origin: 'http://localhost:19006' }));

// // Enable CORS for all routes or specify allowed origins


// app.use("/images", express.static(path.join(__dirname, "public", "images")));


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const destinationPath = path.join(__dirname, "public", "images");
//         cb(null, destinationPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.name);
//     },
// });
// const upload = multer(storage);
// app.post('/api/upload', upload.single("image"), (req, res) => {
//     try {
//         return res.status(200).json("File uploaded successfully");
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use("/api/user", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);
// app.listen(8800, () => {
//     console.log('Backend server is running! on 8800');
// });








// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const userRoute = require('./routes/users');
// const authRoute = require('./routes/auth');
// const postRoute = require('./routes/posts');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const Post = require('./models/Post');

// dotenv.config();

// const url = "mongodb+srv://admin:admin123@socailmediaappdb.4kp6w8r.mongodb.net/"

// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// app.use(express.json());
// app.use(helmet());
// app.use(morgan('common'));
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors({ origin: 'http://localhost:19006' }));

// app.use("/images", express.static(path.join(__dirname, "public", "images")));

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/api/posts/create', upload.array('images', 5), (req, res) => {
//     try {
//         const { desc, userId } = req.body;
//         const images = req.files.map(file => file.buffer);
//         const newPost = {
//             desc: desc,
//             userId: userId,
//             image: images,

//         };
//         const newpost = new Post(newPost);
//         const post = newpost.save();

//         res.status(201).json({ success: true, data: post, message: "Post created successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use("/api/user", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);

// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const eventRoute = require('./routes/events');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

dotenv.config();

const url = "mongodb+srv://admin:admin123@socailmediaappdb.4kp6w8r.mongodb.net/"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ origin: 'http://localhost:19006' }));

app.use("/images", express.static(path.join(__dirname, "public", "images")));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/posts/create', upload.array('images', 5), async (req, res) => {
    try {
        const { desc, userId } = req.body;
        const images = req.files.map(file => file.buffer);
        const newPost = {
            desc: desc,
            userId: userId,
            image: images,
        };
        const newpost = new Post(newPost);
        const post = await newpost.save(); // Make sure to use "await" here

        res.status(201).json({ success: true, data: post, message: "Post created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
