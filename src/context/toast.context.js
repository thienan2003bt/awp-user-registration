// ToastContext.js
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ToastContext = createContext({
    message: "",
});

export const ToastContextProvider = ({ children }) => {
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const showToast = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
    };

    useEffect(() => {
        if (!toastMessage || toastMessage === "") {
            return;
        }
        switch (toastType) {
            case "success": {
                toast.success(toastMessage);
                break;
            }
            case "error": {
                toast.error(toastMessage);
                break;
            }
            case "info": {
                toast.info(toastMessage);
                break;
            }
            case "warn": {
                toast.warn(toastMessage);
                break;
            }
            default: {
                toast.error(toastMessage);
                break;
            }
        }

        setToastMessage(""); // Reset the toast message
    }, [toastMessage, toastType]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
};