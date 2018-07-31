import { get } from "http";

/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i],i,array)
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    newArr[i] = fn(array[i],i,array)
  };
  return newArr
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var x = initial || array[0],
    i = initial ? 0 : 1;

  for (; i < array.length; i++) {
    x = fn(x, array[i], i, array);
  }

  return x;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = [];
  for (let key in obj){
    array.push(key.toUpperCase())
  }
  return array
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
// function slice(array, from, to) {
//   let arr = [];
//   if (from === 0 || from < 0){
//     console.error('Первый номер массива 1!')
//   }
//   else if(array.length===0){
//     console.error('Ваш массив пустой!')
//   }
//   else if(to < from || to<1){
//     console.error('Введите правильный конечный номер массива!')
//   }
//   else{
//     for (let i = from - 1; i < to; i++) {
//       arr.push(array[i])
//     }
//   }
//   return arr
// }

// function slice(array, from, to = array.length - 1) {
//   let arr = [];
//   if (array.length === 0) {
//     console.error('Ваш массив пустой!')
//   }
//   else if (to < from || to < 1 || !array[to]) {
//     console.error('Введите правильный конечный номер массива!')
//   }
//   else if (from < 0) {
//     if (array.length + from < 0) {
//       console.error('Введите правильный начальный номер массива')
//     }
//     else {
//       for (let i = array.length + from; i <= to; i++) {
//         arr.push(array[i])
//       }
//     }
//   }
//   else if (to < 0) {
//     if (array.length + to < 0) {
//       console.error('Введите правильный конечный номер массива')
//     }
//     else {
//       for (let i = from; i <= array.length + to; i++) {
//         arr.push(array[i])
//       }
//     }
//   } 
//   else {
//     for (let i = from; i <= to; i++) {
//       arr.push(array[i])
//     }
//   }
//   return arr
// }

function slice(array, from = 0, to = array.length - 1) {
  let i = from;
  let finish = to;
  console.log(`i = ${i} finish = ${finish}`)
  let result = [];
  if (array.length == 0) {
    return []
  }

  if (from < 0) {
    if (array.length + i < 0) {
      console.log('mistake 1')
      return []
    }
    else {
      i = array.length + i
    }
  }

  if (finish < 0) {
    if (array.length + finish < 0) {
      console.log('mistake 2')
      return []
    }
    else {
      finish = array.length + finish
    }
  }

  if (finish < i || !array[finish] || !array[i]) {
    console.log('mistake 3')
    return []
  }

  for (i; i <= finish; i++) {
    result.push(array[i]);
  }

  return result;

}


/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
