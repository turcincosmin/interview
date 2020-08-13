module.exports = {
  apps: [
    {
      script: "bin/www",
      instances: 4,
      watch: ".",
    },
  ],
  deploy: {
    production: {},
  },
};
