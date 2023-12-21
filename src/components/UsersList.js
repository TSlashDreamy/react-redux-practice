import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";

const UsersList = () => {
  const [doLoadUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    doLoadUsers();
  }, [doLoadUsers]);

  useEffect(() => {
    console.log(isCreatingUser, isLoadingUsers);
  }, [isCreatingUser, isLoadingUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) return <Skeleton times={6} className="h-10 w-full" />;
  if (loadingUsersError) {
    console.error(loadingUsersError);
    return <div>Fetching error. (Check the console)</div>;
  }

  const renderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Create user error!"}
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
