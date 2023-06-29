<template>
    <v-container>
        <v-row justify-self="center">
        <v-col cols="11" md="4" class="ml-6" >
          <v-container>            
            <v-form
            ref="form"
            >
            <v-text-field
            v-model="usuario.apellido"
            label="Apellido"
            :disabled="disable"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.nombre"
            label="Nombre"
            :disabled="disable"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.email"
            label="Email"
            :disabled="disable"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.telefono"
            label="Telefono"
            :disabled="disable"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.direccion"
            label="Direccion"
            :disabled="disable"
            required
            ></v-text-field>
            <v-text-field
            v-model="usuario.localidad"
            label="Localidad"
            :disabled="disable"
            required
            ></v-text-field>
           </v-form>
          </v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn text :color="color" @click="cambiar">
                {{ estado }}
            </v-btn>
        </v-row>
      </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    
    }
</script>

<style>

</style>