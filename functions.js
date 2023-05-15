import machinesData from './database/machinesData.js';

// Functions to be used in the app

// Fake all data fetcher, act as a database
const fetchData = () => {
  const res = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(machinesData);
    }, 1000);
  });

  return res;
};

export { fetchData };
