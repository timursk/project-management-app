export default {
  header: {
    title: 'PMA',
    registration: 'Sign up',
    login: 'Sign in',
    goBack: 'Back',
    create: 'Add board',
    goMain: 'Go to Main Page',
    goMainCut: 'Main',
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
      registration: `Sign up`,
    },
    about: {
      team: {
        name: 'Team',
        description:
          'Our team was gathered to solve a team task in the course "Development on React" from RS School',
      },
      alice: 'authorization and user menu, task card, modal confirmation window',
      dmitriy: 'Header component, footer, board page, collumns, welcome page, routing',
      timur: "Teamlead, application structure, drag'n'drop, main page with boards",
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
    guestLogin: 'Enter as a guest',
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
    add: 'Add column',
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
