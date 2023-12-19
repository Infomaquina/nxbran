/** @type {import('next').NextConfig} */
require('dotenv').config();
const path = require('path')
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
