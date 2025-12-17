async function includeComponents() {
  const elements = document.querySelectorAll("[data-include]");

  for (const el of elements) {
    const componentName = el.getAttribute("data-include");
    // Путь относительно index.html к файлу компонента
    const path = `./${componentName}.html`;

    try {
      const response = await fetch(path);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        console.error(`Ошибка загрузки: ${componentName}`);
      }
    } catch (err) {
      console.error(`Ошибка сети:`, err);
    }
  }
}

// Запускаем сборку сразу при открытии страницы
document.addEventListener("DOMContentLoaded", includeComponents);
