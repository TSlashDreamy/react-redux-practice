import useThunk from "../hooks/use-thunk";
import { removeUser } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isRemoving, removingError] = useThunk(removeUser);

  const handleRemove = () => {
    doRemoveUser(user);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button className="mr-3" loading={isRemoving} onClick={handleRemove}>
            <GoTrashcan />
          </Button>
          {removingError && (
            <div className="mr-3 text-red-500">
              Whoops... Error occured while deleting!
            </div>
          )}
          {user.name}
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
