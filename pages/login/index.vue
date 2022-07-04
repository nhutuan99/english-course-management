<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="mx-auto" max-width="500">
          <div class="container-text"><span>Login</span></div>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Email"
                ref="email"
                v-model="email"
                :rules="[() => !!email || 'This field is required']"
                prepend-inner-icon="mdi-email"
                type="email"
                class="rounded-0"
                clearable
                @keyup.exact="handleKeyUp"
              ></v-text-field>
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                @click:append="show3 = !show3"
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'This field is required']"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                class="rounded-0"
                clearable
                @keyup.exact="handleKeyUp"
              ></v-text-field>
              <p class="text-error">{{ messageError }}</p>
              <div class="btn-login">
                <v-btn depressed color="primary" right @click="submit"
                  >Login</v-btn
                >
              </div>
            </v-form>
          </v-card-text>

          <div class="other text_center pb_2">
            <span>
              Have an account?
              <nuxt-link to="/register">Register Here</nuxt-link>
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      email: null,
      password: null,
      messageError: '',
      isLogin: true
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    submit() {
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      this.$store
        .dispatch('authenticate', {
          email: this.email,
          password: this.password,
          isLogin: true
        })
        .then((res) => {
          if (res.success) this.$router.push('/decks')
        })
        .catch((e) => {
          console.log(e.message)
          return (this.messageError = e.data.error.message)
        })
    },
    handleKeyUp() {
      this.messageError = ''
      console.log('handle key up')
    }
  }
}
</script>

<style lang="css" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.container-text {
  width: 100%;
  background: whitesmoke;
  display: block;
  padding: 10px 0;
}
.container-text span {
  color: #000;
  font-size: 22px;
  line-height: 1.4;
  margin-left: 20px;
}
.btn-login {
  margin-top: 50px;
  text-align: right;
}
.text-error {
  color: red;
  opacity: 0.8;
}
</style>
