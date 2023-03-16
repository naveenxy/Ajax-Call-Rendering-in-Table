var state = {
  page: 1,
  rowsLimit: 30,
  window: 5,
};
loadData();

function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://dummyjson.com/products?limit=" +
      state.rowsLimit +
      "&skip=" +
      (state.page - 1) * state.rowsLimit
  );

  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = xhr.response;
      showProduct(data.total);
      totalProduct(data.total);
      populateTable(data.products);
      var pages = Math.round(data.total / state.rowsLimit);
      if (typeof data.total / state.rowsLimit != Number) {
        pages += 1;
        console.log(true);
      }
      PageButtons(pages);
    } else {
      console.error("Request failed. Status: " + xhr.status);
    }
  };
  xhr.send();
}

function populateTable(data) {
  var table = document.getElementById("table");
  var tbody = document.getElementById("tablebody");
  tbody.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      item.id +
      "</td>" +
      "<td>" +
      item.title +
      "</td>" +
      "<td>" +
      item.description +
      "</td>" +
      "<td>" +
      item.price +
      "</td>";
    tbody.appendChild(row);
  }
}
function totalProduct(count) {
  var tablecount = document.getElementById("totalProduct");
  tablecount.innerHTML = "";
  tablecount.innerHTML = "Total Products : " + count;
}

function PageButtons(pages) {
  var wrapper = document.getElementById("pagination-wrapper");
  console.log(pages);
  wrapper.innerHTML = "";
  var maxLeft = state.page - Math.floor(state.window / 2);
  console.log("maxLeft" + maxLeft);
  var maxRight = state.page + Math.floor(state.window / 2);
  console.log("MaxRight" + maxRight);
  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = state.window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (state.window - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  for (var page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" onclick="getPageNumber(${page})">${page}</button>`;
  }
  //console.log(state.page);
  if (state.page != 1) {
    wrapper.innerHTML =
      `<button value=${1} class="page btn btn-sm btn-info " onclick="getPageNumber(${1})">&#171; First</button>` +
      wrapper.innerHTML;
  }

  if (state.page != pages) {
    wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info" onclick="getPageNumber(${pages})">Last &#187;</button>`;
  }
}

function getPageNumber(page) {
  state.page = page;
  //console.log(page);
  loadData();
}

function showProduct(total) {
  var showProduct = document.getElementById("showProduct");
  var last = state.page * state.rowsLimit;
  if (state.rowsLimit * state.page > total) {
    last = total;
  }
  showProduct.innerHTML = `showing products from ${
    state.page * state.rowsLimit - state.rowsLimit
  } to ${last} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
</svg>`;
}
