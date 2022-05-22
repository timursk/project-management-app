import i18n from '../../../../localization/i18n';
import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, i18n.t('task.titleIsShort'))
    .max(100, i18n.t('task.titleIsLong'))
    .required(i18n.t('task.fieldIsRequired', { field: i18n.t('task.title') })),
  description: yup
    .string()
    .max(500, i18n.t('task.descriptionIsLong'))
    .required(i18n.t('task.fieldIsRequired', { field: i18n.t('task.description') })),
});
