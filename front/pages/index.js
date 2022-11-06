import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  // useEffect(() => {
  //   function onScroll() {
  //     console.log(
  //       window.scrollY,
  //       document.documentElement.clientHeight,
  //       document.documentElement.scrollHeight
  //     );
  //   }
  //   window.addEventListener("scroll", onscroll);
  //   return () => {
  //     window.removeEventListener("scroll", onscroll);
  //   };
  // }, []);

  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  console.log("dddddd", mainPosts);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
