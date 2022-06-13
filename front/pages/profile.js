import AppLayout from "../components/AppLayout";
import Head from "next/head"
import NickNameEditForm from "../components/NicknamesEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {

    const followerList = [{nickname: "제로초"}, {nickname: "헤헤"}, {nickname: "헤헤헿"}]
    const followingList = [{nickname: "노드버드"}, {nickname: "아아"}, {nickname: "호호"}]

    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>
    );
}

export default Profile;