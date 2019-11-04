const http = require("http");

const server = http.createServer();
const js = `
const name = document.querySelector("#name");
const email = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", function() {
    let savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      savedFormData = JSON.parse(savedFormData);
      name.value = savedFormData.name;
      email.value = savedFormData.email;
      localStorage.removeItem("formData");
      localStorage.clear();
    }
  
    window.addEventListener("beforeunload", e => {
      if (name.value.length || email.value.length) {
        let formData = {
          name: name.value,
          email: email.value
        };
        localStorage.setItem("formData", JSON.stringify(formData));
      }
    });
  });
`;

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <form action="GET">
        <input type="text" id="name">
        <input type="email" name="email" id="email">
    </form>
    <script src="index.js"></script>
</body>

</html>
`;

server.on("request", (req, res) => {
  //   res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  //   res.end(html, js);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(html);

    case "/index.js":
      res.writeHead(200, { "Content-type": "text/javascript" });
      res.end(js);
  }
});

server.listen(3000, () => console.log("Server is working on port 3000..."));
