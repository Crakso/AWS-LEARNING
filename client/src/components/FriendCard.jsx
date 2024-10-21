import React, { useCallback, useEffect, useState } from "react";
import Data from "../assets/FriendData";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  getLogInUserDetails,
  getUserChannelDetail,
  getUserFollowingsDetail,
  getUserProfileDetail,
} from "../api";

const FriendCard = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [FollowersData, setFollowersData] = useState([]);
  let [username, setUsername] = useState([]);
  let [coverImage, setCoverImg] = useState([]);
  let [avatar, setAvatar] = useState([]);

  const FollowersDataFetching = useCallback(() => {
    const logedInUserInfo = async () => await getLogInUserDetails();
    logedInUserInfo()
      .then(async (res) => await getUserFollowingsDetail(res.data.data._id))
      .then((res) => {
        // console.log(res);
        const FollowedTo = res.data.data.FollowedTo;
        FollowedTo.map(async (userId) => {
          // console.log(userId.followedId);
          const { data } = await getUserProfileDetail(userId.followedId);
          // console.log("main data", data.data);

          setFollowersData((prev) => {
            return [...prev, data.data];
          });
        });
      });
  }, []);

  useEffect(() => {
    FollowersDataFetching();
    // FollowersData.forEach((v) => {
    // console.log(v);
    // setUsername(v.username);
    // setAvatar(v.avatar);
    // setCoverImg(v.coverImage);
    // });
  }, []);
  // console.log("followerdata", FollowersData.length);
  return (
    <div className="flex p-6 items-center flex-wrap gap-5 rounded shadow-xl">
      {FollowersData.length > 0 &&
        FollowersData.map((friend, i) => (
          <div className="shadow-xl p-3" key={i}>
            {/* {console.log(friend.username)} */}
            <Card
              key={friend.key}
              sx={{
                maxWidth: 345,
                boxShadow: "none",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={friend.coverImage || "avatar.png"}
                  alt="background-img"
                  sx={{ height: "12rem", objectFit: "fill", width: "20rem" }}
                />
                <Avatar
                  src={friend.avatar || "avatar.png"}
                  sx={{
                    marginTop: "-3rem",
                    marginLeft: "1rem",
                    width: "5rem",
                    height: "5rem",
                    border: "3px solid",
                    borderColor: "black",
                    backgroundColor: "#B4B4B8",
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {friend.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* {friend.role} */}
                  </Typography>
                </CardContent>
              </CardActionArea>

              {/* {isFollowed ? (
            <div className="flex justify-center">
              <Button variant="contained" sx={{ marginLeft: "3rem" }}>
                Follow
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="outlined">Unfollow</Button>
            </div>
          )} */}
            </Card>

            <div className="flex justify-center items-center">
              {isFollowed ? (
                <Button variant="contained">Follow</Button>
              ) : (
                <Button variant="outlined" sx={{ width: "10rem" }}>
                  Following
                </Button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default FriendCard;
