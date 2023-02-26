const loadPhone = async (serchField, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${serchField}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, datalimit);
};

const displayPhone = (phone,datalimit) => {
//   console.log(phone);
  const phoneContainer = document.getElementById("container");
  phoneContainer.textContent = "";
  const alls = document.getElementById('shiw-all');
  if (datalimit && phone.length > 10) {
    phone = phone.slice(0, 10);

    alls.classList.remove("d-none");
  } else {
    alls.classList.add("d-none");
  }

  const nPhone = document.getElementById("message");
  if (phone.length === 0) {
    nPhone.classList.remove("d-none");
  } else {
    nPhone.classList.add("d-none");
  }
  for (const p of phone) {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");

    phoneDiv.innerHTML = `
        <div class="card h-100 p-4 ">
        <img  src="${p.image}" class="card-img-top img-thumbnail" alt="...">
        <div class="card-body">
          <h5 class="card-title">${p.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="phoneDetails('${p.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PhoneDetailModal" >Show Details</button>
     
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  }
  toggle(false);
};

document.getElementById("btn-search").addEventListener("click", function () {
process(10)
});

document.getElementById('searchField').addEventListener('keypress', function (e) {
  // console.log(e.key);
    if (e.key === 'Enter') {
      // code for enter
      process(10)
    }
});

const toggle = (isLoading) => {
  const lsec = document.getElementById("loader");
  if (isLoading) {
    lsec.classList.remove("d-none");
  } else {
    lsec.classList.add("d-none");
  }
};

const process=( datalimit)=>{
    toggle(true);

    const serchField = document.getElementById("searchField").value;
  
    loadPhone(serchField,datalimit);

}
document.getElementById('btn-showall').addEventListener('click',function(){

    process()

})
const phoneDetails= async(id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
   const res = await fetch(url);
  const data = await res.json();
  phoneDetais(data.data);


}

const phoneDetais= phone =>{
  console.log(phone);
  const mtitle = document.getElementById('PhoneDetailModalLabel')
  mtitle.innerText=phone.name

  const dtail = document.getElementById('p-details')
  dtail.innerHTML=`
  <img  src="${phone.image}" class="card-img-top img-thumbnail" alt="...">
  <p> ${phone.releaseDate ? phone.releaseDate: 'No release Date'} </p>
  <p>${phone.others ? phone.others.Bluetooth :'No bluthooth featture'} </p>
  `
}



// loadPhone()
