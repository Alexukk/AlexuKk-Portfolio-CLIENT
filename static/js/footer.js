async function initFooter() {
  const footerContainer = document.querySelector('[data-include="footer"]');
  if (!footerContainer) return;

  try {
    // 1. Загружаем сам HTML футера
    const response = await fetch("../templates/footer.html");
    const html = await response.text();
    footerContainer.innerHTML = html;

    // 2. Пробуем получить данные из твоего API
    fetchGitHubData();
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

async function fetchGitHubData() {
  const githubLink = document.getElementById("footer-github");
  const githubName = document.getElementById("github-username");
  const API_URL = "https://localhost:7049/GitHub";

  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      // data.gitHubURL и data.gitHubUseraname из твоего Swagger
      if (githubLink) githubLink.href = data.gitHubURL;
      if (githubName) githubName.innerText = data.gitHubUseraname;
    } else {
      // Заглушка, если АПИ ответило ошибкой
      githubLink.href = "https://github.com/alexukk";
    }
  } catch (err) {
    // Заглушка, если АПИ вообще не запущено
    console.log("API offline, using static GitHub link.");
    if (githubLink) githubLink.href = "https://github.com/alexukk";
  }
}

document.addEventListener("DOMContentLoaded", initFooter);
