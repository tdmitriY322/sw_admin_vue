const validation = {
  required(v) {
    return !!v || 'Поле обязательно для заполнения';
  },
  check_length(v, message) {
    return (v && v.length > 0) || "Поле "+ message +" обязательно для заполнения"; 
  },
  create_password(v) {
    return v => /([!@$%])/.test(v) || 'Пароль должен содердать один из этих символов[!@#$%]',
      (v && v.length >= 5) || 'Пароль должен быть более 5 символов',
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Пароль должен содержать символы верхнего и нижнего регистра, спецсивол и цифры';
  },
  reenter_passwword(v) {
    return !!v || 'Нужно ввести пароль повторно';

  },
  create_login(v) {
    return !!v || 'Поле обязательно для заполнения';
  },
  email(v) {
    return /.+@.+/.test(v) || 'E-mail должен быть формата "user@gmail.com"';
  },
  tel_number(v) {
    return /\d/.test(v) && v !== "+";
  }
};

export default {
  install(Vue) {
    Vue.prototype.$validation = validation;
  }
}