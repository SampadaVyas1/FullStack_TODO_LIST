import React from 'react'
import styles from "./Input.module.scss"

const Input = (props) => {
    const { onChange, value, customClass, inputType = "input", isChecked } = props;
    return (
        // <div className={`${styles.inputContainer} ${customClass}`}>
        <input type={inputType} onChange={onChange}
            className={`${inputType === "input" && styles.input} ${customClass}`}
            value={inputType === "checkbox" || inputType === "radio" ? undefined : value}
            checked={inputType === "checkbox" || inputType === "radio" ? isChecked : undefined} //
        />
        // </div>
    )
}

export default Input