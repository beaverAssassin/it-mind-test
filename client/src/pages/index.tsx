import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import List from '@/app/components/List/List';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Item } from '@/index.types';
import { fetchUrl } from '@/api';
import { COUNTRIES, CURRENCIES } from '@/constants';
import '../app/globals.css';

export const getServerSideProps = (async ({ query }) => {
  const request = !query.mode ? COUNTRIES : query.mode;
  const data = await fetchUrl(`http://localhost:3001/${request}`);

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
