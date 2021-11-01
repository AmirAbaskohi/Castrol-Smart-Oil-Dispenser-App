import styles from './Footer.module.css';

export const Footer = () => {
  let edgeOilRemainingQty: any = localStorage.getItem('EDGE 5W-40');
  let parsedEdgeOilRemainingQty = JSON.parse(edgeOilRemainingQty);
  let magnatecOilRemainingQty: any = localStorage.getItem('Magnatec 5W-40 MP');
  let parsedMagnatecOilRemainingQty = JSON.parse(magnatecOilRemainingQty);
  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.barrelOne}>
          {parsedEdgeOilRemainingQty ? parsedEdgeOilRemainingQty.oil_type : 'EDGE 5W-40'} - {parsedEdgeOilRemainingQty ? parsedEdgeOilRemainingQty.remaining_quantity_perc : '100'}%
        </div>
        <div className={styles.barrelTwo}>
          {parsedMagnatecOilRemainingQty ? parsedMagnatecOilRemainingQty.oil_type : 'Magnatec 5W-40 MP'} - {parsedMagnatecOilRemainingQty ? parsedMagnatecOilRemainingQty.remaining_quantity_perc : '100'}%
        </div>
      </div>
    </footer>
  );
}