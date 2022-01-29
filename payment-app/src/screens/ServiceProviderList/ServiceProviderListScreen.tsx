import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {RouterPathEnum} from "../../enums/RouterPathEnum";
import CategoryListButton from "../../components/CategoryListButton";
import {CategoryModel, ProviderModel} from "../../models/models";

const ServiceProviderListScreen = () => {
    let {categoryId} = useParams();
    const [providers, setProviders] = useState<ProviderModel[]>([]);

    useEffect(() => {
        const categories:CategoryModel[] = [...JSON.parse(localStorage.getItem('categories') as string)];
        // @ts-ignore
        setProviders(categories?.find(category => category._id === categoryId).providers);
    }, []);

    return (
        <div>
            <CategoryListButton/>
            <div className="flex-center page-area">
                <div className="card flex-column gap-20">
                    {
                        providers.map(provider => {
                            return <Link to={RouterPathEnum.PaymentForm + `/${categoryId}/${provider["_id"]}`} key={provider["_id"]}
                                         className="btn btn-outline-secondary btn-lg custom-btn flex-center">{provider["name"]}</Link>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderListScreen;