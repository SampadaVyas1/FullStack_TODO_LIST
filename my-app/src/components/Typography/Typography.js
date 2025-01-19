import React from 'react'
import styles from "./Typography.module.scss"

const Typography = (props) => {
    const { children, variant = "p1", customClass, disabled = false, ...otherProps } = props
    return (
        <div className={`${styles[variant]} ${customClass} ${disabled && styles.disabled}`}{...otherProps}>{children}</div>
    )
}

export default Typography