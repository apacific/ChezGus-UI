import React from 'react';
import styles from './Button.module.css';

// style wrapper around button html element
const Button = (props) => {
  const { children, onClick } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
