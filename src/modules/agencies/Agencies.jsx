import { useEffect, useState } from "react";
import AgenciesTable from "./components/Agencies.Table";
import { getAgencies } from "./Agencies.handlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { instance } from "../../network/axios";

// import withPageRequiredAuth from "../auth/context/with-page-required-auth";
// import { RoleEnum } from "../../enums/role-enum";

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
  // const [agencies, SetAgencies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    // getAgencies(SetAgencies, setIsLoading);
  };

  // useEffect(() => {
  //   getAgencies(SetAgencies, setIsLoading);
  // }, []);

  const {
    data: agencies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      const cookie = Cookies.get("auth-token-data");
      const token = JSON.parse(cookie ? cookie : "null")?.token;
      const { data, status } = await instance.get("/api/v1/travel-offices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("hmmmmmm", data);
      if (status !== 200) {
        return [];
      }
      return data;
    },
  });

  return (
    // ? we may take the container as a component.
    <div className="m-5 mt-1 p-5 rounded-lg bg-white ">
      <AgenciesTable
        users={agencies || []}
        columns={columns}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Agencies;
