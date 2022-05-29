export default {
  header: {
    title: 'Final task!',
    registration: 'Sign up',
    login: 'Sign in',
    goBack: 'Back',
    create: 'Add board',
    goMain: 'Go to Main Page',
  },
  main: {
    header: 'Boards',
    add: 'Add board',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    deleteConfirmation: 'Delete board?',
    contributors: 'Contributors',
  },
  loginForm: {
    header: 'Sign in:',
  },
  registrationForm: {
    header: 'Sign up',
  },
  welcome: {
    header: 'Trello-clone helps teams move work forward.',
    main: `Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello-clone.`,
    button: {
      registration: `Sign up-it's free!`,
    },
    about: {
      team: { name: 'Team', description: 'Something about team' },
      alice: 'some',
      dmitriy: 'some',
      timur: 'some',
    },
  },
  notFound: {
    header: '404: Page not found',
    goHome: 'Main page',
  },
  error: {
    text: 'Oops, something went wrong',
    button: 'Try again',
  },
  userForms: {
    login: 'Login',
    password: 'Password',
    passwordConfirmation: 'Password confirmation',
    email: 'E-mail',
    name: 'Name',
    isShort: '{{field}} is too short!',
    isLong: '{{field}} is too  long!',
    isRequired: '{{field}} is required',
    isInvalid: '{{field}} is invalid',
    passwordRequirements: 'Password can only contain Latin letters and numbers',
    matchPasswords: 'Passwords must match',
    reset: 'Reset',
    submit: 'Submit',
    delete: 'Delete user',
    enter: 'login',
    showPassword: 'Show password',
    unknownError: 'Unknown error. Please try later',
    invalidLoginOrPassword: 'Wrong login or password.',
    duplicateUser: 'User already exists!',
    userNotFound: 'User not found!',
    createUser: 'Create user',
    deleteConfirmation: 'Delete user "{{login}}"',
    logoutConfirmation: 'Logout user "{{login}}"',
  },
  userMenu: {
    logout: 'Logout',
    edit: 'Edit',
    delete: 'Delete user',
  },
  modal: {
    closeModal: 'Close modal dialog',
    confirmHeader: 'Confirm this action?',
    confirm: 'Confirm',
    deny: 'Deny',
  },

  column: {
    button: '+ Add another column',
    delete: 'Delete column',
    add: 'Add?',
  },
  task: {
    deleteTask: 'Delete task "{{title}}"',
    title: 'Title',
    description: 'Description',
    fieldIsRequired: 'Information is required',
    titleIsShort: 'Title is too short',
    titleIsLong: 'Title is too long. Use description for details',
    descriptionIsLong: 'Description is too long.',
    addTask: 'Add new task',
  },
  errors: {
    noColumn: 'Wrong target collumn',
    noBoard: 'Wrong target board',
    wrongPath: 'Path not found',
    tokenExpired: 'Unauthorized access denied',
    unknownError: 'Unknown server error',
    cardWithoutUser: 'Some tasks are assigned to a non-existent user',
  },
};
