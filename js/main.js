[
  { filename: 'side-nav', target: 'side-nav' },
  { filename: 'header', target: 'header' },
  { filename: 'footer', target: 'footer' },
  { filename: 'comment', target: 'comment' },
].forEach(info => {
  fetch(`layout/${info.filename}.html`)
    .then(response => response.text())
    .then(text => {
      const content = document.getElementById(info.target);
      content.innerHTML = text;
    })
})