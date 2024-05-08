import { instance } from '../../network/axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const deleted = () => toast.success('The agency deleted successfully.');
const added = () => toast.success('The agency added successfully.');
const edited = () => toast.success('The agency edited successfully.');

const token = Cookies.get('userToken');

async function getUsers(SetUsers, setIsLoading) {
  setIsLoading(true);
  let data = await instance
    .get('/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });

  if (data?.status === 200) {
    SetUsers(data.data.data);
    setIsLoading(false);
  }
}

async function getAgenciesUsers(SetUsers, setIsLoading) {
  setIsLoading(true);
  // let filters = {
  //   filters: {
  //     roles: [{ id: 1 }],
  //   },
  // };
  // let queryString = Object.keys(filters)
  //   .map((key) => key + '=' + filters[key])
  //   .join('&');
  let url = '/api/v1/users?filters=%7B%22roles%22%3A%5B%7B%22id%22%3A4%7D%5D%7D';
  let data = await instance
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });

  if (data?.status === 200) {
    console.log(data.data.data, 'heeeeeere');
    SetUsers(data.data.data);
    setIsLoading(false);
  }
}

async function DeleteUser(id, callback) {
  let data = await instance
    .delete(`/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      console.error(error.message);
    });

  console.log(data);

  if (data?.status === 204) {
    deleted();
    callback();
  }
}

async function addUser(values, setIsLoading, callback) {
  console.log(values);
  // Set loading state to true
  setIsLoading(true);
  values['role'] = { id: 4 };

  try {
    // Make POST request to add a user
    await instance.post('/api/v1/users', values, {
      headers: {
        Authorization: 'Bearer ' + token // Include bearer token in the header
      }
    });
    callback();
    added();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error.response.data?.message);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}

async function editUser(values, id, setIsLoading, callback) {
  // Set loading state to true
  setIsLoading(true);

  try {
    // Make POST request to add a user
    await instance.patch(`http://localhost:3000/api/v1/users/${id}`, values, {
      headers: {
        Authorization: 'Bearer ' + token // Include bearer token in the header
      }
    });
    // If successful, clear API error and log success message
    callback();
    edited();
  } catch (error) {
    // If error occurs, log error response data, set API error state, and throw the error
    console.error(error);
    throw error; // Throw the error for further handling if needed
  } finally {
    // Set loading state to false regardless of success or failure
    setIsLoading(false);
  }
}

export { getUsers, DeleteUser, addUser, editUser, getAgenciesUsers };
