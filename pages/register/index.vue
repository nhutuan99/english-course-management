<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="mx-auto" max-width="500">
          <div class="container-text"><span>Register</span></div>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="User Name"
                class="rounded-0"
                ref="fullname"
                v-model="fullname"
                type="text"
                prepend-inner-icon="mdi-account"
                clearable
                :rules="[() => !!fullname || 'This field is required']"
                @keyup.exact="handleKeyUp"
              ></v-text-field>
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
              <v-text-field
                prepend-inner-icon="mdi-lock-open"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                @click:append="show3 = !show3"
                ref="confirmPassword"
                v-model="confirmPassword"
                :rules="[() => !!confirmPassword || 'This field is required']"
                label="Confirm Password"
                name="confirmPassword"
                class="rounded-0"
                clearable
                @keyup.exact="handleKeyUp"
              ></v-text-field>
              <p class="text-error">{{ messageError }}</p>
              <div class="btn-register">
                <v-btn depressed color="primary" right @click="submit"
                  >Register</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
          <div class="other text_center pb_2">
            <span>
              Have an account?
              <nuxt-link to="/login">Login Here</nuxt-link>
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
      email: '',
      fullname: '',
      password: '',
      confirmPassword: '',
      messageError: ''
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        confirmPassword: this.confirmPassword
      }
    }
  },
  methods: {
    submit() {
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })

      if (this.password !== this.confirmPassword) {
        return (this.messageError = 'Confirm Password is Wrong')
      } else {
        this.$store
          .dispatch('authenticate', {
            fullname: this.fullname,
            email: this.email,
            password: this.password
          })
          .then((res) => {
            if (res.success) this.$router.push('/')
          })
          .catch((e) => {
            return (this.messageError = e.data.error.message)
          })
      }
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
.btn-register {
  margin-top: 50px;
  text-align: right;
}
.text-error {
  color: red;
  opacity: 0.8;
}
</style>
