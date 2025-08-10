module.exports = {
  apps: [{
    name: 'NAVCODE-Rhythm',
    script: 'bun',
    args: 'run src/index.ts',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    out_file: './logs/bot-out-0.log',
    error_file: './logs/bot-error-0.log',
    log_file: './logs/bot-0.log',
    merge_logs: true,
    time: true
  }]
};
