const env = {
  development: {
    name: 'development',
    port: 3000,
    db: {
    }
  },
  production: {
    name: 'production',
    port: 3000,
    db: {
    }
  }
};

const finalEnv = process.env.NODE_ENV
  ? env[process.env.NODE_ENV]
  : env.development;

export default finalEnv;
