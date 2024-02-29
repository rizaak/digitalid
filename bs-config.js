// "IMPORTANT: THIS FILE IS GENERATED, CHANGES SHOULD BE MADE WITHIN '@okta/generator'"

module.exports = {
  port: process.env.PORT || 8080,
  logLevel: 'silent',
  files: ['./lib/**/*.{html,htm,css,js}'],
  server: { 
    baseDir: './lib',
    middleware: {
      0: null
    }
  },
  open: false
};
