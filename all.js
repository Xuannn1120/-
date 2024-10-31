let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

// 卡片替換

const ticketCardArea = document.querySelector(".ticketCard-area");
const searchResultText = document.querySelector("#searchResult-text");
function renderData(data) {
  let template = "";
  data.forEach(function (item) {
    template += ` <li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img
                src="${item.imgUrl}"
                alt=""
              />
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
  });
  ticketCardArea.innerHTML = template;
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}
renderData(data);

// 搜尋區

const regionSearch = document.querySelector(".regionSearch");
const cantFindArea = document.querySelector(".cantFind-area");

function filterData() {
  let filterResult = [];
  data.forEach(function (item) {
    if (item.area === regionSearch.value || !regionSearch.value) {
      filterResult.push(item);
    }
  });
  if (filterResult.length > 0) {
    cantFindArea.style.display = "none"; // filterResult 有資料時隱藏
  } else {
    cantFindArea.style.display = "block"; // filterResult 沒有資料時顯示
  }
  renderData(filterResult); // 函式呼叫，用來將 filterResult 陣列中的資料顯示在頁面上
}

// 篩選區
regionSearch.addEventListener("change", function () {
  filterData();
});

// 篩選區結束

// 新增套票區
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");

const addTicketBtn = document.querySelector(".addTicket-btn");

const addTicketForm = document.querySelector(".addTicket-form");

function addData() {
  let obj = {
    id: data.length,
    name: ticketName.value.trim(),
    imgUrl: ticketImgUrl.value.trim(),
    area: ticketRegion.value.trim(),
    description: ticketDescription.value.trim(),
    group: Number(ticketNum.value.trim()),
    price: Number(ticketPrice.value.trim()),
    rate: Number(ticketRate.value.trim()),
  };
  // errorMsg 驗證開始
  let errorMsg = "";

  if (!obj.name) {
    errorMsg = "套票名稱為必填!";
  } else if (!obj.imgUrl) {
    errorMsg = "圖片網址為必填!";
  } else if (!obj.area) {
    errorMsg = "請選擇地區!";
  } else if (obj.price <= 0) {
    errorMsg = "套票金額必須大於 0!";
  } else if (obj.group < 1) {
    errorMsg = "套票組數必須至少為 1!";
  } else if (obj.rate < 1 || obj.rate > 10) {
    errorMsg = "套票星級必須在 1 至 10 之間!";
  } else if (obj.description.length > 100) {
    errorMsg = "套票描述必填，且不能超過 100 字!";
  }

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  // errorMsg 驗證結束

  data.push(obj);
  regionSearch.value = "";

  addTicketForm.reset();

  renderData(data);
  console.log(obj);
}

addTicketBtn.addEventListener("click", function () {
  addData();
});
