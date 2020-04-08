function imc()
{
	var p=$("#peso").val();
	var t=$("#talla").val();
	var t2=t*t
	var IMC = p/t2;
    var n = IMC.toFixed(2);
	$('#imc').val(n);
}



function nuevo()
{

setTimeout(function () {
  window.location.href = "/soft";
}, 100);

}



