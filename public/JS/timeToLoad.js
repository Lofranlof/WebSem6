
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
        var loadTime = performance.now();
        console.log('Время загрузки страницы: ' + loadTime + ' мс');

        var footer = document.createElement('footer');
        footer.innerHTML = 'Время загрузки страницы: ' + loadTime.toFixed(3) + ' мс';
        document.body.appendChild(footer);
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

