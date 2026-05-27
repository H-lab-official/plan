module.exports = {
  apps: [{
    name: '4eve-zones',
    script: 'server/dist/index.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};
