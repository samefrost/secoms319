fetch("records.json")
    .then(response => response.json())
    .then(data => dataToHTML(data));

function dataToHTML(data){
    let mainContainer = document.getElementById("tb1");
    for(let i = 0; i < data.records.length; ++i){
        let title = data.records[i].title;
        let artist = data.records[i].artist;
        let genre = data.records[i].genre;
        let price = data.records[i].price;
        let description = data.records[i].description;
        let source = data.records[i].src;
    }
    let mytr = document.createElement("div");
    mytr.innerHTML = `
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <img src="${source}" alt="${artist} - ${title}">
            <div class="card-body">
                <h4>${artist} - ${title}   ${price}</h4>
              <p class="card-text">${description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Buy Now!</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                </div>
                <small class="text-muted">13 left!</small>
              </div>
            </div>
          </div>
        </div>
    </div>
    `;
    mainContainer.appendChild(mytr);
}