import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

const Index = props => (
  <>
    <Head>
      <title>My page title</title>
      <meta name="indexege" content="initial-scale=1.2, width=device-width" key="viewport" />
    </Head>
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
            Test
          </li>
        ))}
      </ul>
    </Layout>
  </>
);

Index.getInitialProps = async function(context) {
  //console.log("index-context ", context);
  //console.log("index-req-server only", context.req);
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`INDEX: Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
