module.exports = {
  apps: [
    {
      name: 'kotamobil-api',
      script: './dist/index.js',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-215-48-201.ap-southeast-1.compute.amazonaws.com',
      key: '~/.ssh/kota-mobil-api-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:amuliawijaya23/kotamobil-api.git',
      path: '/home/ubuntu/kotamobil-api',
      'post-deploy':
        'npm install && npm run build &&  pm2 startOrRestart ecosystem.config.js',
    },
  },
};
