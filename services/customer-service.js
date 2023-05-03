import CustomerModel from "../models/customer-model.js";
const URL_API = "https://645284a1bce0b0a0f74921a3.mockapi.io/"

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
        cardVer.style.display = 'block';
        datos[1].forEach(card => {
            let cardActual = document.querySelector(card);
            cardActual.style.display = 'none';
        });
        e.stopImmediatePropagation();
        e.preventDefault();
    })
});
function viewDataHtml(dataCustomer){
    console.log(dataCustomer);
}