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

// create a fake api call via axios library to the promise function fetchData
const fetchDataWithAxios = await axios
.get('https://jsonplaceholder.typicode.com/todos/1')
.then((_response) => {
  return fetchData();
})
.then((data) => {
  return data;
})
.catch((error) => {
  console.log('error', error);
});
export { fetchData, fetchDataWithAxios  };


