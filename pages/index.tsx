import type { NextPage } from "next";
import Head from "next/head";
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Redit 2.0 clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox />
      <div className="flex"></div>
    </div>
  );
};

export default Home;
