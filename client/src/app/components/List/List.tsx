import React, { useCallback, useState } from 'react';
import ListItem from '@/app/components/ListItem/ListItem';
import { useRouter } from 'next/router';
import { Item } from '@/index.types';
import { fetchUrl } from '@/api';
import { COUNTRIES, CURRENCIES } from '@/constants';
import styles from './List.module.scss';

interface ListProps {
  data: Item[];
}

const List: React.FC<ListProps> = ({ data = [] }) => {
  const router = useRouter();
  const initialMode = router.query.mode || COUNTRIES;
  const [mode, switchMode] = useState(initialMode);
  const targetMode = mode === COUNTRIES ? CURRENCIES : COUNTRIES;

  const handleButtonClick = () => {
    router.push(`/?mode=${targetMode}`);
    switchMode(targetMode);
  };

  const toggleActiveItem = useCallback(async (id: string, active: boolean) => {
    return await fetchUrl(
      `http://localhost:3001/set-active-${mode}?id=${id}&active=${!active}`,
    );
  }, []);

  return (
    <div className={styles.countryList}>
      <h2>List of Countries and Currencies</h2>
      <button className={styles.button} onClick={handleButtonClick}>
        Change mode to {targetMode}
      </button>
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
