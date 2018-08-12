/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {

  const container = document.createElement('div');

  container.textContent = text;

  return container
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
  where.insertBefore(what, where.firstChild);
} 

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  let arrayOfChildren = [];
  let children = where.children;
  let childrenLength = children.length;
  for (let i = 0; i < childrenLength; i++) {
    if (children[i].nextElementSibling && children[i].nextElementSibling.tagName === 'P') {
      arrayOfChildren.push(children[i])
    }
  }
  return arrayOfChildren
}



/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    let result = [];
    let children = where.children;
    let childrenLength = where.children.length;
    for (let i = 0; i < childrenLength; i++) {
      result.push(children[i].textContent)
    }
    return result
}


/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {

  let childNodes = where.childNodes;

  for (let i = childNodes.length-1; i >= 0; i--) {
    if (childNodes[i].nodeType === 3){
      where.removeChild(childNodes[i])
    }
  } 
}




/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {

  for (let i = 0; i < where.childNodes.length; i++) {
    let child = where.childNodes[i];

    if (child.nodeType === 3) {
      where.removeChild(child); //удаляем ребенка
      i--; // уменьшаем счетчик т.к. все сместилось
    }  
    if (child.childNodes.length>0){
      deleteTextNodesRecursive(child); // вызываем рекурсию
    }
  }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
// function collectDOMStat(where) {
//   let childNodes = where.childNodes;
//   let statistics = {
//     tags: {},
//     classes: {},
//     texts: 0
//   };


//   for (let i = 0; i < childNodes.length; i++) {

//     if (childNodes[i].childNodes) { 					//проверка дочерних элементов дочерних элементов переданного родителя

//       let childsOfChilds = childNodes[i].childNodes;

//       for (let k = 0; k < childsOfChilds.length; k++) {

//         if (childNodes[i].nodeType === 3) {				// сборка инфы о текстовых узлах
//           statistics.texts++
//         }

//         if (childsOfChilds[k].className) { 				// проверка многоимённости класса
//           let names = childsOfChilds[k].className.split(' ');
//           //console.log(`names = ${names.length}`)

//           for (let j = 0; j < names.length; j++) {
//             statistics.classes[names[j]] = + 1
//           }

//         }

//         if (childsOfChilds[k].nodeType === 1) { 			// если это элемент то имя его в статистику
//           statistics.tags[childsOfChilds[k].tagName] = + 1
//         }

//       }
//     }


//     if (childNodes[i].nodeType === 3) {						// сборка инфы о текстовых узлах детей переданного элементв
//       statistics.texts++
//     }
//     if (childNodes[i].className) {							// проверка многоимённости класса
//       let names = childNodes[i].className.split(' ');

//       for (let j = 0; j < names.length; j++) {
//         statistics.classes[names[j]] = + 1
//       }

//       //statistics.classes[childNodes[i].className] =+ 1
//     }
//     if (childNodes[i].nodeType === 1) {						// если это элемент то имя его в статистику
//       statistics.tags[childNodes[i].tagName] = + 1
//     }
//   }
//   console.log(statistics)
//   return statistics
// }


function collectDOMStat(where, obj = {}) {

  obj.tags = obj.tags || {};
  obj.classes = obj.classes || {}; //подправить
  obj.texts = obj.texts || 0;

  for (let i = 0; i < where.childNodes.length; i++) {

    let child = where.childNodes[i];
    let childClasses = child.classList;

    if (child.nodeType === 3) {
      obj.texts++;

    } else {

      if (obj.tags[child.tagName]) {
        obj.tags[child.tagName] = ++obj.tags[child.tagName];
      } else {
        obj.tags[child.tagName] = 1
      }

      if (childClasses.length > 0) {
        for (let childClass of childClasses) {

          if (obj.classes[childClass]) {
            obj.classes[childClass] = ++obj.classes[childClass];
          } else {
            obj.classes[childClass] = 1;
          }
        }
      }
    }

    obj = collectDOMStat(child, obj);

  }

  return obj

}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
