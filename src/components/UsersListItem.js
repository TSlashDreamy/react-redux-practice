import useThunk from "../hooks/use-thunk";
import { removeUser } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isRemoving, removingError] = useThunk(removeUser);

  const handleRemove = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isRemoving} onClick={handleRemove}>
        <GoTrashcan />
      </Button>
      {removingError && (
        <div className="mr-3 text-red-500">
          Whoops... Error occured while deleting!
        </div>
      )}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
