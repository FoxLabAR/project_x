<template>
  <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row class="pt-8">
            <v-spacer></v-spacer>
          <v-avatar size="150">
          </v-avatar>
          <v-spacer></v-spacer>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
           <template v-if="showLoginForm">
             <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              transition="slide-x-transition"
          >
              <v-text-field
                v-model.trim="loginForm.email"
                :rules="emailRules"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="text"
                required
              ></v-text-field>

              <v-text-field
              v-model.trim="loginForm.password"
              :rules="[passRules.required]"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-onepassword"
                type="password"
                required
              ></v-text-field>
            </v-form>
            <v-btn :disabled="!valid" color="success" block @click="login">Log In</v-btn>
            <v-col
            cols="10"
            sm="8"
            md="12"
            class="pa-5"
          >
              <v-row>
                <v-col>
                <a @click="cambiar('reset')">Recuperar Contraseña</a>
                </v-col>
                <v-col >
                  <a  @click="cambiar('signup')">Registrarse</a>
                </v-col>
              </v-row>
            </v-col>
          </template>
          <template v-if="!showLoginForm && !showForgotForm">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              transition="slide-x-transition"
          >
              <v-text-field
              v-model.trim="signupForm.nickname"
              :counter="10"
              :rules="nameRules"
              label="Nombre"
              required
              ></v-text-field>

              <v-text-field
              v-model.trim="signupForm.email"
              :rules="emailRules"
              label="E-mail"
              required
              ></v-text-field>

              <v-text-field
              v-model.trim="signupForm.password"
              :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passRules.required, passRules.min]"
              :type="showpass ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showpass = !showpass"
              ></v-text-field>

              <v-text-field
              v-model="password"
              :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passRules.required, passRules.min]"
              :type="showpass ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showpass = !showpass"
              ></v-text-field>

              <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Debes aceptar los terminos!']"
              label="Aceptas los terminos?"
              required
              ></v-checkbox>
              <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >
              Crear cuenta
              </v-btn>
          </v-form>
          <v-row justify-self="end">
          <v-col
            cols="10"
            sm="8"
            md="12"
          >
                <a  @click="cambiar('login')">Ya estas registrado, ingresa aqui.</a>
            </v-col>
          </v-row>
          </template>
          <template v-if="showForgotForm">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              transition="slide-x-transition"
              >
            <v-text-field
              v-model.trim="passwordForm.email"
              :rules="emailRules"
              label="E-mail"
              required
              ></v-text-field>
              <v-row class="pa-5">
              <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="resetPassword"
              >
              Recurperar cuenta
              </v-btn>
              </v-row>
            </v-form>
            <v-row justify-self="cente">
             <v-col             
             class="pa-5"
              cols="10"
              sm="8"
              md="7"
            >
              <v-row>
                <a @click="cambiar('login')">Ingresar</a>
                <v-spacer></v-spacer>
                <a  @click="cambiar('signup')">Registrarse</a>
              </v-row>
            </v-col>
            </v-row>
          </template>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
      >
        {{ text }}
        <v-btn
          color="red"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-overlay :value="loader" opacity="70">
        <v-row justify="space-around"
          class="pa-md-4 mx-lg-auto"
          style="padding-top: 50px">
          <v-container>
            <v-img  :src="imagen"></v-img>
          </v-container>
        </v-row>
      </v-overlay>
    </v-container>
  </v-content>
</template>

<style scoped>
#style-1::-webkit-scrollbar-thumb {
    background-color: #F90;
    background-image: -webkit-linear-gradient(90deg, rgba(255, 255, 255, .2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, .2) 50%,
                        rgba(255, 255, 255, .2) 75%,
                        transparent 75%,
                        transparent)
  }
</style>

<script>
import firebase from 'firebase'
const db = require('../db.js')

export default {
  data: () => ({
    name: 'login',
    imagen: 'https://66.media.tumblr.com/559e520222d3f4fb5daaec4ae44a4183/tumblr_oxuofmtjsj1rwpmxno2_400.gifv',
    showLoginForm: true,
    showSignupForm: false,
    showForgotForm: false,
    passwordResetSuccess: false,
    performingRequest: false,
    log: true,
    multiLine: true,
    snackbar: false,
    loader: false,
    text: '',
    valid: true,
    nameRules: [
      v => !!v || 'Se requiere un Nombre',
      v => (v && v.length <= 10) || 'Minimo 10 caracteres'
    ],
    password: '',
    showpass: false,
    passRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('El correo y contraseña no coinciden')
    },
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+\..+/.test(v) || 'E-mail no valido'
    ],
    checkbox: false,
    loginForm: {
      email: '',
      password: ''
    },
    signupForm: {
      nickname: '',
      email: '',
      password: ''
    },
    passwordForm: {
      email: ''
    }
  }),
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.loader = false
      }, 3000)
    }
  },
  methods: {
    login () {
      this.loader = true
      firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then((user) => {
        this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile')
        this.$router.replace({ name: 'Home' })
      }).catch(err => {
        this.loader = false
        this.text = err
        this.snackbar = true
        console.log(err)
      })
    },
    cambiar (item) {
      if (item === 'login') {
        this.showLoginForm = true
        this.showSignupForm = false
        this.showForgotForm = false
      }
      if (item === 'signup') {
        this.showLoginForm = false
        this.showSignupForm = true
        this.showForgotForm = false
      }
      if (item === 'reset') {
        this.showLoginForm = false
        this.showSignupForm = false
        this.showForgotForm = true
      }
    },
    validate () {
      this.$refs.form.validate()
      if (this.valid) {
        this.signup()
      }
    },
    signup () {
      this.loader = true
      firebase.auth().createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then((user) => {
        this.$store.commit('setCurrentUser', user.user)
        db.usuariosDB.doc(user.user.uid).set({
          apellido:"",
          nombre: this.signupForm.nickname,
          direccion: "",
          localidad: "",
          email: this.signupForm.email,
          pedidos:[],
          telefono:"" 
        }).then(() => {
          this.$store.dispatch('fetchUserProfile')
          this.text = 'Se creo con exito'
          this.snackbar = true
          this.$router.replace({ name: 'register' })
        }).catch(err => {
          this.loader = false
          this.text = err
          this.snackbar = true
          console.log(err)
        })
      }).catch(err => {
        this.loader = false
        this.text = err
        this.snackbar = true
        console.log(err)
      })
    },
    resetPassword () {
      this.loader = true
      firebase.auth().sendPasswordResetEmail(this.passwordForm.email).then(() => {
        this.performingRequest = false
        this.passwordResetSuccess = true
        this.passwordForm.email = ''
      }).catch(err => {
        this.loader = false
        this.text = err
        this.snackbar = true
        console.log(err)
        this.performingRequest = false
        this.errorMsg = err.message
      })
    }
  }
}
</script>
