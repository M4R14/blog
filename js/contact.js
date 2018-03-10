const handleMailBody = (elem) => {
  const articleTitle = document.getElementsByClassName('content-title')[0];
  const mailContact = document.getElementById('btn-mail-contact');
  mailContact.dataset.subject = 'Blog - ' + articleTitle.textContent;
  mailContact.dataset.body = 'จาก: '+ document.location.href;
}
const handleClickContact = (elem) => {
  const { mailTo, subject, body } = elem.dataset;
  const a = document.createElement('a');
  a.href = `mailto:${mailTo}?Subject=${subject}&body=${body}`;
  a.click();
}