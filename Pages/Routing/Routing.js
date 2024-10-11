const routes = {
    '/': { html: '/Pages/Landing/landing.html', css: '/Pages/Landing/Landing.css', js: '/Pages/Landing/Landing.js' },
    '/guide': { html: '/Pages/Guide/guide.html', css: '/Pages/Guide/Guide.css', js: '/Pages/Guide/Guide.js' }, // Add more routes
};

function loadCSS(cssFile) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
}

function loadJS(jsFile) {
    const script = document.createElement('script');
    script.src = jsFile;
    script.defer = true;
    document.body.appendChild(script);
}

function removePreviousJS() {
    const previousScripts = document.querySelectorAll('script[src');
    previousScripts.forEach(script => script.remove());
}

function removePreviousCSS() {
    const previousCSS = document.querySelectorAll('link[rel="stylesheet"');
    previousCSS.forEach(link => link.remove());
}

function navigateTo(route) {
    const appDiv = document.getElementById('app')
    fetch(routes[route].html).then(response => response.text()).then(html => {
        appDiv.innerHTML = html;
    }).catch(err => console.error('Error loading page: ', err));
    
    removePreviousCSS();
    loadCSS(routes[route].css);

    removePreviousJS();
    loadJS(routes[route].js);
}

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
})

navigateTo('/');

