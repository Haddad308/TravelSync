/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import FinanceTable from "../components/FinanceTable";
import { getAccounts, getTransactions } from "../Finance.handlers";
import AccountDetails from "../components/AccountDetails";
import useAuthTokens from "../../auth/context/use-auth-tokens";

const UserAccount = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState([]);
  const [transition, setTransition] = useState([]);
  const tokenObj = useAuthTokens();

  const token = tokenObj.tokensInfoRef.current.token;
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  useEffect(() => {
    getAccounts(setAccount, setIsLoading, id, false, token);
    getTransactions(setTransition, setIsLoading, id, token);
  }, [id, token]);


  const handlechange = () => {
    getAccounts(setAccount, setIsLoading, id, false, token);
    getTransactions(setTransition, setIsLoading, id, token);
  }

  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <ClockLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        <>

          <AccountDetails account={account} isAdmin={true} />
          <div className="m-6 p-6 bg-white rounded-3xl">
            <h1 className="text-xl font-bold mb-4">Last Transactions</h1>
            <FinanceTable users={transition} isLoading={isLoading} handlechange={handlechange} isAdmin={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccount;
