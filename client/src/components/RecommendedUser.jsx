import { Avatar, Button } from "@mui/material";
import React, { useEffect } from "react";
import Data from "../assets/Data";
import { useState, useCallback } from "react";
import {
  getLogInUserDetails,
  getUserChannelDetail,
  getUserFollowingsDetail,
  getUserProfileDetail,
} from "../api";

const RecommendedUser = () => {
  // if (data.isFollowed) {
  //   alert("true");
  // } else {
  //   alert("false");
  // }

  const [isfollowed, setIsFollowed] = useState(false);

  const onFollow = (id) => {
    setIsFollowed(!isfollowed);
    // console.log(isfollowed);
  };

  const RecommendedUserDataFetching = useCallback(() => {
    const logedInUserInfo = async () => await getLogInUserDetails();
    logedInUserInfo()
      .then(async (res) => await getUserFollowingsDetail(res.data.data._id))
      .then((res) => {
        // const FollowedTo = res.data.data.FollowedTo;
        console.log(res.data.data);
        // FollowedTo.map(async (userId) => {
        //   // console.log(userId.followedId);
        //   const { data } = await getUserProfileDetail(userId.followedId);
        //   // console.log("main data", data.data);

        //   setFollowersData((prev) => {
        //     return [...prev, data.data];
        //   });
        // });
      });
  }, []);

  useEffect(() => {
    RecommendedUserDataFetching();
    // FollowersData.forEach((v) => {
    // console.log(v);
    // setUsername(v.username);
    // setAvatar(v.avatar);
    // setCoverImg(v.coverImage);
    // });
  }, []);

  return (
    <div className="mt-7 pb-4 w-[90%] px-8 h-auto bg-white rounded sticky">
      <div className="border-b p-2">You Might also Know</div>
      {Data.map((friend, id) => (
        <div key={id}>
          <div className="grid grid-flow-col grid-cols-3 p-2">
            <div className="borded-b rounded borded-black">
              <Avatar src={friend.profileImg} />
            </div>
            <p className="flex self-baseline">{friend.username}</p>
            <div className="ml-7">
              {isfollowed ? (
                <Button
                  variant="outlined"
                  sx={{ width: "0.4rem", fontSize: "11px" }}
                  onClick={() => onFollow(friend.id)}
                >
                  Followed
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ width: "0.4rem", fontSize: "11px" }}
                  onClick={() => onFollow(friend.id)}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedUser;
