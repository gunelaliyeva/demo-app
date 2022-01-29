import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import './CategoryList.scss';
import {RouterPathEnum} from "../../enums/RouterPathEnum";
import CategoryListButton from "../../components/CategoryListButton";
import {CategoryModel} from "../../models/models";

const CategoryListScreen = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const getReq = await axios.get(process.env.REACT_APP_URL + '/payment/categories', );
                setCategories(getReq.data);
                localStorage.setItem('categories', JSON.stringify(getReq.data));
            } catch (err: any) {
                alert(err.response.data.error.message);
            }
        }

        getCategories();
    }, []);

    return (
        <div>
            <CategoryListButton/>
            <div className="flex-center page-area">
                <div className="card flex-column gap-20">
                    {
                        categories.map(category => {
                            return <Link to={RouterPathEnum.ServiceProviderList + `/${category["_id"]}`} key={category["_id"]}
                                         className="btn btn-outline-secondary btn-lg custom-btn flex-center">{category["name"]}</Link>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryListScreen;
