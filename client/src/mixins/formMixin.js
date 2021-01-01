export default {
  data: () => ({
    formRules: {
      required: label => v => !!v || `${label} is required`,
      email: v => /.+@.+\..+/.test(v) || 'Invalid email address',
    },
    formValid: false,
    formLoading: false,
  }),
};
