$(document).ready(function(){
    var dataSet = []
    var datatable = $('#tabla-uso').DataTable( {
        data: dataSet,
        searching: false,
        columns: [
            { title: "Id" },
            { title: "Asignación" },
            { title: "Caducidad" },
            { title: "Puntaje Asig." },
            { title: "Puntaje Util." },
            { title: "Saldo" },
            { title: "Monto Op." },
            { title: "Cliente" }
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
    $("#btn-consultar").click(function() {
        var cliente = $("#cliente").val();
        var vigencia = $("#vigencia").val();
        var dias = $("#dias").val();
        var url = "http://localhost:3000/api/bolsa?"+ (cliente?("cliente="+cliente):"")+ ((vigencia && vigencia != "todos")?("&vigencia="+vigencia):"") + (dias?("&dias="+dias):"");
        console.log(url)
        $.ajax({
            url: url,
            success: function(data) {
                dataSet = []
               for(let info of data) {
                   let row = [info.id,info.fecha_asignacion,info.fecha_caducidad,info.puntaje_asignado,info.puntaje_utilizado,info.saldo,info.monto_operacion,info.id_cliente]
                   dataSet.push(row);
               }
               datatable.clear();
          datatable.rows.add(dataSet);
          datatable.draw()
            },
          });

    })
    
})