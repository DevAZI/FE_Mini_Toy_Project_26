

// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {//data는 과일 또는 야채의 배열
  console.log(data)
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  let data = fruits;
  let container = document.querySelector("#fruitList")

  if(sortSelect.value ==="name"){
    let sortName = data.toSorted((s1, s2) => s1.name.localeCompare(s2.name));
    renderProducts(sortName, fruitList);
  }
  else if(sortSelect.value ==="low"){
    let sortLow = data.toSorted((s1, s2) => s1.price- s2.price);
    renderProducts(sortLow, fruitList);
  }
  else if(sortSelect.value ==="high"){
    let sortHigh = data.toSorted((s1, s2) => s2.price - s1.title);
    renderProducts(sortHigh, fruitList);
  }else
    renderProducts(fruits, fruitList);
}

// 채소 출력 (3개씩 증가)
let currentIndex = 0;
let displayed = [];
let searchVeggieIndex =0;
function loadVeggies() {
  let next = veggies.slice(currentIndex, currentIndex + 3);
  displayed = [...displayed, ...next];

  currentIndex += 3;
  if(currentIndex ===veggies.length || searchVeggieIndex < 3){
    loadMoreBtn.innerText="마지막";
    loadMoreBtn.disabled = true;

  }
  renderProducts(displayed, veggieList);
}
document.querySelector("#searchBox").onkeyup = (e) => {
  const search = e.target.value;

  const filteredFruits = getFilterData(search, fruits);
  const filteredVeggies = getFilterData(search, veggies);

  renderProducts(filteredFruits, fruitList);
  renderProducts(filteredVeggies, veggieList);
  searchVeggieIndex=filteredVeggies.length;

};

const getFilterData = (search, list) => {

  if (search === "") {
    return list;
  }

  return list.filter((item) =>
      item.name.includes(search)
  );
};


////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
