[
  { filename: 'header', target: 'header' },
  { filename: 'footer', target: 'footer' },
].forEach(info => {
  fetch(`layout/${info.filename}.html`)
    .then(response => response.text())
    .then(text => {
      const content = document.getElementById(info.target);
      content.innerHTML = text;
    })
})

fetch(`layout/side-nav.html`)
  .then(response => response.text())
  .then(text => {
    const content = document.getElementById('side-nav');
    content.innerHTML = text;
    fetch(`content/content.json`)
      .then(response => response.json())
      .then(articles => {
        const tags_ul = content.querySelector('.tags ul')
        const archives = content.querySelector('.archives ul')
        let tags = [];
        let dataTime_list = [];
        articles.forEach(article => {
          article.tag.forEach(atg => {
            if(!tags.find((tag) => tag === atg)){
              tags_ul.appendChild(createTag('tag', atg));
              tags.push(atg);
            }
          })
          const article_dataTime = moment(article.dataTime);
          if(!dataTime_list.find((dataTime) => dataTime == article_dataTime.year())){
            archives.appendChild(createTag('archive', article_dataTime.year()));
            dataTime_list.push(article_dataTime.year());
          }
        });
      })
  })

const createTag = (qury, tagName) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `?${qury}=${tagName}`;
  a.textContent = tagName;
  li.appendChild(a);

  return li;
}
