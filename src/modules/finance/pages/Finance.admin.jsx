import UserBalance from "../components/UserBalance";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAccounts, getTransactions } from "../Finance.handlers";
import FinanceTable from "../components/FinanceTable";
import useAuthTokens from "../../auth/context/use-auth-tokens";

export default function Finance() {
  const [accounts, setAccounts] = useState([]);
  const [transitions, setTransitions] = useState([]);
  // ! We need to add loader here to the page. 
  const [, setIsLoading] = useState(false);
  const [isLoadingT, setIsLoadingT] = useState(false);

  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;

  useEffect(() => {
    getAccounts(setAccounts, setIsLoading, "", false, token);
    getTransactions(setTransitions, setIsLoadingT, "", token);
  }, [token]);


  return (
    <div>
      <div className="m-5 mt-1 bg-white rounded-lg">
        <div className="p-4">
          <div className="flex justify-between px-1">
            <h1 className="font-bold">Users Balance</h1>
            <Link to={"/Accounts"}>
              <div className="flex items-center  transition-all duration-300 hover:text-blue-800    ">
                <h1 className="font  ">See All</h1>
                <MdKeyboardArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {accounts
              .slice(0, 3)
              .map(({ id, travelOffice, currentBalance }) => {
                return (
                  <UserBalance
                    key={id}
                    id={id}
                    AgnecyName={travelOffice?.name}
                    AgnecyEmail={travelOffice?.email}
                    AgencyBalance={currentBalance}
                    AgencyProfilePhoto={travelOffice?.profilePhoto?.imageUrl}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="m-5 p-5 bg-white rounded-lg">
        <h1 className="text-xl font-bold mb-4">Last Transactions</h1>
        <FinanceTable users={transitions} isLoading={isLoadingT} isAdmin={false} />
      </div>
    </div>
  );
}
