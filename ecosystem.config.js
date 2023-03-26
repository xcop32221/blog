module.exports = {
  apps: [
    {
      name: 'my-next-app',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};