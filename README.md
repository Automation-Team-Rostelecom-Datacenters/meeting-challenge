# Поиск свободных временных интервалов


Задача состоит в том, чтобы найти все свободные интервалы времени среди расписания событий двух пользователей в рамках заданного диапазона.

Расписание событий представляет собой массив объектов, каждый из которых содержит в себе информацию о времени начала события и конца.

Пользовательский интерфейс должен состоять из веб-формы с полем для ввода продолжительности события (в минутах) и зоны результатов поиска.

Для поля добавить валидацию на превышение диапазона.

![Form](https://res.cloudinary.com/dp0w4hpzi/image/upload/c_scale,w_396/v1576762064/form_eflesi.png)

В рамках данного задания использовать заданный диапазон в качестве константного значения:


```javascript
const  start  =  new Date('2019-12-20T08:00:00+03:00');
const  end  =  new Date('2019-12-20T18:00:00+03:00');
```

Расписания событий пользователей хранятся в отдельных `json` файлах.

Желательно использовать для решения Angular, но можно и чистый JavaScript.

Решение нужно разработать в отдельной ветке и отправить в виде pull request.
