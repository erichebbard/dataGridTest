export const sqlConfig = {
    server: '173.248.150.144',
    database: 'ERPEdge',
    user: 'admin',
    password: 'SurfAndTurf',
    port: 1533,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 6000
    },
    options: {
      encrypt: false, // Use this option if your SQL Server requires an encrypted connection
    },
  };