import React, {useEffect, useState} from 'react';

import {InputGroup, Dropdown, DropdownButton, Button, Form} from "react-bootstrap";
import './Paymentform.scss';
import CategoryListButton from "../../components/CategoryListButton";
import {useParams} from "react-router-dom";

const PaymentFormScreen = () => {
    let {categoryId, providerId} = useParams();
    let currencyArray = ['AZN', 'USD', 'TL', 'RUB'];
    let selectedCategory: {name: string, providers: [any]};
    const [categories, setCategories] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    const [prefix, setPrefix] = useState<{ k: any, v: any }>({k: '', v: ''});
    const [selectedCurrency, setSelectedCurrency] = useState(currencyArray[0]);

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('categories') as string);
        if (res) setCategories(res);
    }, []);

    useEffect(() => {
        selectedCategory = categories.find(category => category["_id"] === categoryId);
        if (selectedCategory) setProviders(selectedCategory.providers);
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
        setPrefix(options ? options[0] : {k: '', v: ''});
    }, [options]);
    return (
        <>
            <CategoryListButton/>
            <div className="flex-center page-area">
                <div className="card card-auto flex-between flex-column">
                    <div className="flex-between flex-column gap-20 width-100">
                        {
                            //@ts-ignore
                            selectedCategory?.name !== "Mobile" ?
                                <InputGroup>
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title={prefix?.v}
                                        id="input-group-dropdown-1"
                                    >
                                        {
                                            options?.map(option => {
                                                return <Dropdown.Item onClick={e => setPrefix(option)}
                                                                      key={option["_id"]}>{option.v}</Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>
                                    <Form.Control placeholder="Number"/>
                                </InputGroup>
                                : <Form.Control type="text" placeholder="Subscriber Number"/>
                        }

                        <InputGroup>
                            <Form.Control placeholder="Amount" type="text"/>
                            <DropdownButton
                                variant="outline-secondary"
                                title={selectedCurrency}
                                id="input-group-dropdown-2"
                                align="end"
                            >
                                {
                                    currencyArray.map(currency => {
                                        return <Dropdown.Item onClick={val => setSelectedCurrency(currency)}
                                                              key={currency}>{currency}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        </InputGroup>
                        <Form.Control type="text" placeholder="Card Number"/>
                        <div className="flex-between gap-20 width-100">
                            <Form.Control type="text" placeholder="Expiration Month"/>
                            <Form.Control type="text" placeholder="Expiration Year"/>
                            <Form.Control type="text" placeholder="CVV"/>
                        </div>
                    </div>
                    <div className="flex-end width-100">
                        <Button variant="outline-success" className="col-3">Pay</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentFormScreen;