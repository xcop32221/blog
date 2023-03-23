import { clsx } from "clsx";
import styles from "./loader.module.scss";

export default function LoaderSpin({ children, type }) {
  return <div className={styles.spinner}></div>;
}
