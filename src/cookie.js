let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map(cookie => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;

      return obj;
    }, {});
}

function isMatching(full, chunk) {
  if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
    return true;
  } else {
    return false;
  }
}

// при первой загрузке
renderTable();

// Удаление
listTable.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.dataset.key) {
    document.cookie = e.target.dataset.key + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
  renderTable();
});

// Поиск в объекте
filterNameInput.addEventListener('keyup', function () {
  renderTable();
});

// Добавление куки
addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
  renderTable();
});

// функция рендеринга
function renderTable() {
  const cookie_obj = getCookies();
  listTable.innerHTML = '';
  for (let key in cookie_obj) {
    if (!(isMatching(key, filterNameInput.value) || isMatching(cookie_obj[key], filterNameInput.value))) continue;
    listTable.innerHTML += `<tr><td class="first_td">${key}</td><td>${cookie_obj[key]}</td><td><button class="del" 
        data-key="${key}">Удалить</button></td></tr>`;
  }
}
