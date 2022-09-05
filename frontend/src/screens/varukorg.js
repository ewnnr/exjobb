import { getCartItems, setCartItems } from "../localStorage";
import { ParseRequestUrl, rerender } from "../parseURL";
import axios from "axios";
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
const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }

    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(Varukorg)
    }

};
const deletefromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === ParseRequestUrl().id) {
        document.location.hash = '/varukorg';

    } else {
        rerender(Varukorg);
    }
};
const Varukorg = {
        after_render: () => {
            const deleteButtons = document.getElementsByClassName('delete-button');
            Array.from(deleteButtons).forEach((deleteButton) => {
                deleteButton.addEventListener('click', () => {
                    deletefromCart(deleteButton.id);
                });

            });
            document.getElementById('checkout-button').addEventListener('click', () => {
                document.location.hash = '/checkout';
            })
        },
        render: async() => {
                const request = ParseRequestUrl();
                if (request.id) {
                    const product = await getProduct(request.id);
                    addToCart({
                        product: product._id,
                        image: product.image,
                        name: product.name,
                        price: product.price,
                        qty: 1,

                    });
                }
                const cartItems = getCartItems();

                return `
                    <div class= "varukorgen">
                        <div class="varukorgen-listad">
                            <ul class="varukorgen-ul">
                                <li>
                                    <h2> VARUKORGEN </h2>
                                    <div> Pris: </div>
                                </li>
                                ${
                                    cartItems.length === 0?
                                    '<div> Varukorgen är tom! <a href="/#/"> Klicka här för att shoppa</a>':
                                    cartItems.map(item =>`
                                        <li>
                                            <div class= "varukorgen-bild">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>
                                            <div class="varukorgen-namn">
                                                <div>
                                                    <a href="/#/produkt/${item.product}">
                                                    ${item.name}</a>
                                                </div>
                                                <div>
                                                    Antal:
                                                    <select class="antal-select" id="${item.product}">
                                                        <option value="1">1</option>
                                                    </select>    
                                                    <button type="button" class="delete-button" id="${item.product}">
                                                        Radera
                                                    </button>    
                                                </div>
                                            </div>
                                            <div class="varukorgen-pris">
                                                ${item.price}:-
                                            </div>
                                        </li>
                            </ul>
                                    `).join('\n')



                                    }
                                

                        </div>
                  
                        <div class= "varukorgen-action">
                            <h3> 
                                Totalt(${cartItems.reduce((a, c) => a + c.qty, 0)} i varukorgen)
                                :
                                ${cartItems.reduce((a, c)=> a + c.price * c.qty, 0)}:-
                            </h3>
                                <button id="checkout-button" class="varukorgen-kassan">
                                    KASSAN
                                </button>
                        </div>
                    </div>          
                      
                    
        `;
    },
};

export default Varukorg;