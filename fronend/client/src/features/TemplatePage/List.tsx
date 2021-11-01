import { ListItem } from './ListItem';

import styles from './List.module.css';

interface ItemProp {
  id: string;
  name: string;
}

interface ListProp {
  items: ItemProp[];
  handleSelection: (value: string) => void;
}

export const List: React.FC<ListProp> = props => (
  <div className={styles.list}>
    <ul>
      {(props.items || []).map(item => (
        <ListItem key={item.id} id={item.id} name={item.name} handleSelection={value => props.handleSelection(value)} />
      ))}
    </ul>
  </div>
);