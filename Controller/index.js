require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const session = require("express-session")
const path = require('path')

const fileUpload = require('express-fileupload')

const app = new express();