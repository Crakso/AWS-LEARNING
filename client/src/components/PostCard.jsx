import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const formatter = buildFormatter(frenchStrings);

const PostCard = () => {
  const drawerBleeding = 56;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [like, setLike] = useState(null);
  const [post_id, setPostId] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLiked, setIsLiked] = useState(false);

  const onLike = (id) => {
    setIsLiked(!isLiked);
    setLike(like + (isLiked ? -1 : 1));
    console.log(id);
    setPostId(id);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const showComments = () => setOpenDrawer(!openDrawer);

  const [isSaved, setIsSaved] = useState(false);
  const onSave = () => {
    setIsSaved(!isSaved), setOpenSnackbar(true);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const navlink = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("api/v1/posts/all-posts")
        .then((res) => {
          // console.log(res.data.data);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          navlink("/");
        })
        .then((data) => {
          // console.log(data);
          setData(data);
        });
      // data.map((el) => setPostId(el._id));
      // axios.post(`/api/v1/posts/toggle/p/${post_id}`).then((res) => {
      //   console.log(res.data.data);
      // });
    } catch (err) {
      return console.log(err);
    }
  }, []);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {data.map((post) => (
        <div key={post.id} className="w-full h-auto mb-6">
          {/* pp and username, time */}
          {/* {console.log(post)} */}
          <div className="w-full h-auto flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
              <Link
                to={`/profile/${post.username}`}
                className="flex items-center justify-center flex-col flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#2ed68a] to-white">
                  <img
                    src={post.avatar}
                    alt="user-image"
                    className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
                  />
                </div>
              </Link>
              <div className="flex items-center gap-x-2">
                <p className="text-black text-sm font-bold">{post.username}</p>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <p className="text-black text-sm font-medium">
                  {/* {post.createdAt} */}
                  <TimeAgo date={`${post.createdAt}Z`} formatter={formatter} />
                </p>
              </div>
            </div>
            <div className="post">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="long-menu"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={handleClose}>
                  <lord-icon
                    src="https://cdn.lordicon.com/vihyezfv.json"
                    trigger="hover"
                  ></lord-icon>
                  Report
                </MenuItem>
                <MenuItem>Delete post</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="w-full h-auto pb-4 flex items-center gap-x-1">
            <h2 className="text-black text-sm font-medium ">
              {post.description}
            </h2>
          </div>
          {/* feed img */}
          <div className="w-full lg:max-h-[75vh] md:max-h-[70vh] sm:max-h-[65vh] max-h-[50vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[50vh] lg:min-h-[65vh] md:min-h-[55vh] sm:min-h-[50vh] min-h-[45vh] border border-black rounded overflow-hidden mb-3">
            <img
              src={post.postImg}
              alt="post-img"
              className="w-full object-cover rounded h-full "
            />
          </div>
          {/* User actions: like, comments etc */}
          <div className="w-full h-auto flex item-center justify-between ">
            <div className="flex flex-row item-center gap-x-4 justify-between">
              {/* like button */}
              <div>
                {isLiked ? (
                  <FavoriteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => onLike(post._id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => onLike(post._id)}
                  />
                )}
              </div>
              {/* comment */}
              <div>
                <CommentIcon
                  sx={{ cursor: "pointer" }}
                  onClick={showComments}
                />
                {openDrawer ? (
                  <SwipeableDrawer
                    anchor="bottom"
                    open={openDrawer}
                    onOpen={() => setOpenDrawer(true)}
                    onClose={() => setOpenDrawer(false)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                      keepMounted: false,
                    }}
                  >
                    <div className="p-6 bg-white text-black w-[60%] h-[100%]">
                      {post.comment}
                    </div>
                  </SwipeableDrawer>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <SendIcon sx={{ cursor: "pointer" }} />
              </div>
            </div>
            <div>
              {isSaved ? (
                <BookmarkAddedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={onSave}
                />
              ) : (
                <BookmarkBorderIcon
                  sx={{ cursor: "pointer" }}
                  onClick={onSave}
                />
              )}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={closeSnackbar}
                message="Post Saved!"
                action={action}
              />
            </div>
          </div>
          {/* like count */}
          <div className="w-auto m">
            {post.likeCount}
            {like} likes
          </div>
          {/* captions section */}
          {/*captions with username*/}
          <div className="w-full h-auto flex items-center gap-x-1">
            <div className="w-full h-auto text-sm text-grey-200 font-thin">
              {/* <NavLink to="/" className="font-medium text-sm me-2">
                {post.username}
              </NavLink> */}
            </div>
          </div>
          {/* comments count */}
          <NavLink to="/" className="text-grey-400 font-normal my-2">
            View all {post.commentCount} comments
          </NavLink>
          <div className="w-full h-auto flex items-center justify-between border-b border-b-grey-500">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-[90%] h-auto bg-transparent border-none outline-none focus:outline-none text-sm text-grey-400 py-3"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
