import React from 'react';
import styles from './Button.module.css';
// External Libraries


interface ButtonProps {
  label: any;
  isLoading: boolean;
  onClick?: (e: any) => void;
  secondary?: boolean;
  disabled?: boolean;
}

const Button = ({label, isLoading, disabled, secondary, onClick}: ButtonProps) => {
  const buttonClassName = isLoading
    ? secondary
      ? styles.inactive_button
      : styles.inactive_button
    : secondary
    ? styles.button_secondary
    : styles.button;

  return (
    <button
      onClick={onClick}
      className={buttonClassName}
      type="submit"
      disabled={isLoading || disabled}
    >
      <span className={styles.label}> {isLoading ? 'Loading...' : label} </span>
    </button>
  );
};

export default Button;
