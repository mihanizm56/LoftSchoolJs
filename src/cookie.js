/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
// массив кук
let cookieArray = [];


// при загрузке страницы рендерим таблицу с куками и создаём блок для фильтрации
addCokieInTable();
const filterBlock = homeworkContainer.querySelector('#filter-block');
const newList = document.createElement('ul');
filterBlock.appendChild(newList);


// функция для делегирования кликов
function delegateClick(event) {

  if (event.target.dataset.key) {
    console.log('Сработало на удаление')
    deleteCookie(event.target.dataset.key)
    return
  }

  if (event.target.id == 'add-button') {
    console.log('Сработало на добавление')
    addCokie()
    return
  }
}


// функция для добавления кук
function addCokie() {

  let name = addNameInput.value;
  let value = addValueInput.value;

  document.cookie = `${name}=${value}`;
  addCokieInTable();
}


// функция для удаления кук
function deleteCookie(number) {

  document.cookie = number + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  addCokieInTable();
}


// функция превращения кук в объект
function getCookiesInObject() {
  return document.cookie
      .split('; ')
      .reduce((prev,current) => {
        const [name,value] = current.split('=');
        prev[name] = value;

        return prev;
      }, {});
}


// функция обновления таблицы
function addCokieInTable() {
  //console.log(`получили в addCokieInTable name = ${name}, value = ${value}`);
  const cookieObject = getCookiesInObject();
  listTable.innerHTML = ''; //очищаем каждый раз поля таблицы перед загрузкой куки
  
  for (let key in cookieObject) {    

    if (!cookieObject[key]){
      listTable.innerHTML = '';
      console.log('Куки пустые!')
      return
    }

    listTable.innerHTML += `
    <tr>
      <td class="first_td">${key}</td>
      <td>${cookieObject[key]}</td>
      <td>
        <button class="del" data-key="${key}">Удалить</button>
      </td>
    </tr>`;
  }
}


// функция для кей-апа поисковика
function onKeyUp() {

  let cookieObject = getCookiesInObject();
 
  if (!filterNameInput.value) {
      newList.style.display = 'none'
  } else {
    newList.style.display = 'block'

    for (let key in cookieObject) { 
      cookieArray
        .filter(key => isMatching(key, filterNameInput.value))
        .map(key => `${key}`)

      createFilterList(cookieObject) 
    }
  }  
}


// функция для создания поискового списка
function createFilterList(what) {
  newList.innerHTML = '';
  newList.style.border = '1px solid grey';
  console.log(`what = ${what}, length of what = ${what.length}`)

  for (let i = 0; i < what.length; i++) {
    let li = document.createElement('li');
    li.textContent = what[i];
    newList.appendChild(li);
  }
}


//блок слушателей
filterNameInput.addEventListener('keyup', function() {
  onKeyUp()
});

document.addEventListener('click', (event) => {
  delegateClick(event)
});

