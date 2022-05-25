export default {
  header: {
    title: 'Заголовок',
    registration: 'Регистрация',
    login: 'Вход',
    goBack: 'Назад',
  },
  main: {
    header: 'Доски',
    add: 'Добавить доску',
    search: 'Поиск',

  
    edit: 'Редактировать доску',

    deleteConfirmation: 'Удалить доску?',
    contributors: 'Участники',

  },
  loginForm: {
    header: 'Вход',
  },
  registrationForm: {
    header: 'Регистрация',
  },
  welcome: {
    header: 'Trello-clone помогает командам эффективно решать рабочие задачи.',
    main: `Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным уникальным способом вместе с Trello-clone.`,
    button: {
      registration: `Зарегистрироваться`,
    },
    about: {
      team: { name: 'Команда', description: 'Что-то о команде' },
      alice: 'Что-то',
      dmitriy: 'Что-то',
      timur: 'Что-то',
    },
  },
  notFound: {
    header: '404: Страница не найдена',
    goHome: 'На главную страницу',
  },
  error: {
    text: 'Ой! Все пошло не по плану!',
    button: 'Попробовать еще раз',
  },
  userForms: {
    login: 'Логин',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    email: 'Почта',
    name: 'Имя',
    isShort: '{{field}} слишком короткий!',
    isLong: '{{field}} слишком длинный!',
    isRequired: '{{field}} - значение необходимо',
    isInvalid: '{{field}} недопустимое значение',
    passwordRequirements: 'Пароль может содержать только латинские буквы и цифры',
    matchPasswords: 'Пароли должны совпадать!',
    reset: 'Сброс',
    submit: 'Создать',
    delete: 'Удалить пользователя',
    enter: 'Вход',
    showPassword: 'Показать пароль',
    unknownError: 'Неизвестная ошибка. Попробуйте, пожалуйста, позже',
    invalidLoginOrPassword: 'Неверная пара логин и пароль.',
    duplicateUser: 'Пользователь создан ранее!',
    userNotFound: 'Пользователь не найден!',
    createUser: 'Создать пользователя',
    deleteConfirmation: 'Удалить пользователя "{{login}}"',
    logoutConfirmation: 'Выйти из учетной записи "{{login}}"',
  },
  userMenu: {
    logout: 'Выйти',
    edit: 'Настроить',
    delete: 'Удалить пользователя',
  },
  modal: {
    closeModal: 'Закрыть диалог',
    confirmHeader: 'Подтвердить следующее действие?',
    confirm: 'Подтвердить',
    deny: 'Отменить',
  },

  column: {
    button: '+ Добавьте еще одну колонку',
    delete: 'Удалить колонку',
    add: 'Добавить?',
  },
  task: {
    deleteTask: 'Удалить задачу "{{title}}"',
    title: 'Название',
    description: 'Описание',
    fieldIsRequired: 'Информация необходима',
    titleIsShort: 'Название слишком короткое',
    titleIsLong: 'Название слишком длинное. Переместите подробности в описание',
    descriptionIsLong: 'Описание слишком длинное.',
    addTask: 'Добавить задачу',
  },
};
