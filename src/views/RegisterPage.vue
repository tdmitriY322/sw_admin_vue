<template>
  <v-card class="mx-auto pa-5 align-center justify-center" max-width="500">
    <v-card-title class="text-h6 font-weight-regular justify-center">
      <span>{{ currentTitle }}</span>
    </v-card-title>

    <v-window v-model="step">
      <v-form ref="register-form">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              :rules="[$validation.required, $validation.email]"
              required
              outlined
              label="E-mail"
              v-model="newUser.email"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Этот e-mail будет вашим логином для входа на сайт
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              v-model="newUser.password"
              :rules="[$validation.required, $validation.create_password]"
              required
              outlined
              label="Пароль"
              type="password"
            ></v-text-field>
            <v-text-field
              required
              outlined
              :rules="[$validation.required, $validation.reenter_passwword]"
              label="Повторите пароль"
              v-model="newUser.check_password"
              type="password"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Введите пароль для вашего аккаунта
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field
              :rules="[$validation.required]"
              required
              outlined
              label="ФИО"
              v-model="newUser.fullname"
              type="name"
            ></v-text-field>
            <v-text-field
              required
              outlined
              :rules="[$validation.required, $validation.tel_number]"
              label="Номер телeфона"
              v-model="newUser.tel"
              type="tel"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Введите имя и номер своего теелфона
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <v-card-text>
            <v-btn
              block
              class="white--text"
              @click="submit"
              color="rgba(253, 99, 3, 0.9)"
              to="/signIn"
            >
              Вернуться на главную
            </v-btn>
          </v-card-text>
        </v-window-item>
      </v-form>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        outlined
        @click="step--"
        color="rgba(253, 99, 3, 0.9)"
      >
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 4"
        depressed
        @click="step++"
        color="rgba(253, 99, 3, 0.9)"
        class="white--text"
      >
        Дальше
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    step: 1,
    newUser: {
      email: "",
      password: "",
      check_password: "",
      tel: "",
      fullname: "",
    },
  }),
  methods: {
    ...mapActions({
      checkUserData: "Product/CHECK_SIGN_IN",
    }),

    // ...mapMutations(["CHECK_USER_DATA"]),
    async submit() {
      if (!this.$refs["register-form"].validate()) return false;
      this.loading = true;
      await this.checkUserData(this.user);
      this.loading = false;
      console.log("send data");
    },
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Регистрация";
        case 2:
          return "Придумайте пароль";
        case 3:
          return "Введите свои данные";
        default:
          return "Спасибо за регистраию!";
      }
    },
  },
};
</script>