import styles from "./fancyCard.module.scss";
export default function FancyCard({ children }) {
  return (
    <div className={styles.card}>
      <h2>{children}</h2>
    </div>
  );
}
