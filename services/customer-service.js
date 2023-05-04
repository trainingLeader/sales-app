import CustomerModel from "../models/customer-model.js";
const URL_API = "https://645284a1bce0b0a0f74921a3.mockapi.io/"
const frmRegistro = document.querySelector('#frmData');
const inputFrm = document.forms['frmData'];
const botones = document.querySelectorAll('.btn');
let idUser = 0;
const myHeaders = new Headers({
	"Content-Type": "application/json"
});
const postCustomer = (datos) =>{
    fetch(`${URL_API}customers`,
	{
		method: "POST",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
    }).then(res=>{
        idUser=res.id;
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })

}
const putCustomer = (datos) =>{
    fetch(`${URL_API}customers/${idUser}`,
	{
		method: "PUT",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
        
    }).then(res=>{
       
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })

}
const getCustomers = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/customers`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
            viewDataHtml(datos);
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('El cliente que buscas no existe');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){
        console.log(error);
	}
    
}
function saveCustomer(){
    CustomerModel.createdAt = '2023-02-02';
    CustomerModel.nombres = 'Campers 2023';
    CustomerModel.apellidos = 'xxxxx';
    CustomerModel.email = 'xxxxxx';
    CustomerModel.fechaNacimiento = '1980-05-06';
    postCustomer(CustomerModel);
}
function VerOcultar(divsVisible){
    console.log(divsVisible);

}
document.querySelectorAll('.tabOpcion').forEach((val,id)=>{
    val.addEventListener("click",(e)=>{
        let datos = JSON.parse(e.target.dataset.verocultar);
        let cardVer = document.querySelector(datos[0]);
        if(cardVer.id == 'reg'){

        }
        cardVer.style.display = 'block';
        datos[1].forEach(card => {
            let cardActual = document.querySelector(card);
            cardActual.style.display = 'none';
        });
        e.stopImmediatePropagation();
        e.preventDefault();
    })
});
// function viewDataHtml(datos){
//     const tablaClientes = document.querySelector('.lst');
//     tablaClientes.innerHTML = '';
//     datos.map((item)=>{
//         const costumerInfo = document.createElement('div');
//         costumerInfo.className = 'col-6'
//         costumerInfo.innerHTML = /*html*/`
//         <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
//             <div class="card-header">${item.createdAt}</div>
//                 <div class="card-body">
//                     <h5 class="card-title">${item.nombres} ${item.apellidos}</h5>
//                     <p class="card-text">${item.email}</p>
//             </div>
//         </div>
//         `;
//         tablaClientes.appendChild(costumerInfo);
//     })
// }
document.querySelectorAll('.btn').forEach((e) =>{
    e.addEventListener("click",(evento)=>{
        let datos = JSON.parse(evento.target.dataset.activardesactiva);
        let cardVer = document.querySelector(datos[0]);
        datos[0].forEach(btnActivar =>{
            let btndActual = document.querySelector(btnActivar);
            btndActual.classList.toggle('disabled');
        })
        datos[1].forEach(btnActivar =>{
            let btndActual = document.querySelector(btnActivar);
            if (!(btndActual.classList.contains('disabled'))){
                btndActual.classList.toggle('disabled');
            }
        })
    })
})

document.querySelector('#btnGuardar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    console.log(datos);
    postCustomer(datos);
})
document.querySelector('#btnEditar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    putCustomer(datos);
})
function ActivarBtn(){

}