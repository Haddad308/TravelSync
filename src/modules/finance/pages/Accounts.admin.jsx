import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import { getAccounts } from "../Finance.handlers";
import useAuthTokens from "../../auth/context/use-auth-tokens";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [, setIsLoading] = useState(false);
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;
  // ! We need to add loader here to the page. 

  useEffect(() => {
    getAccounts(setAccounts, setIsLoading, "", false, token);
  }, [token]);

  return (
    <div>
      <div className="m-6 bg-white rounded-3xl">
        <div className="p-4">
          <div className="flex flex-col justify-between  px-1">
            <h1 className="font-bold">Users Balance</h1>
            <div className="w-full md:w-72 mt-3">
              <Input
                label="Search"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {accounts.map(({ id, travelOffice, currentBalance }) => {
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
    </div>
  );
}
