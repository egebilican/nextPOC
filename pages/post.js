import Layout from "../components/MyLayout.js";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import _ from "lodash";

const Post = props => (
  <>
    <Head>
      <title>My page title</title>
      <meta name="google-site-verification" content="KMNH3Xbrc1zmbQfB19rfKE5DNxmGIpL0vfND7_8JFt8" />
      <meta name="post" content="initial-scale=1.2, width=device-width" key="viewport" />
    </Head>
    <Layout>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?p>/g, "")}</p>
      <img src={props.show.image.medium} />
      <div onClick={testFetch}>hey</div>
    </Layout>
  </>
);

const testFetch = async () => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  console.log(res);
};

Post.getInitialProps = async function(context) {
  //console.log("post-context", context);
  //console.log("post-req-server only", context.req);

  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`POST: Fetched show: ${show.name}`);

  return { show };
};

export default Post;
