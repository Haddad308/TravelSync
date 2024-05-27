import { Avatar } from "@nextui-org/react";

const AccountDetails = ({ account, isAdmin }) => {
  // !Note: order is very important here. If isAdmin is true, then account will be travelOffice, else account will be user
  const balance = isAdmin
    ? account?.currentBalance
    : account?.account?.currentBalance;
  account = isAdmin ? account?.travelOffice : account;

  return (
    <div className=" flex flex-col mb-4 rounded-3xl border-grey border-2 justify-center">
      <div className="text-black flex justify-evenly items-center p-4">
        <div className="flex items-center justify-center ">
          <Avatar
            isBordered
            color="success"
            radius="full"
            size="lg"
            src={account?.profilePhoto?.imageUrl}
          />
          <div className="flex flex-col ml-5">
            <h4 className="text-md font-semibold">{account?.name}</h4>
            <h5 className="text-md text-gray-600">{account?.email}</h5>
            <h5 className="text-md text-gray-600">{account?.phone}</h5>
          </div>
        </div>
        <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
          <span className="text-gray-600">&nbsp;</span>
        </div>
        <div>
          <h1 className="text-lg font-bold mb-2">{account?.name}</h1>
          <p className="mb-2 text-sm">Lorem ipsum dolor sit.</p>
          <p className="text-sm">{account?.name}</p>
        </div>
        <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
          <span className="text-gray-600">&nbsp;</span>
        </div>
        <div>
          <h1 className="text-lg font-bold mb-2">Lorem ipsum dolor sit.</h1>
          <p className="mb-2 text-sm">{account?.name}</p>
          <p className="text-sm">Lorem ipsum dolor sit.</p>
        </div>
        <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
          <span className="text-gray-600">&nbsp;</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold mb-2">Total Balance</h1>

          {balance < 0 ? (
            <p className="text-md rounded-md px-1 bg-red-200 w-fit h-fit min-w-10 text-center text-gray-600">
              {balance}$
            </p>
          ) : (
            <p className="text-md rounded-md px-1 bg-green-200 w-fit h-fit min-w-10 text-center text-gray-600">
              {balance}$
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
