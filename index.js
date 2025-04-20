const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const dotenv = require('dotenv')
// const path = require('path')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const compression = require('compression')
// const rateLimit = require('express-rate-limit')
// const xss = require('xss-clean')
// const hpp = require('hpp')
// const cookieParser = require('cookie-parser')
// const mongoSanitize = require('express-mongo-sanitize') //Làm sạch input chứa cú pháp MongoDB độc hại (`$`, `.`) – ngăn tấn công NoSQL Injection.
// const { createClient } = require('redis')
// const { Client } = require('pg')
// const { Pool } = require('pg')
// const { PrismaClient } = require('@prisma/client')
// const { createServer } = require('http')
// const { Server } = require('socket.io')
// const { createTransport } = require('nodemailer')
// const { v4: uuidv4 } = require('uuid')
// const { nanoid } = require('nanoid')
// const { createHash } = require('crypto')
const {PORT, corsOptions} = require('./src/utils/config')
const { connectDB } = require('./src/config/db')
const registerRoutes = require('./src/utils/routers'); 

connectDB();
const app = express(); 
app.use(cors(corsOptions));
app.use(express.json());
registerRoutes(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));