import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {Product} from "../interfaces/product";
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/products');

                const data = await response.json();

                setProducts(data);
            }
        )();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE'
            });

            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/products/create' className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Tipo Arma</th>
                        <th>Hora y Fecha Detección</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(
                        (p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={`data:image/png;base64,${p.image}`} height="180"/></td>
                                    <td>{p.title}</td>
                                    <td>{p.date}</td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => del(p.id)}
                                            >Eliminar</a>
                                        <div className="btn-group mr-2">
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                               onClick={() => del(p.id)}
                                            >Enviar Alarma</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Products;