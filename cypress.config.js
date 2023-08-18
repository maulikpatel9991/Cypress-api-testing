module.exports = {
  "reporter": "mochawesome",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Maulik-Patel',
  },
  env:{
    "url":"https://gorest.co.in/",
    "gender":"male",
    "status":"active",
    "token":""
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
