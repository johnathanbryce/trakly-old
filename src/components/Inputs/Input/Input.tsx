import React from 'react'
import styles from './Input.module.css'

interface InputFormProps {
    name: string,
    value: string | number | undefined,
    type: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    error?: boolean,
    required?: boolean,
    maxLength?: number;
}

export default function Input({name, onClick,placeholder, value, type, onChange, onFocus, onBlur, error=false, required=false, maxLength}: InputFormProps) {
    return (
      <input 
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`${styles.input} ${error ? styles.error : '' }`}
      />
  )
}
