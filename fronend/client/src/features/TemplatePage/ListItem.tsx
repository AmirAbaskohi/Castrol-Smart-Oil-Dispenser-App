import styles from './ListItem.module.css';

interface ListItemProp {
  id: string;
  name: string;
  handleSelection: (value: string) => void;
}

export const ListItem = (props: ListItemProp) =>
(<li>
  <div id={props.id} className={styles.item} onClick={() => props.handleSelection(props.name)}>{props.name}
  </div>
</li>);