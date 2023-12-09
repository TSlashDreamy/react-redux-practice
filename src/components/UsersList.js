import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

const UsersList = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);
  const dispath = useDispatch();
  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    setIsLoadingUsers(true);
    dispath(fetchUsers())
      .unwrap()
      .catch((e) => setLoadingUsersError(e))
      .finally(() => setIsLoadingUsers(false));
  }, [dispath]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispath(addUser())
      .unwrap()
      .catch((e) => setCreatingUserError(e))
      .finally(() => setIsCreatingUser(false));
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
        {isCreatingUser ? (
          "Creating user..."
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError && 'Create user error!'}
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
