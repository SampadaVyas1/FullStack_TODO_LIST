import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.scss";
import Input from "../components/Input/Input";
import Typography from "../components/Typography/Typography";
import { Button } from "../components/Button/Button";

export const TodoList = () => {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState();
    const [isValueAdded, setIsValueAdded] = useState(false);
    const [isDeleteAllClicked, setIsDeleteAllClicked] = useState(false);
    const [isCheckedList, setIsCheckedList] = useState([]);
    const [isValueUpdated, setIsValueUpdated] = useState(false);

    const onChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const response = fetch("http://localhost:5003/api/todo/getList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setData(data?.data);
                setIsValueAdded(false);
                setIsDeleteAllClicked(false);
                setIsValueUpdated(false);
            })
            .catch((error) => {
                console.log(error);
            });

        // getData()
    }, [isValueAdded, isDeleteAllClicked, isValueUpdated]);
    const onClick = async () => {
        const payload = { label: inputValue, value: false };
        const response = fetch("http://localhost:5003/api/todo/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                console.log("Success:", data);

                setIsValueAdded(true);
            })
            .catch((error) => {
                console.log(error);
            });

        setInputValue("");
    };
    console.log(data);

    const handleCheckboxChange = (id, eleValue) => {
        const updateCheckboxValue = async () => {
            try {
                const response = fetch("http://localhost:5003/api/todo/edit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                        value: !eleValue,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                "Network response was not ok " + response.statusText
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Success:", data);
                        setIsValueUpdated(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        updateCheckboxValue();
    };

    const deleteAll = () => {
        if (data.length) {
            const response = fetch("http://localhost:5003/api/todo/deleteAll", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "Network response was not ok " + response.statusText
                        );
                    }
                    return response.json(); // Parse JSON response
                })
                .then((data) => {
                    console.log("Success:", data);
                    setIsDeleteAllClicked(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className={styles.todoListWrapper}>
            <div className={styles.todoContainer}>
                <Typography customClass={styles.todoListLabel}>TO-DO LIST</Typography>
                <div className={styles.inputWrapper}>
                    <Input
                        value={inputValue}
                        onChange={onChange}
                        customClass={styles.inputContainer}
                    />
                    <Button
                        onClick={onClick}
                        customClass={styles.addButton}
                        disabled={!inputValue}
                    >
                        Add
                    </Button>
                </div>
                <div className={styles.list}>
                    {data &&
                        data?.map((ele, index) => {
                            return (
                                <div key={index + 1} className={styles.listItem}>
                                    {/* <Input
                    inputType="checkbox"
                    // isChec
                    isChecked={ele.value}
                    onChange={(e) => handleCheckboxChange(ele.id, e)}
                    customClass={`${styles.checkbox} ${
                      ele.value && styles.checkbox
                    }`}
                  /> */}
                                    {
                                        !ele?.value ?
                                            <div className={styles.roundedInput} onClick={(e) => handleCheckboxChange(ele.id, ele?.value)}></div>
                                            :
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnu1FU-Ia6xy9kWrO9IWnPARA9Bzf9YdIe7JaaFeuO-Wq8a58SrDjQbpOLU65iwEROAqY&usqp=CAU" onClick={(e) => handleCheckboxChange(ele.id, ele?.value)} height={32} width={32} />
                                    }
                                    <Typography variant="p2">{ele.label}</Typography>
                                </div>
                            );
                        })}
                </div>
                <div className={styles.separtor}></div>
                <div className={styles.footer}>
                    <Typography customClass={styles.footerItem}>
                        {data.length} Items total
                    </Typography>

                    <Typography
                        customClass={styles.footerItem}
                        onClick={deleteAll}
                        disabled={!data?.length}
                    >
                        Delete All
                    </Typography>
                </div>
            </div>
        </div>
    );
};
