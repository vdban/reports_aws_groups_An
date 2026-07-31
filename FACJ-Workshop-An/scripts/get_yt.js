const url = 'https://www.youtube.com/watch?v=FKtMkUqyny4';
fetch(url)
  .then(res => res.text())
  .then(html => {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descMatch = html.match(/<meta name="description" content="(.*?)">/i);
    const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)">/i);
    console.log("TITLE:", titleMatch ? titleMatch[1] : "not found");
    console.log("DESC:", descMatch ? descMatch[1] : "not found");
    console.log("KEYWORDS:", keywordsMatch ? keywordsMatch[1] : "not found");
  })
  .catch(err => console.error(err));
