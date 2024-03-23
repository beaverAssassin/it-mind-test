import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import List from '@/app/components/List/List';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Roboto } from 'next/font/google';
import { Item } from '@/pages/index.types';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const getServerSideProps = (async ({ query }) => {
  const request = !query.mode ? 'countries' : query.mode;
  const res = await fetch(`http://localhost:3001/${request}`);
  const data = await res.json();

  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Item[] }>;

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const initialMode = router.query.mode || 'countries';
  const [mode, switchMode] = useState(initialMode);

  const targetMode = mode === 'countries' ? 'currencies' : 'countries';

  const handleButtonClick = () => {
    switchMode(targetMode);
    router.push(`/?mode=${targetMode}`);
  };

  return (
    <main className={roboto.className}>
      <button onClick={handleButtonClick}>change mode to {targetMode}</button>
      <List data={data} />
    </main>
  );
};

export default Home;
