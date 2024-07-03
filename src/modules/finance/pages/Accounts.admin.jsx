import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import { getAccounts } from "../Finance.handlers";
import useAuthTokens from "../../auth/context/use-auth-tokens";
import { useQuery } from "@tanstack/react-query";
import { ClockLoader } from "react-spinners";

export default function Accounts() {
  // const [accounts, setAccounts] = useState([]);
  // const [, setIsLoading] = useState(false);
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;
  // ! We need to add loader here to the page.

  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["finance"],
    queryFn: async () => {
      const { data, status } = await instance.get(
        `/api/${false ? "v1/travel-offices/account" : "accounts"}${id ? `/${id}` : " "}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (status === 200) {
        console.log("accounts data:", data);

        return data;
      }
      console.log("accounts data:", data);
      return data;
    },
  });

  // useEffect(() => {
  //   getAccounts(setAccounts, setIsLoading, "", false, token);
  // }, [token]);

  return (
    <div>
      <div className="m-6 bg-white rounded-3xl">
        <div className="p-4">
          <div className="flex flex-col justify-between  px-1">
            <h1 className="font-bold">Users Balance</h1>
            <div className="w-full md:w-72 mt-3">
              <Input label="Search" />
            </div>
          </div>
          {isLoading ? (
            <ClockLoader color="primary" size={50} />
          ) : (
            <div className="grid grid-cols-3 mt-5 gap-5">
              {accounts &&
                accounts.map(({ id, travelOffice, currentBalance }) => {
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
          )}
        </div>
      </div>
    </div>
  );
}
