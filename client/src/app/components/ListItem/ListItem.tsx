import { FC } from 'react';
import { Item } from '@/index.types';
import styles from './ListItem.module.scss';

interface ItemProps {
  item: Item;
  toggleActiveItem: (id: string, active: boolean) => void;
}
const ListItem: FC<ItemProps> = ({ item, toggleActiveItem }) => {
  return (
    <>
      <div className={styles.listItem} key={item.title}>
        <div>
          <input
            id={item.title}
            type="checkbox"
            checked={item.active}
            onChange={() => toggleActiveItem(item.title, item.active)}
          />
          <label htmlFor={item.title}>
            <span
              className={[styles.item, item.active && styles.active].join(' ')}
            >
              {item.title}
            </span>
          </label>
        </div>
        <div className={styles.items}>
          {item.items?.map((el) => {
            return (
              <div key={el} className={styles.item}>
                {el}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListItem;
