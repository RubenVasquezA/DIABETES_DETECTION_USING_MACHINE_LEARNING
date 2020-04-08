
/* Autor: Lic. Rubén Dario Vásquez Alvarez
Este script se utiliza para la validacion de datos....*/
$(document).ready(function(){

/*---Validacion datos imc----*/
$("#cimc").validate({
   errorPlacement: function errorPlacement(error, element) { element.before(error); },
   rules:{
    peso:{
      required:true,
      number: true
    },

    talla:{
      required:true,
      number: true
    }
   },
   messages:{
    peso:{
        required: "Required value!",
        number: "Only numbers"
    },

    talla:{
        required: "¡Valor requerido!",
        number: "Only numbers"
    }

   },
   submitHandler: function() {
     imc();
      }

})

/*---------------------*/


$("#dat-clinicos").validate({

  errorPlacement: function errorPlacement(error, element) { element.before(error); },
      rules: {

        gender:{
          required:true
        },

        year: {
          required: true,
          number:true
        },

        PAS: 
        {
          required: true,
          number:true
        },

        PAD: {
          required: true,
          number:true
        },

        CA: {
          required: true,
          number:true
        },

        BMI: {
          required: true,
          number:true
        },

        HbAc1: {
          required: true,
          number:true
        },

        Cholesterol: {
          required: true,
          number:true
        },

        TGL: {
          required: true,
          number:true
        },

        HDL:{
          required: true,
          number:true
        },

        LDL:{
          required: true,
          number:true
        },

        VLDL:{
          required: true,
          number:true
        },

        SPN1:{
          required: true,
        },

        SPN2: "required",
        SPN3: "required",
        SPN4: "required",
        SPN5: "required",
        SPN6: "required",
        SPN7: "required",
        SPN8: "required",
      },

      messages: {
        gender:{
          required: "Choose an option"
        },
        year: {
          required: "Required value!",
          number: "Only numbers"
        },
        PAS: {
          required: "Required value!",
          number: "Only numbers"
        },
         PAD: {
          required: "Required value!",
          number: "Only numbers"
        },
         CA: {
          required: "Required value!",
          number: "Only numbers"
        },
         BMI: {
          required:"Required value!",
          number: "Only numbers"
        },
         HbAc1: {
          required: "Required value!",
          number: "Only numbers"
        },
        Cholesterol:{
          required: "Required value!",
          number: "Only numbers"
        },

        TGL:{
          required:"Required value!",
          number: "Only numbers"
         },

         HDL:{
          required: "Required value!",
          number: "Only numbers"
         },

         LDL:{
          required: "Required value!",
          number: "Only numbers"
         },

         VLDL:{
          required:"Required value!",
          number: "Only numbers"
         },
        SPN1: "Choose an option",
        SPN2: "Choose an option",
        SPN3: "Choose an option",
        SPN4: "Choose an option",
        SPN5: "Choose an option",
        SPN6: "Choose an option",
        SPN7: "Choose an option",
        SPN8: "Choose an option"
       },


      errorPlacement: function(error, element)
      {
        if ( element.is(":radio") )
          {
           error.appendTo( element.parents('#genero') );
           }
        else
          { 
             error.insertAfter( element );
          }
      },

      submitHandler: function() {
      guardar_datos();
      }

})

})