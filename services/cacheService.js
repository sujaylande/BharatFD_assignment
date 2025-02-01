const {client} = require('../config/redis.js');

exports.getCache = async (key) => {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
};

exports.setCache = async (key, value, expiry = 3600) => {
  try {
    await client.set(key, JSON.stringify(value), { EX: expiry }); //expiry in 60 minutes
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};
