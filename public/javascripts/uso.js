$(document).ready(function(){
    var dataSet = []
    var datatable = $('#tabla-usos').DataTable( {
        data: dataSet,
        searching: false,
        columns: [
            { title: "puntaje_utilizado" },
            { title: "fecha" },
            { title: "id_canje" },
            { title: "id_cliente" },
        ],
        language: {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    } );
    $("#cliente-select").on('change', function(){
      if($(this).val() == 0)
        $("#cliente").val('')
      else
        $("#cliente").val($(this).val())
    })
    $("#concepto").on('change', function(){
      if($(this).val() == 0)
        $("#canje").val('')
      else
        $("#canje").val($(this).val())
    })
    $("#btn-consultar").click(function() {
        var cliente = $("#cliente").val();
        var fecha_desde = $("#desde").val();
        var fecha_hasta = $("#hasta").val();
        var canje = $("#canje").val();
        var url = "http://localhost:3000/api/uso?"+ (cliente != 0?("cliente="+cliente):"")+ (canje != 0?("&canje="+canje):"") + (fecha_desde?("&fecha_desde="+fecha_desde):"") + (fecha_hasta?("&fecha_hasta="+fecha_hasta):"");
        console.log(url)
        $.ajax({
            url: url,
            success: function(data) {
                dataSet = []
               for(let info of data) {
                   let row = [info.puntaje_utilizado,info.fecha,info.id_canje,info.id_cliente]
                   dataSet.push(row);
               }
               datatable.clear();
          datatable.rows.add(dataSet);
          datatable.draw()
            },
          });

    })

    $("#btn-consultar").click()

})
