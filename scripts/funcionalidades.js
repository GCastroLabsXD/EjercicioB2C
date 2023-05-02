$(document).ready(function () {
    const form = document.querySelector('#editForm');
    const products = document.querySelector('#products')
    const urlApi = 'https://644f0bb2b61a9f0c4d1b5f8d.mockapi.io/products'
    let EditId;
    const getData = () => {
        $.get(urlApi, function (data) {
            data.forEach(element => {
                let div = document.createElement('div');
                div.innerHTML = (`<div class="Formulario">
                    <p> Nombre: ${element.name}</p>
                    <p> Desctipcion: ${element.description}</p>
                    <p> Precio: ${element.price} $</p>
                    <p> Vendedor: ${element.seller}</p>
                    <p> ${element.status}</p> 
                    <button class="btn btn-danger" id="Delete-${element.id}" data-id="${element.id}">Eliminar</button>
                    <button class="btn btn-primary" id="Edit-${element.id}" data-id="${element.id}">Editar</button>
                    </div>                   
                `);
                products.append(div);
                $(`#Delete-${element.id}`).click(function () {
                    var Editurl = urlApi + '/' + element.id
                    $.ajax({
                        type: 'DELETE',
                        url: Editurl,
                        contentType: 'application/json',
                        success: function (data) {
                            console.log(data);
                        },
                        error: function () {
                            console.log('Error in Operation');
                        }
                    });
                })
                var Edit = document.getElementById(`Edit-${element.id}`);
                Edit.addEventListener('click', () => {
                    $('#edit').prop("checked", true);
                    $('#EditLabel').text('Edit: ')
                    Nombre = document.querySelector('#Nombre');
                    Nombre.value = element.name;
                    Price = document.querySelector('#Price');
                    Price.value = element.price;
                    Seller = document.querySelector('#Seller');
                    Seller.value = element.seller;
                    Description = document.querySelector('#Description');
                    Description.value = element.description;
                    EditId = element.id;
                })
                $('#Insert').click(function (e) {
                    e.preventDefault();
                    $('#edit').prop("checked", false);
                    $('#EditLabel').text('Insert: ')
                })
            })
        })
    }
    getData();
    $('#submit').click(function (e) {
        // e.preventDefault();
        var IsInsert = document.querySelector('#edit').checked;
        dataName = document.querySelector('#Nombre').value;
        dataDescription = document.querySelector('#Description').value;
        dataPrice = document.querySelector('#Price').value;
        dataSeller = document.querySelector('#Seller').value;
        console.log(IsInsert);
        let datos = {
            name: dataName,
            description: dataDescription,
            price: dataPrice,
            seller: dataSeller
        }
        if (IsInsert === true) {
            $.ajax({
                type: 'PUT',
                url: urlApi + `/${EditId}`,
                contentType: 'application/json',
                data: JSON.stringify(datos)
            })
                .done(function (data) {
                    getData()
                    console.log('Respuesta succes del servidor >', data)
                })
                .fail(function (error) {
                    console.log('Respuesta fail del servidor >', error)
                })
        } else {
            $.ajax({
                type: 'POST',
                url: urlApi,
                contentType: 'application/json',
                data: JSON.stringify(datos)
            })
                .done(function (data) {
                    getData()
                    console.log('Respuesta succes del servidor >', data)
                })
                .fail(function (error) {
                    console.log('Respuesta fail del servidor >', error)
                })
        }
    })

})

