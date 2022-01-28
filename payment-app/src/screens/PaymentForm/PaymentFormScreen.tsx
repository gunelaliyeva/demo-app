import React, {useEffect, useState} from 'react';

import {InputGroup, Dropdown, DropdownButton, Button, Form} from "react-bootstrap";
import './Paymentform.scss';
import CategoryListButton from "../../components/CategoryListButton";
import {useParams} from "react-router-dom";
import axios from "axios";

const PaymentFormScreen = () => {
    let {categoryId, providerId} = useParams();
    let currencyArray = ['AZN', 'USD', 'TL', 'RUB'];
    const [selectedCategory, setSelectCategory] = useState();
    const [categories, setCategories] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    const [fieldValues, setFieldValues] = useState({
        subscriberNumber: '',
        prefix: {
            k: "0",
            v: ""
        },
        amount: '',
        currency: currencyArray[0],
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: ''
    })

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('categories') as string);
        if (res) setCategories(res);
    }, []);

    useEffect(() => {
        const res = categories.find(category => category["_id"] === categoryId);
        if (res) {
            setProviders(res.providers);
            setSelectCategory(res.name);
            // console.log(selectedCategory === "Mobile");
        }
        // setFields([...[...categories].find(category => category["_id"] === categoryId)
        //     .providers].find(provider => provider["_id"] === providerId).fields);
    }, [categories]);

    useEffect(() => {
        const res = providers.find(provider => provider["_id"] === providerId);
        if (res) setFields(res["fields"]);
    }, [providers]);

    useEffect(() => {
        setOptions(fields[0]?.options);
    }, [fields]);

    useEffect(() => {

        if (options) {
            if (options[0]) {
                setPrefixHandler(options[0]);
                // console.log(options[0].v);
            }
        }
    }, [options]);

    const setPrefixHandler = (val: { k: string, v: string }) => {
        fieldValuesHandler("prefix", val);

    }

    const fieldValuesHandler = (name: string, val: string | { k: string, v: string }) => {
        setFieldValues({
            ...fieldValues,
            [name]: val
        });
    }

    const payHandler = () => {
        console.log(fieldValues);
        axios.post('http://localhost:8080/payment/new', {
            details: [],
            amount: {
                value: fieldValues.amount,
                currency: fieldValues.currency
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <>
            <CategoryListButton/>
            <div className="flex-center page-area">
                <div className="card card-auto flex-between flex-column">
                    <div className="flex-between flex-column gap-20 width-100">
                        <InputGroup>
                            {
                                selectedCategory === "Mobile" ?
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title={fieldValues.prefix.v}
                                        id="input-group-dropdown-1"
                                    >
                                        {
                                            options?.map(option => {
                                                return <Dropdown.Item
                                                    onClick={() => setPrefixHandler(option)}
                                                    key={option["_id"]}>{option.v}</Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>
                                    : null
                            }
                            <Form.Control placeholder="Subscriber Number" type="text"
                                          onChange={e => fieldValuesHandler('subscriberNumber', e.target.value)}/>
                        </InputGroup>

                        <InputGroup>
                            <Form.Control placeholder="Amount" type="text"
                                          onChange={e => fieldValuesHandler('amount', e.target.value)}/>
                            <DropdownButton
                                variant="outline-secondary"
                                title={fieldValues.currency}
                                id="input-group-dropdown-2"
                                align="end"
                            >
                                {
                                    currencyArray.map(currency => {
                                        return <Dropdown.Item onClick={() => fieldValuesHandler('currency', currency)}
                                                              key={currency}>{currency}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        </InputGroup>
                        <Form.Control type="text" placeholder="Card Number"
                                      onChange={e => fieldValuesHandler('cardNumber', e.target.value)}/>
                        <div className="flex-between gap-20 width-100">
                            <Form.Control type="text" placeholder="Expiration Month"
                                          onChange={e => fieldValuesHandler('expMonth', e.target.value)}/>
                            <Form.Control type="text" placeholder="Expiration Year"
                                          onChange={e => fieldValuesHandler('expYear', e.target.value)}/>
                            <Form.Control type="text" placeholder="CVV"
                                          onChange={e => fieldValuesHandler('cvv', e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex-end width-100">
                        <Button variant="outline-success" className="col-3" onClick={payHandler}>Pay</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentFormScreen;