import { useEffect, useState } from "react";
import AgenciesTable from "./components/Agencies.Table";
import { getAgencies } from "./Agencies.handlers";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PHONE", uid: "phone", sortable: true },
  { name: "ADDRESS", uid: "address" },
  { name: "CITY", uid: "city" },
  { name: "STATE", uid: "state", sortable: true },
  { name: "COUNTY", uid: "country", sortable: true },
  { name: "POSTAL_CODE", uid: "postalCode", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const Agencies = () => {
  const [agencies, SetAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    getAgencies(SetAgencies, setIsLoading);
  };

  useEffect(() => {
    getAgencies(SetAgencies, setIsLoading);
  }, []);

  return (
    // ? we may take the container as a component.
    <div className="m-5 p-5 rounded-lg bg-white ">
      <AgenciesTable
        users={agencies}
        columns={columns}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Agencies;
