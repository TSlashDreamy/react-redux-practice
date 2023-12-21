import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [doLoadUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => state.users);
  let content;

  useEffect(() => {
    doLoadUsers();
  }, [doLoadUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) content = <Skeleton times={6} className="h-10 w-full" />;
  else if (loadingUsersError) content = <div>Fetching error ⚠️</div>;
  else {
    content = data.map((user) => <UsersListItem key={user.id} user={user} />);
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Create user error!"}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
