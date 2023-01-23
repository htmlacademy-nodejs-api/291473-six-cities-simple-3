# Личный проект «Шесть городов (простой)»

* Студент: [Дмитрий Кречетников](https://up.htmlacademy.ru/nodejs-api/3/user/291473).
* Наставник: [Глеб Клецков](https://htmlacademy.ru/profile/id1487865).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).

## Методы для реализации сценариев

## 1. Offer

- Создание предложения (`create`);
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

- Получение предложения по ID (`findById`);
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  
- Получение списка предложений (`find`);
  find(): Promise<DocumentType<OfferEntity>[]>;

- Удаление предложения по идентификатору (`deleteById`);
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

- Обновление предложения (`updateById`);
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;

- Получение списка новых предложений (`findNew`);
  findNew(count: number): Promise<DocumentType<OfferEntity>[]>;

- Получение списка обсуждаемых предложений (`findDiscussed`);
  findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]>;

- Обновление свойства «CommentsCount» (`incCommentCount`);
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;

- Проверка существования предложения (`exists`).
  exists(documentId: string): Promise<boolean>;

- Обновление свойства «RatingCount» (`incRatingCount`)
  incAverageRatingCount(offerId: string, rating: number, ratingCount: number, count: number): Promise<DocumentType<OfferEntity> | null>;

## 2. User

- Создание пользователя (`create`);
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

- Получение пользователя по Email (`findByEmail`);
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

- Получение / создание пользователя (`findOrCreate`);
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

- Обновление пользователя по ID (`updateById`).
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;

## 3. Comment

- Создание комментария (`create`);
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;

- Получение комментариев по ID предложения (`findByOfferId`);
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;

- Удаление комментариев по ID предложения (используется при удалении предложения) (`deleteByOfferId`).
  deleteByOfferId(offerId: string): Promise<number | null>;