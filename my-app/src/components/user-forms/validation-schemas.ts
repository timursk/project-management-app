import i18n from '../../localization/i18n';
import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
  login: yup
    .string()
    .min(2, i18n.t('userForms.isShort', { field: i18n.t('userForms.login') }))
    .max(50, i18n.t('userForms.isLong', { field: i18n.t('userForms.login') }))
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.login') })),

  password: yup
    .string()
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.password') })),
});

export const registrationValidationSchema = yup.object().shape({
  login: yup
    .string()
    .min(2, i18n.t('userForms.isShort', { field: i18n.t('userForms.login') }))
    .max(50, i18n.t('userForms.isLong', { field: i18n.t('userForms.login') }))
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.login') })),
  name: yup
    .string()
    .max(50, i18n.t('userForms.isLong', { field: i18n.t('userForms.name') }))
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.name') })),
  password: yup
    .string()
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.password') }))
    .min(6, i18n.t('userForms.isShort', { field: i18n.t('userForms.password') }))
    .matches(/[a-zA-Z0-9]/, i18n.t('userForms.passwordRequirements')),
  passwordConfirmation: yup
    .string()
    .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.passwordConfirmation') }))
    .oneOf([yup.ref('password'), null], i18n.t('userForms.matchPasswords')),
});
