import { FC } from 'react';
import { Item } from '@/index.types';
import styles from './ListItem.module.scss';

interface ItemProps {
  item: Item;
  toggleActiveItem: (id: string, active: boolean) => void;
}
const ListItem: FC<ItemProps> = ({
  item: { title, active, items },
  toggleActiveItem,
}) => {
  return (
    <div className={styles.listItem} key={title}>
      <div className={styles.checkboxWrapper}>
        <input
          className={styles.checkbox}
          id={title}
          type="checkbox"
          checked={active}
          onChange={() => toggleActiveItem(title, active)}
        />
        <label htmlFor={title} className={styles.label}>
          <span className={active ? styles.active : ''}>{title}</span>
        </label>
      </div>
      <div className={styles.items}>
        {items?.map((el) => {
          return (
            <div key={el} className={styles.item}>
              {el || 'Nothing found'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItem;
