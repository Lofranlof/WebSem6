
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
        var loadTime = performance.now();
        // console.log('Время загрузки страницы: ' + loadTime + ' мс');
        var p = document.createElement('p');

        const serverTiming = performance.getEntriesByType('navigation')[0].serverTiming.find(timing => timing.name === 'serverdur');
        p.innerText = `Total load time: ${loadTime} ms (client) + ${serverTiming.duration} ms (server)`;
        // footer.appendChild(p);
        // p.innerHTML = 'Время загрузки страницы: ' + loadTime.toFixed(3) + ' мс';
        document.querySelector('footer').appendChild(p);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('a');
    var currentPage = document.location.pathname;

    menuItems.forEach(function(item) {
        var itemPath = item.getAttribute('href');

        if (currentPage === itemPath) {
            item.classList.add('active');
        }
    });
});

