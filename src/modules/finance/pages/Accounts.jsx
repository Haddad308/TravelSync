import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import { getAccounts } from "../Finance.handlers";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    getAccounts(setAccounts, setIsLoading);
  }, []);

  return (
    <div>
      <div className="m-6 bg-white rounded-3xl">
        <div className="p-4">
          <div className="flex flex-col justify-between  px-1">
            <h1 className="font-bold">Users Balance</h1>
            <div className="w-full md:w-72 mt-3">
              <Input
                label="Search"
              // icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
