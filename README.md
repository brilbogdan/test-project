# class UserInfo
Данный класс служит для получения информации о пользователе, выведение ее на экран. И дает возможность пользователю пополнять свой аккаунт

В виде аргументов класс принимает два элемента
**userElem** - wrapper - в котором находиться элементы куда выводиться информация о пользователе.
**popUpelem** - pop-up - в котором находиться информация с возможными вариантами пополнения аккаунта пользователя.

## Методы

### Обработчики кликов
---
**handleTopUpClick** - обработка клика кнопки "Top Up". Вызывает открытые pop-up с вариантами пополнения и запуском метода getAmountInfo;
***
**handleLinkToCopyClick** - обработка клика на ссылку с кодом пополнения - Служит для копирования номера пополнения в буфер браузера.
***
**handleTopUpClickClose** - обработка клика кнопки "Close" в pop-up. При клике очищается содержимое pop-up + закрывается pop-up.
***

### Обработчики запросов
---
**getUserInfo** - обработка запроса на сервер для получения информации о пользователе. Ожидаемые данные - Имя Пользователя и его баланс 
счета.При успешной обработке запроса информация выводиться в элементы div.user__name (имя пользователя) и div.user__amount (сумма баланса)
***
**getAmountInfo** - обработка запроса на сервер для получения возможных вариантов пополнения счета аккаунта. Ожидаемые данные - Массив объектов
,в которых содержится информация о пополнениях. При успешной обработке запроса выводится информация о пополнениях в элемент 
div.amount__wrapper
***

### Вспомогательный метод
---
**createAmountLine** - Служит для создания линии с платежом. В качестве аргументов принимает 
* cost - Номинал платежа
* hash - hash платежа, который используется в пополнение пользователем.
  
