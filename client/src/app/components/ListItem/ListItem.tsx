import { FC, memo, useState } from 'react';
import { Item } from '@/index.types';
import styles from './ListItem.module.scss';

interface ItemProps {
  item: Item;
  toggleActiveItem: (id: string, active: boolean) => Promise<void>;
}
const ListItem: FC<ItemProps> = ({
  item: { title, active, items },
  toggleActiveItem,
}) => {
  const [checked, setIsChecked] = useState(active);

  const handleChange = () => {
    toggleActiveItem(title, active).then(() => {
      return setIsChecked((prev) => !prev);
    });
  };
  console.log(items);
  return (
    <div className={styles.listItem} key={title}>
      <div className={styles.checkboxWrapper}>
        <input
          className={styles.checkbox}
          id={title}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
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

export default memo(ListItem);
