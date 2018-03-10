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

if(content){
  fetch(`content/${content}/info.json`)
    .then(response => response.json())
    .then(info => {
      const article_tags = document.getElementById('article-tag');
      info.tag.forEach(tag => {
        const a = document.createElement('a');
        a.href = `?tag=${tag}`;
        const span = document.createElement('span');
        span.textContent = tag;
        span.className = "badge badge-light";
        a.appendChild(span);
        article_tags.appendChild(a);
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
}

const tag = getQuery('tag');
if(tag){
  fetch(`content/content.json`)
    .then(response => response.json())
    .then(content_list => {
      const article_tags = document.getElementById('article');
      const ul = document.createElement('ul');
      content_list.forEach(content => {
        if(content.tag.find(con_tag => con_tag == tag)){
          article_tags.appendChild(card(content))
        }
      })
      article_tags.appendChild(ul);
    })
}

const card = (info) => {
  const div = document.createElement('div');
  div.className = "card mb-3";
  div.innerHTML =  `
    <div class="card-body">
      <h5 class="card-title">
        <a href="?content=${info.filename}">${info.title}</a>
      </h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>`;
  return div;
}