import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";

const UsersList = () => {
  const dispath = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispath(fetchUsers());
  }, [dispath]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Fetching error. (Check the console)</div>;
  }

  return <div>{data.length}</div>;
};

export default UsersList;
