import Webbshop from "./screens/webbshop.js";
import Produktsida from "./screens/Produktsida.js";
import { ParseRequestUrl } from "./parseURL.js";
import Error404 from "./screens/Error404.js";
import Varukorg from "./screens/varukorg.js";
import signInScreen from "./screens/signinscreen.js";

const routes = {
    '/': Webbshop,
    '/produkt/:id': Produktsida,
    '/varukorg/:id': Varukorg,
    '/varukorg': Varukorg,
    '/signin': signInScreen,
    '/checkout': signInScreen,
};

const router = async() => {
    const request = ParseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404;

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);