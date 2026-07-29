module.exports = {
  apps: [
    {
      name: 'smarthome-backend',
      script: 'server.js',
      cwd: '/opt/smarthome/backend',
      instances: 1,
      autorestart: true,
      max_memory_restart: '300M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
    {
      name: 'virtual-esp32',
      script: 'simulator.js',
      cwd: '/opt/smarthome/backend',
      instances: 1,
      autorestart: true,
      max_memory_restart: '100M',
      env_production: {
        SIMULATOR_MODE: 'mqtt',
        IOT_DEVICE_CLIENT_ID: 'YoloUNODevice',
      },
    },
  ],
};
