import axios from "axios";
import { ParseRequestUrl } from "../parseURL";
const apiUrl = "http://localhost:8080";

const getProduct = async(id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/produkter/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

const Produktsida = {
    after_render: () => {
        const request = ParseRequestUrl();
        document.getElementById('add-button').addEventListener('click', () => {
            document.location.hash = `/varukorg/${request.id}`;
        });

    },
    render: async() => {
        const request = ParseRequestUrl();
        const product = await getProduct(request.id);
        if (product.error) {
            return `<div> ${product.error}</div>`
        }
        return `
        <div class ="produktsida">
            <div class="back">
                <a href="/#/"> Tillbaka till produkter</a>
            </div>
            <div class="produktdetaljer">
                <div class="detaljbild">
                    <img src ="${product.image}" alt="${product.name}"/>
                </div>
                <div class="textinfo">
                    <ul>
                        <li>
                            <h1> ${product.name}</h1>
                        </li>
                        <li>
                           ${product.size}
                        </li>
                        <li>
                            <strong> Pris:</strong> ${product.price}:-
                        </li>
                        
                    
                        <li>
                            <div class="varukorg">
                                
                                <button id="add-button" class="primary"> KÖP</button>
                            </div>
                        </li>
                    </ul>  
                </div>
            </div>
            
        </div>`

    },
};

export default Produktsida;