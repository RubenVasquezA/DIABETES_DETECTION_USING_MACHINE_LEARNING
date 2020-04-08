$(document).ready(function(){
	
	procesamiento();

})

function procesamiento()
{

	//Capturamos los valores actuales de los sliders para ser mostrados//
	//Creamos la interfaz para el formulario//
	//Seteaamo la primera grafica 
	interfaz();
	$('#PROCESAR').css({"pointer-events":"none"});
	$('#ACTUALIZAR').css({"pointer-events":"none"});
	
}


//------------------------------------------------------------------------//
function interfaz()
{
	//Se remueve la imagen de la grafica//
	removeModel();

//Se crea la interfaz a traves de un formulario//

interfaz='<form id="dat-clinicos" class="formulario">\
		  <input type="text" style="display:none" id="ID_IND">\
		  <div id="genero">\
		  <label>Gender:</label>\
		  <input type="radio" name="gender" value="1"> Male\
  		  <input type="radio" name="gender" value="0"> Female</div>\
		  <label for="year">Age (years):</label>\
		  <input type="text" id="year" name="year">\
		  <label for="PAS">SBP (mmHg)</label>\
		  <input type="text" id="PAS" name="PAS">\
		  <label for="PAD">DBP (mmHg)</label>\
		  <input type="text" id="PAD" name="PAD">\
		  <label for="CA">WC (cm):</label>\
		  <input type="text" id="CA" name="CA">\
		  <label for="BMI">BMI (kg/m^2):</label>\
		  <input type="text" id="BMI" name="BMI">\
		  <label for="HbAc1">HbA1c (%):</label>\
		  <input type="text" id="HbAc1" name="HbAc1">\
		  <label for="Cholesterol">Cholesterol (mg/dL):</label>\
		  <input type="text" id="Cholesterol" name="Cholesterol">\
		  <label for="TGL">Triglicerides (mg/dL):</label>\
		  <input type="text" id="TGL" name="TGL"><br>\
		  <label for="HDL">High density lipoprotein (mg/dL):</label>\
		  <input type="text" id="HDL" name="HDL">\
		  <label for="LDL">Low density lipoprotein (mg/dL):</label>\
		  <input type="text" id="LDL" name="LDL">\
		  <label for="VLDL">Very low density lipoprotein (mg/dL):</label>\
		  <input type="text" id="VLDL" name="VLDL">\
		  <hr><br>\
		  <label>SNP1:</label>\
		  <select id="SPN1" name="SPN1">\
		  <option selected disabled>SPN1</option>\
  		  <option value="1">C/C</option>\
  		  <option value="2">C/G</option>\
  		  <option value="3">G/G</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP2:</label>\
		  <select id="SPN2" name="SPN2">\
		  <option selected disabled>SPN2</option>\
  		  <option value="1">C/C</option>\
  		  <option value="2">C/G</option>\
  		  <option value="3">G/G</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP3:</label>\
		  <select id="SPN3" name="SPN3">\
		  <option selected disabled>SPN3</option>\
  		  <option value="1">G/G</option>\
  		  <option value="2">G/T</option>\
  		  <option value="3">T/T</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP4:</label>\
		  <select id="SPN4" name="SPN4">\
		  <option selected disabled>SPN4</option>\
  		  <option value="1">G/G</option>\
  		  <option value="2">G/T</option>\
  		  <option value="3">T/T</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP5:</label>\
		  <select id="SPN5" name="SPN5">\
		  <option selected disabled>SPN5</option>\
  		  <option value="1">A/A</option>\
  		  <option value="2">A/C</option>\
  		  <option value="3">C/C</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP6:</label>\
		  <select id="SPN6" name="SPN6">\
		  <option selected disabled>SPN6</option>\
  		  <option value="1">A/A</option>\
  		  <option value="2">A/C</option>\
  		  <option value="3">C/C</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP7:</label>\
		  <select id="SPN7" name="SPN7">\
		  <option selected disabled>SPN7</option>\
  		  <option value="1">C/C</option>\
  		  <option value="2">C/T</option>\
  		  <option value="3">T/T</option>\
  		  <option value="0">NA</option>\
		  </select>\
		  <label>SNP8:</label>\
		   <select id="SPN8" name="SPN8">\
		   <option selected disabled>SPN8</option>\
  		  <option value="1">D/D</option>\
  		  <option value="2">D/I</option>\
  		  <option value="3">I/I</option>\
  		  <option value="0">NA</option>\
		  </select><br>\
		  <button class="Boton corto" id="GUARDAR">SAVE</button>\
		  <a class="Boton corto" id="PROCESAR" onclick="procesar_datos()">PROCESS</a>\
		  <a class="Boton corto" id="ACTUALIZAR" onclick="actualizar_datos()">UPDATE</a>\
          </form>'

$('#bdy_mtd').append(interfaz)
	

}

function procesar_datos()
{
	var condicion="procesar"
	var parametros={
		op:condicion
	}
	$.ajax({
		url: '/proceso',
		data: parametros,
		type: 'POST',
		success: function(datos){
			mostrar_persona()
			setTimeout(function () {
  window.location.href = "/soft";
}, 2000);   // Time in milliseconds
		},
		error: function(error){
			console.log(error);
		}
	});
}


function mostrar_persona()
{
	var op="mostrar"
	var parametros={
		op:op
	}
    $.ajax({
           url: '/proceso',
					 data: parametros,
					 type: 'POST',
           success: function(datos){
						var obj = jQuery.parseJSON(datos);
						 console.log(obj)
						 $('#example').DataTable( {
    			 		data: obj
							} );


					},
					error: function(error){
						console.log(error);
					}
        })
        return false;
}

/*--------------------------------------------*/
function mostrar_pie_chart()
{
	var op="mostrar_pie"
	var parametros={
		op:op
	}
    $.ajax({
           url: '/grafica',
					 data: parametros,
					 type: 'POST',
           success: function(datos){
						var obj = jQuery.parseJSON(datos);
						 $('#pie_chart').html(obj)


					},
					error: function(error){
						console.log(error);
					}
        })
        return false;
}


//------------------------------------------------------------------//
function guardar_datos()
{
 
	var gender = $("input[name='gender']:checked").val();
	var year=$("#year").val();
	var PAS=$("#PAS").val();
	var PAD=$("#PAD").val();
	var CA=$("#CA").val();
	var BMI=$("#BMI").val();
	var HbAc1=$("#HbAc1").val();
	var Cholesterol=$("#Cholesterol").val();
	var TGL=$("#TGL").val();
	var HDL=$("#HDL").val();
	var LDL=$("#LDL").val();
	var VLDL=$("#VLDL").val();
	var SPN1=$("#SPN1 option:selected").val();
	var SPN2=$("#SPN2 option:selected").val();
	var SPN3=$("#SPN3 option:selected").val();
	var SPN4=$("#SPN4 option:selected").val();
	var SPN5=$("#SPN5 option:selected").val();
	var SPN6=$("#SPN6 option:selected").val();
	var SPN7=$("#SPN7 option:selected").val();
	var SPN8=$("#SPN8 option:selected").val();
	var condicion="agregar"

	//------------------------------------------//
bloquear_formulario()

 $('#GUARDAR').css({"pointer-events":"none"});  
 

//--Almacenamos todos variables y parametros en un diccionario----//
	var parametros={
		gender:gender,
		year:year,
		PAS:PAS,
		PAD:PAD,
		CA:CA,
		BMI:BMI,
		HbAc1:HbAc1,
		Cholesterol:Cholesterol,
		TGL:TGL,
		HDL:HDL,
		LDL:LDL,
		VLDL:VLDL,
		SPN1:SPN1,
		SPN2:SPN2,
		SPN3:SPN3,
		SPN4:SPN4,
		SPN5:SPN5,
		SPN6:SPN6,
		SPN7:SPN7,
		SPN8:SPN8,
		op:condicion
	}
	//-----------------------------------------------//

	console.log(parametros)
	$.ajax({
		url: '/proceso',
		data: parametros,
		type: 'POST',
		success: function(datos){
			alert('successful process')
			$('#PROCESAR').css({"pointer-events":"auto"});
			 $('#ACTUALIZAR').css({"pointer-events":"none"}); 
			  $('#ACTUALIZAR').css({"pointer-events":"none"}); 

		},
		error: function(error){
			console.log(error);
		}
	});
	//--Capturamos los valores de entrada en dinamico---//
	

}


function actualizar_datos()
{
 	var ID_IND=$("#ID_IND").val();
	var gender = $("input[name='gender']:checked").val();
	var year=$("#year").val();
	var PAS=$("#PAS").val();
	var PAD=$("#PAD").val();
	var CA=$("#CA").val();
	var BMI=$("#BMI").val();
	var HbAc1=$("#HbAc1").val();
	var Cholesterol=$("#Cholesterol").val();
	var TGL=$("#TGL").val();
	var HDL=$("#HDL").val();
	var LDL=$("#LDL").val();
	var VLDL=$("#VLDL").val();
	var SPN1=$("#SPN1 option:selected").val();
	var SPN2=$("#SPN2 option:selected").val();
	var SPN3=$("#SPN3 option:selected").val();
	var SPN4=$("#SPN4 option:selected").val();
	var SPN5=$("#SPN5 option:selected").val();
	var SPN6=$("#SPN6 option:selected").val();
	var SPN7=$("#SPN7 option:selected").val();
	var SPN8=$("#SPN8 option:selected").val();
	var condicion="actualizar"
	//------------------------------------------//
 bloquear_formulario()


//--Almacenamos todos variables y parametros en un diccionario----//
	var parametros={
		ID_IND:ID_IND,
		gender:gender,
		year:year,
		PAS:PAS,
		PAD:PAD,
		CA:CA,
		BMI:BMI,
		HbAc1:HbAc1,
		Cholesterol:Cholesterol,
		TGL:TGL,
		HDL:HDL,
		LDL:LDL,
		VLDL:VLDL,
		SPN1:SPN1,
		SPN2:SPN2,
		SPN3:SPN3,
		SPN4:SPN4,
		SPN5:SPN5,
		SPN6:SPN6,
		SPN7:SPN7,
		SPN8:SPN8,
		op:condicion
	}
// 	//-----------------------------------------------//

	console.log(parametros)
	$.ajax({
		url: '/proceso',
		data: parametros,
		type: 'POST',
		success: function(datos){
			mostrar_persona()
			setTimeout(function () {
  window.location.href = "/soft";
}, 1000);
		},
		error: function(error){
			console.log(error);
		}
	});
	//--Capturamos los valores de entrada en dinamico---//
	

}

function nuevo()
{

setTimeout(function () {
  window.location.href = "/soft";
}, 100);

}

function setear(ID_IND)
{
	
	var op="setar"
	var parametros={
		op:op,
		ID_IND:ID_IND
	}
	//console.log(ID_IND)
	$.ajax({
		url: '/proceso',
		data: parametros,
		type: 'POST',
		success: function(datos){
			arreglo=jQuery.parseJSON(datos)
			$('#GUARDAR').css({"pointer-events":"none"});
			$('#PROCESAR').css({"pointer-events":"none"});
			$('#ACTUALIZAR').css({"pointer-events":"auto"});
			$("#ID_IND").val(arreglo[0][0]);
			$("input[name='gender'][value='"+arreglo[0][1]+"']").prop('checked', true);
			$("#year").val(arreglo[0][2]);
			$("#PAS").val(arreglo[0][3]);
			$("#PAD").val(arreglo[0][4]);
			$("#CA").val(arreglo[0][5]);
			$("#BMI").val(arreglo[0][6]);
			$("#HbAc1").val(arreglo[0][7]);
			$("#Cholesterol").val(arreglo[0][8]);
			$("#TGL").val(arreglo[0][9]);
			$("#HDL").val(arreglo[0][10]);
			$("#LDL").val(arreglo[0][11]);
			$("#VLDL").val(arreglo[0][12]);
			$('#SPN1').val(arreglo[0][13]);
			$('#SPN2').val(arreglo[0][14]);
			$('#SPN3').val(arreglo[0][15]);
			$('#SPN4').val(arreglo[0][16]);
			$('#SPN5').val(arreglo[0][17]);
			$('#SPN6').val(arreglo[0][18]);
			$('#SPN7').val(arreglo[0][19]);
			$('#SPN8').val(arreglo[0][20]);

		},
		error: function(error){
			console.log(error);
		}
	});

}


function bloquear_formulario()
{
  $("#year").attr("disabled", true);
        $("#PAS").attr("disabled", true);
        $("#PAD").attr("disabled", true);
        $("#CA").attr("disabled", true);
        $("#BMI").attr("disabled", true);
        $("#HbAc1").attr("disabled", true);
        $("#Cholesterol").attr("disabled", true);
        $("#TGL").attr("disabled", true);
        $("#LDL").attr("disabled", true);
        $("#HDL").attr("disabled", true);
        $("#VLDL").attr("disabled", true);
        $("#SPN1").attr("disabled", true);
        $("#SPN2").attr("disabled", true);
        $("#SPN3").attr("disabled", true);
        $("#SPN4").attr("disabled", true);
        $("#SPN5").attr("disabled", true);
        $("#SPN6").attr("disabled", true);
        $("#SPN7").attr("disabled", true);
        $("#SPN8").attr("disabled", true);
        $('input:radio[name="gender"]').prop('disabled', true);
       
}
//----------------------------------------------------------//

function desbloquear_formulario()
{
  $("#year").attr("disabled", false);
        $("#PAS").attr("disabled", false);
        $("#PAD").attr("disabled", false);
        $("#CA").attr("disabled", false);
        $("#BMI").attr("disabled", true);
        $("#HbAc1").attr("disabled", false);
        $("#Cholesterol").attr("disabled", false);
        $("#TGL").attr("disabled", false);
        $("#LDL").attr("disabled", false);
        $("#HDL").attr("disabled", false);
        $("#VLDL").attr("disabled", false);
        $("#SPN1").attr("disabled", false);
        $("#SPN2").attr("disabled", false);
        $("#SPN3").attr("disabled", false);
        $("#SPN4").attr("disabled", false);
        $("#SPN5").attr("disabled", false);
        $("#SPN6").attr("disabled", false);
        $("#SPN7").attr("disabled", false);
        $("#SPN8").attr("disabled", false);
        $('input:radio[name="gender"]').prop('disabled', false);
       
//----------------------------------------------------------//
}


function removeModel() {

    $('form').remove();
	$('#dv_grf').remove();

}

