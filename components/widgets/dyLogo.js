import styles from "./dyLogo.module.scss";

export default function Dylogo() {
  return (
    <div className={styles.container}>
      <div className={styles.cloud + " " + styles.front}>
        <span className={styles.leftFront}></span>
        <span className={styles.rightFront}></span>
      </div>
      <span className={styles.sun + " " + styles.sunshine}></span>
      <span className={styles.sun}></span>
      <div className={styles.cloud + " " + styles.back}>
        <span className={styles.leftBack}></span>
        <span className={styles.rightBack}></span>
      </div>
    </div>
  );
}
