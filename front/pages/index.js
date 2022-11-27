import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {}, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// 화면을 그리기전에 이부분을 먼저 실행함
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      console.log("**********************");
      console.log(axios.headers);
      const cookie = req ? req.cookies : "";
      axios.defaults.headers.Cookies = "";
      if (req && cookie) {
        console.log("eeeeeeeee동작함");
        axios.defaults.headers.Cookies = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      console.log("-----");
      console.log(axios.defaults.headers.Cookie);
      // REQUEST가 saga에서 SUCCESS 될 때 까지 기다려준다
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
