import axios from 'axios';
const Webbshop = {
        render: async() => {

                const response = await axios({
                    url: 'http://localhost:8080/api/produkter',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response || response.statusText !== 'OK') {
                    return `<div> Error, data kunde inte hämtas</div>`
                }
                const products = response.data;
                return `
            <ul class ="produkter">
                ${products.map( product =>`
                    <li>
                        <div class="produkt">
                                <a href="#/produkt/1">
                                    <img src="${product.image}" alt="${product.name}">
                                </a>
                            <div class="produktnamn">
                                <a href="#/produkt/${product._id}">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="produktinfo">
                                ${product.size}
                            </div>
                            <div class="produktpris">
                                ${product.price}:-
                            </div>
                            <div class="varukorg">
                                <button id="addinshop" class="primary"> KÖP NU</button>
                            </div>

                        </div>
                    </li>
        
            `).join('\n')}
        
            `
        }
};

export default Webbshop;