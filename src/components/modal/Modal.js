import React from 'react';
import styles from './Modal.module.css';
import Button from '../button/Button';

// style wrapper around a div html element to show a modal
const Modal = (props) => {
  const { message, reset } = props;

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        {message}
        <Button onClick={reset}>OK</Button>
      </div>
    </div>
  );
}

export default Modal;
