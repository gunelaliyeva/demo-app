import React, {useEffect, useState} from 'react';

import {InputGroup, Dropdown, DropdownButton, Button, Form} from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

import {CategoryModel, CustomFieldModel, ProviderModel} from "../../models/models";
import CategoryListButton from "../../components/CategoryListButton";
import './Paymentform.scss';
import {RouterPathEnum} from "../../enums/RouterPathEnum";

const PaymentFormScreen = () => {
    let {categoryId, providerId} = useParams();
    let navigate = useNavigate();

    let currencyArray = ['AZN', 'USD', 'TL', 'RUB'];
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [fields, setFields] = useState<CustomFieldModel[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<ProviderModel>();
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
        const res: CategoryModel[] = JSON.parse(localStorage.getItem('categories') as string);
        if (res) {
            const selectedCat: CategoryModel | undefined = res.find(category => category._id === categoryId);
            setSelectedProvider(selectedCat?.providers?.find(provider => provider._id === providerId));
            setSelectedCategory(selectedCat?.name);
        }
    }, []);

    useEffect(() => {
        if (selectedProvider) {
            setFields(selectedProvider.fields);
            setPrefixHandler(selectedProvider.fields[0].options[0]);
        }
    }, [selectedProvider]);


    const setPrefixHandler = (val: { k: string, v: string }) => {
        fieldValuesHandler("prefix", val);
    }

    const fieldValuesHandler = (name: string, val: string | { k: string, v: string }) => {
        setFieldValues({
            ...fieldValues,
            [name]: val
        });
    }

    const payHandler = async () => {
        try {
            const subscriber = selectedCategory === "Mobile" ?
                '+994' + fieldValues.prefix.v.substring(1, 3) + fieldValues.subscriberNumber :
                fieldValues.subscriberNumber;

            const result = await axios.post(process.env.REACT_APP_URL + '/payment/new', {
                providerId: providerId,
                fields: [
                    {
                        k: "Service",
                        v: selectedProvider?.name
                    },
                    {
                        k: "Subscriber",
                        v: subscriber
                    }
                ],
                amount: {
                    value: fieldValues.amount,
                    currency: fieldValues.currency
                },
                card: {
                    number: fieldValues.cardNumber,
                    exp_month: fieldValues.expMonth,
                    exp_year: fieldValues.expYear,
                    cvv: fieldValues.cvv
                }
            });
            sessionStorage.setItem('payment', JSON.stringify(result.data));
            navigate(RouterPathEnum.Result, { replace: true });
        } catch (err: any) {
            //for some reason Bootstrap Modal throws error
            alert(err.response.data.error.message);
        }
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
                                            fields[0]?.options?.map(option => {
                                                return <Dropdown.Item
                                                    onClick={() => setPrefixHandler(option)}
                                                    key={option._id}>{option.v}</Dropdown.Item>
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
