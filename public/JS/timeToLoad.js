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

document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector(".header__nav");
    const directChildren = menu.querySelectorAll("a");
    const currentPage = document.location.href;
    directChildren.forEach(function(item) {
        if (item.href === currentPage) {
            item.classList.add("active");
        }
    });
});

