const routes = {
    '/': { html: '/Pages/Landing/landing.html', css: '/Pages/Landing/Landing.css', js: ['/Pages/Landing/Landing.js','/Pages/Controller/controller.js'] },
    '/guide': { html: '/Pages/Guide/guide.html', css: '/Pages/Guide/guide.css', js: '/Pages/Guide/guide.js' },
    '/controller': { html: '/Pages/Controller/controller.html', css: '/Pages/Controller/controller.css', js: '/Pages/Controller/controller.js'},
    '/test-page': { html: '/Pages/TestPage/test_page.html', css: '/Pages/TestPage/test_page.css', js:'/Pages/TestPage/test_page.js' }
};

function loadCSS(cssFile) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
}

function loadJS(jsFiles) {
    return jsFiles.reduce((promise, jsFile) => {
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = jsFile;
                script.onload = () => {
                    console.log(`Script ${jsFile} cargado correctamente.`);
                    resolve();
                };
                script.onerror = () => {
                    reject(`Error al cargar el script ${jsFile}`);
                };
                document.body.appendChild(script);
            });
        });
    }, Promise.resolve());
    console.log('Cargando scripts:', jsFiles);
}


function removePreviousJS() {
    const previousScripts = document.querySelectorAll('script[src]');
    previousScripts.forEach(script => script.remove());
    console.log('Eliminando scripts anteriores');
}

function removePreviousCSS() {
    const previousCSS = document.querySelectorAll('link[rel="stylesheet"]');
    previousCSS.forEach(link => link.remove());
}

function navigateTo(route) {
    const appDiv = document.getElementById('app');
    fetch(routes[route].html)
        .then(response => response.text())
        .then(html => {
            appDiv.innerHTML = html;
            removePreviousCSS();
            loadCSS(routes[route].css);

            removePreviousJS();

            // Cargar scripts secuencialmente
            loadJS(routes[route].js).then(() => {
                console.log('Todos los scripts cargados.');
                const audioRoutes = ['/', '/controller'];
                if (audioRoutes.includes(route)) {
                    if (typeof initializeAudioRecorder === 'function') {
                        initializeAudioRecorder();
                    } else {
                        console.error('initializeAudioRecorder no está definida.');
                    }
                }
            }).catch(err => console.error(err));
        })
        .catch(err => console.error('Error loading page: ', err));
}



document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('popstate', () => {
        navigateTo(window.location.pathname);
        
    })

    navigateTo('/');
});

window.navigateTo = navigateTo;