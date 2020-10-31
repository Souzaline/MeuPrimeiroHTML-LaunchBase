const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

const blogs = require("./data");

const treinamentos = require("./traine")

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
});

server.get("/", function (req, res) {
  return res.render("work");
});

server.get("/about", function (req, res) {
    
  const about = {
    avatar_url: "https://media-exp1.licdn.com/dms/image/C560BAQFU-ZKLLdANXg/company-logo_200_200/0?e=1607558400&v=beta&t=R5QST0L3-ipDycK-PopVmDKZuxXDYMVaajvuwDPiTcI",
    name: "Rocketseat",
    role: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
    description: "Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível 🚀 Em um mundo onde a informação fica obsoleta cada vez mais rápido, velocidade de aprendizado é a chave para o sucesso. Por isso a Rocketseat oferece através de uma plataforma inteligente e metodologia prática, além de comunidade, eventos, conteúdo e conexão com o mercado de trabalho, todas as ferramentas que você precisa para masterizar no menor tempo possível as tecnologias mais modernas de desenvolvimento web e mobile, e dessa forma avançar para o próximo nível como programador.",
    links: [
      { name: "Github", url: "https://github.com/rocketseat-education" },
      { name: "Linkedin", url: "https://www.linkedin.com/school/rocketseat/" },
      { name: "Facebook", url: "https://www.facebook.com/rocketseat" },
    ],
  };

  return res.render("about", { about });
});

server.get("/blogs", function (req, res) {
  return res.render("blogs", { items: blogs });
});

server.get("/treinamentos", function (req, res) {
    return res.render("treinamentos", {items: treinamentos});
});

server.get("/curso", function (req, res) {
  const id = req.query.id;
    const curso = treinamentos.find(function (curso) {
      return curso.id == id;
    });

    if (!curso) {
      return res.send("Traine not found");
    }

    return res.render("curso", { item: curso });
});

server.use(function (req, res) {''
  res.status(404).render("not-found");
});

// Criar porta
server.listen(3333, function () {
  console.log("server is running");
});
