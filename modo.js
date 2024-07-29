document.addEventListener('DOMContentLoaded', function() {
    const body = document.body; 

    const changeTextSize = (size) => {
        const elementsToChange = document.querySelectorAll('.muda-text');
        elementsToChange.forEach(element => {
            element.style.fontSize = size;
        });
        localStorage.setItem('fontSize', size);
    };

    document.querySelector('.textoPequeno').addEventListener('click', () => changeTextSize('14px'));
    document.querySelector('.textoNormal').addEventListener('click', () => changeTextSize('20px'));
    document.querySelector('.textoGrande').addEventListener('click', () => changeTextSize('35px'));

    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');
        let imgs = document.querySelectorAll('img');
        imgs.forEach(img => {
            if (body.classList.contains('dark-mode')) {
                img.style.filter = 'invert(20%)';
            } else {
                img.style.filter = 'invert(0%)';
            }
        });
        localStorage.setItem('darkModeEnabled', body.classList.contains('dark-mode'));
    };

    document.querySelector('.modoEscuro').addEventListener('click', toggleDarkMode);
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    if (darkModeEnabled) {
        toggleDarkMode();
    }
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
        changeTextSize(storedFontSize);
    }
});
