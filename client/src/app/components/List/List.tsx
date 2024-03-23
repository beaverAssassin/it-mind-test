import React from 'react';
import ListItem from '@/app/components/ListItem/ListItem';
import { useRouter } from 'next/router';
import { Item } from '@/index.types';
import styles from './List.module.scss';

interface ListProps {
  data: Item[];
}

const List: React.FC<ListProps> = ({ data = [] }) => {
  const router = useRouter();
  const mode = router.query.mode || 'countries';

  const toggleActiveItem = async (id: string, active: boolean) => {
    await fetch(
      `http://localhost:3001/set-active-${mode}?id=${id}&active=${!active}`,
    );
    router.replace(router.asPath, undefined, { scroll: false });
  };

  return (
    <div className={styles.countryList}>
      <h2>List of Countries and Currencies</h2>
      <>
        {data?.map((item) => (
          <ListItem
            key={item.title}
            toggleActiveItem={toggleActiveItem}
            item={item}
          />
        ))}
      </>
    </div>
  );
};

export default List;
