const getQuery = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
}
const EMAIL = 'vachirawit.mark@gmail.com';
const content = getQuery('content');
fetch(`content/${content}/info.json`)
  .then(response => response.json())
  .then(info => {
    const article_tags = document.getElementById('article-tag');
    info.tag.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      span.className = "badge badge-light";
      article_tags.appendChild(span);
    })
  })
fetch(`content/${content}/index.html`)
  .then(response => response.text())
  .then(text => {
    const content = document.getElementById('article');
    content.innerHTML = text;
    const ct_title = content.querySelector('.content-title');
    document.title = 'M4R14 | ' + ct_title.textContent;
  })