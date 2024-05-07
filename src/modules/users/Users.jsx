import { useEffect, useState } from 'react';
import UsersTable from './components/Users.Table';
import { getAgenciesUsers } from './Users.handlers';

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Name', uid: 'name', sortable: true },
  { name: 'AGENCY', uid: 'travelOffice', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'ACTIONS', uid: 'actions' }
];

const Users = () => {
  const [users, SetUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    getAgenciesUsers(SetUsers, setIsLoading);
  };

  useEffect(() => {
    getAgenciesUsers(SetUsers, setIsLoading);
  }, []);

  return (
    // ? we may take the container as a component.
    <div className="m-5 p-5 rounded-lg bg-white ">
      <UsersTable
        users={users}
        columns={columns}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Users;
