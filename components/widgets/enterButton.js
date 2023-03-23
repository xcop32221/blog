import styles from "./enter.module.scss";
import { forwardRef } from "react";
export default forwardRef(function EnterButton(props, ref) {
  const { children, onClick } = props;
  return (
    <div>
      <button className={styles.enter} onClick={onClick} ref={ref}>
        {children}
      </button>
    </div>
  );
});
