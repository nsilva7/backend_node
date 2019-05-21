$(document).ready(function(){
  $("#cliente-select").on('change', function(){
    $("#id_cliente").val($(this).val())
  })
  $("#canje-select").on('change', function(){
    $("#id_canje").val($(this).val())
  })
  $("#submit").on('click', function(){
    let id_cliente = $("#id_cliente").val();
    let id_canje = $("#id_canje").val();
    if(id_cliente == 0 || id_canje == 0){
      $.toast({
        heading: 'Error',
        text: 'Debe seleccionar ambas opciones',
        showHideTransition: 'fade',
        position: 'top-left',
        icon: 'error'
      })
      return;
    }
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/api/uso",
      data: { id_cliente: id_cliente, id_canje: id_canje},
      success: function(data){
        $.toast({
          heading: data.tittle,
          text: data.message,
          showHideTransition: 'slide',
          position: 'top-left',
          icon: data.tittle == 'Error' ?  'error' : 'success'
        })
      },
      error: function(error){
        $.toast({
          heading: 'Error',
          text: error,
          showHideTransition: 'fade',
          position: 'top-left',
          icon: 'error'
        })
      }
    })
  })
})
