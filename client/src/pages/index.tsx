import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import List from '@/app/components/List/List';
import { Item } from '@/index.types';
import { apiUrl, fetchUrl } from '@/api';
import { COUNTRIES } from '@/constants';
import '../app/globals.css';
export const getServerSideProps = (async ({ query }) => {
  const request = !query.mode ? COUNTRIES : query.mode;
  const data = await fetchUrl(`${apiUrl}/${request}`);

  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Item[] }>;

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <List data={data} />
    </main>
  );
};

export default Home;
