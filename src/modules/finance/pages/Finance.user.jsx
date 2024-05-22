import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import FinanceTable from "../components/FinanceTable";
import { getAccounts, getTransactions } from "../Finance.handlers";
import AccountDetails from "../components/AccountDetails";
import useAuthTokens from "../../auth/context/use-auth-tokens";

const UserAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingT, setIsLoadingT] = useState(false);
  const [account, setAccount] = useState([]);
  const [transition, setTransition] = useState([]);
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;


  useEffect(() => {
    getAccounts(setAccount, setIsLoading, "", true, token);
    getTransactions(setTransition, setIsLoadingT, "", token);
  }, [token]);


  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <ClockLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        <>
          <AccountDetails account={account} isAdmin={false} />
          <div className="m-6 p-6 bg-white rounded-3xl">
            <h1 className="text-xl font-bold mb-4">Last Transactions</h1>
            <FinanceTable users={transition} isLoading={isLoadingT} isAdmin={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccount;
