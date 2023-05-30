import * as yup from 'yup'

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(/^[a-zA-Z0-9 ]*$/, 'Name must not contain special characters')
})
