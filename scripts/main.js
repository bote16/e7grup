const url = "https://6361a89e67d3b7a0a6cabf15.mockapi.io/users";
const btnBuscar = document.getElementById("btnGet1");
const resultados = document.getElementById("results");
const btnAdd = document.getElementById("btnPost");

btnAdd.addEventListener("click", async () => {
  let name1 = document.getElementById("inputPostNombre").value;
  let lastname1 = document.getElementById("inputPostApellido").value;
  let data = {
    name: name1,
    lastname: lastname1,
  };

  let fetchData = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  });
    
    let result = await fetchData.json();
    alert(result.message)
});

async function getData(url) {
  let res = await fetch(url);
  if (res.ok) {
    let data = await res.json();

    return data;
  } else {
    console.log(res.statusText);
  }
}

btnBuscar.addEventListener("click", async () => {
  const inputBuscar = document.getElementById("inputGet1Id");
  let index = inputBuscar.value;
  if (index == undefined || index == "") {
    let data = await getData(url);
    let htmlContentToAppend = ``;
    for (let i = 0; i < data.length; i++) {
      let el = data[i];
      htmlContentToAppend += `
          <li>ID: ${el.id}</li>
          <li>NAME:  ${el.name}</li>
          <li>LASTNAME:  ${el.lastname}</li>
          `;
    }
    resultados.innerHTML = htmlContentToAppend;
  } else {
    let url2 = url + "/" + index;
    let data = await getData(url2);
    let htmlContentToAppend = `<li>ID: ${data.id}</li>
    <li>NAME:  ${data.name}</li>
    <li>LASTNAME:  ${data.lastname}</li>`;
    resultados.innerHTML = htmlContentToAppend;
  }
});
