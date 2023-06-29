<template>
  <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row class="pt-8">
            <v-spacer></v-spacer>
          <v-avatar size="120">
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
          <template v-if="fase == true">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              transition="slide-x-transition"
          >
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
          </template>
          <template v-if="fase == false">
            <v-col>
               <v-form
            ref="form"
            >
            <v-text-field
            v-model="usuario.apellido"
            label="Apellido"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.nombre"
            label="Nombre"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.email"
            label="Email"
            disabled
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.telefono"
            label="Telefono"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.direccion"
            label="Direccion"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.localidad"
            label="Localidad"
            required
            ></v-text-field>
           </v-form>
            </v-col>
            <v-col>
            </v-col>
          </template>
          <v-row justify-self="end">
            <v-col
                cols="10"
                sm="8"
                md="12"
            >
                    <a  @click="Ingresar">Ya estas registrado, ingresa aqui.</a>
                </v-col>
          </v-row>
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
    fase: true,
    usuario: {
      apellido: '',
      nombre: '',
      direccion: '',
      localidad: '',
      email: '',
      telefono: '',
      ubicacion: ''
    },
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
    signupForm: {
      nickname: '',
      email: '',
      password: ''
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
    showSnackbar () {
      this.$snackbar.showMessage({ content: 'Hello, Fer', color: 'info' })
    },
    validate () {
      this.$refs.form.validate()
      if (this.valid) {
        this.signup()
      }
    },
    datosPersonales () {
        db.usuariosDB.doc(this.$store.state.currentUser.uid).update(
          this.usuario
        ).then(() => {
          this.$store.state.userProfile = this.usuario
          this.text = 'Tus datos han sido actualizados'
          this.snackbar = true
          this.disable = true
          this.estado = "Bienvenido "+ this.usuario.nombre
          this.color = "teal"
          this.$router.replace({ name: 'Home' })
       })
    },
    Ingresar(){
      this.$router.replace({ name: 'Login' })
    },
    signup () {
        this.fase = false
    }
  }
}
</script>
