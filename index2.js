fetch("records2.json")
    .then(response => response.json())
    .then(data => dataToHTML(data));

function dataToHTML(data){
    let mainContainer = document.getElementById("recordData");
    for(let i = 0; i < data.records.length; ++i){
        let title = data.records[i].title;
        let artist = data.records[i].artist;
        let genre = data.records[i].genre;
        let price = data.records[i].price;
        let description = data.records[i].description;
        let source = data.records[i].src;
        let stock = data.records[i].stock;
    let mytr = document.createElement("div");
    mytr.innerHTML = `
    <div class="col">
    <div class="card shadow-sm">
      <img src="${source}" alt="${artist} - ${title}">
      <div class="card-body">
          <h4>${artist} - ${title}   $${price}</h4>
        <p class="card-text">${description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">Buy Now!</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
          </div>
          <small class="text-muted">${stock} left!</small>
        </div>
      </div>
    </div>
  </div>
    `;
    mainContainer.appendChild(mytr);
    }
}