import React, {useEffect, useState} from 'react';
import CategoryListButton from "../components/CategoryListButton";
import {ReceiptModel} from "../models/models";

const ResultScreen = () => {
    const [receipt, setReceipt] = useState<ReceiptModel>();
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        const data:ReceiptModel = JSON.parse(sessionStorage.getItem('payment') as string);
        setReceipt(data);
        setDate(new Date(data?.date));
    }, []);

    return (
        <>
            <CategoryListButton/>
            <div className="flex-center page-area">
                <div className="card flex-between align-center gap-20 p-5">
                    <div className="flex-center flex-column gap-20">
                        <img src={require('../assets/images/success.png')} alt={"success icon"}/>
                        <h2>Payment Completed Successfully</h2>
                    </div>
                    <div>
                        <p>
                            Date:
                            {date?.getFullYear()}-{Number(date?.getMonth()) + 1}-{date?.getDate()}
                            /{Number(date?.getHours()) + 4}:{date?.getMinutes()}:{date?.getSeconds()}
                        </p>
                        <p>Amount: {receipt?.amount.value} {receipt?.amount.currency}</p>
                        <br/>
                        <div>
                            <p>Details:</p>
                            {
                                receipt?.details.map(detail =>
                                <p><span>{detail?.k}</span>: {detail?.v}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultScreen;