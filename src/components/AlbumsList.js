import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";
import Button from "./Button";

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };



  let content;
  if (isLoading) content = <Skeleton times={3} className="h-10 w-full" />;
  else if (error) content = <div>Error occured, while fetching albums!</div>;
  else if (!data.length)
    content = (
      <span className="text-red-500">There are no albums for this user</span>
    );
  else {
    content = data.map((album) => {
      const header = album.title;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of images
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>Albums for {user.name}</div>
      <Button onClick={handleAddAlbum}>+ Add Album</Button>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
