export type CategoryModel = {
    _id: string,
    name: string,
    providers: [ProviderModel],
}

export type ProviderModel = {
    _id: string,
    name: string,
    fields: [CustomFieldModel]
}

export type CustomFieldModel = {
    _id: string,
    type: number,
    label: string,
    options: [
        {
            _id: string,
            k: string,
            v: string
        }
    ]
}

export type ReceiptModel = {
    date: string,
    details: [
        {
            k: string,
            v: string
        }
    ],
    amount: {
        value: string,
        currency: string
    }
}