<template>
  <v-content class="mt-15">
    <v-card width="500" class="mx-auto">
      <v-app-bar color="rgba(253, 99, 3, 0.9)">
        <v-toolbar-title>Войти</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-title>
          <v-list-item class="text-caption" link :items="items"
            >Забыли пароль?
          </v-list-item>
        </v-toolbar-title>
      </v-app-bar>
      <div class="px-8 py-4">
        <v-card-title>Добро пожаловать!</v-card-title>

        <v-form ref="sign-in-form">
          <v-text-field
            v-model="user.login"
            :disabled="loading"
            :rules="[$validation.required]"
            outlined
            label="Логин"
            prepend-inner-icon="mdi-account-circle"
          />

          <v-text-field
            v-model="user.password"
            :disabled="loading"
            :rules="[$validation.required]"
            outlined
            label="Пароль"
            :type="show_password ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show_password = !show_password"
          />

          <v-checkbox
            v-model="user.remember"
            :disabled="loading"
            label="Запомнить меня"
          ></v-checkbox>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="rgba(253, 99, 3, 0.9)"
            outlined
            width="100"
            @click="submit"
            >Войти
          </v-btn>

          <v-btn color="rgba(253, 99, 3, 0.9)" outlined to="/register"
            >Зарегистрироваться</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
  </v-content>
</template>



<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      show_password: false,
      items: [
        {
          link: true,
          text: "Забыли пароль?",
        },
      ],
      user: {
        login: "",
        password: "",
        remember: false,
      },
    };
  },
  methods: {
    ...mapActions({
      checkUserData: "Product/CHECK_SIGN_IN",
    }),

    // ...mapMutations(["CHECK_USER_DATA"]),
    async submit() {
      if (!this.$refs["sign-in-form"].validate()) return false;
      this.loading = true;
      await this.checkUserData(this.user);
      this.loading = false;
      console.log("send data");
    },
  },
};
</script>