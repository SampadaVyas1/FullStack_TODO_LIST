import React from 'react';
import styles from "./Button.module.scss"
import Typography from '../Typography/Typography';

export const Button = (props) => {
    const { children, onClick, customClass, disabled = false } = props
    return (
        <button className={`${styles.buttonWrapper} ${customClass} ${disabled && styles.disabled}`} onClick={onClick} disabled={disabled}>
            <Typography>{children}</Typography>
        </button >
    )
}
