import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NickNameEditForm from "../components/NicknamesEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, []);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
