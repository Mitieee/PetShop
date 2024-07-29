function search() {
    var searchText = document
      .getElementById('searchInput')
      .value.trim()
      .toLowerCase();
  
    var categoryElements = document.querySelectorAll(
      '.category-container .muda-text',
    );
  
    categoryElements.forEach(function (element) {
      var textPresent = element.innerText.toLowerCase().includes(searchText);
  
      if (searchText === '' || textPresent) {
        element.parentNode.style.display = 'inline-block';
      } else {
        element.parentNode.style.display = 'none';
      }
    });
  
    if (searchText === '') {
      categoryElements.forEach(function (element) {
        element.parentNode.style.display = 'inline-block';
      });
    }
  }