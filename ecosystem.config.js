module.exports = {
  apps: [
    {
      script: "bin/www",
      instances: 16,
      watch: ".",
    },
  ],
  deploy: {
    production: {},
  },
};
