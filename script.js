const modalMau = document.getElementById("modal-mau");
const modalMaaf = document.getElementById("modal-maaf");
const confirm = document.getElementById("confirm");
const btnNoI = document.getElementById("btn-noInput");
const imgF = document.getElementById("imgF");
const modalBalas = document.getElementById("modal-balas");
const load = doc("load");
function clearInput(i, b) {
  que(b).addEventListener("click", () => {
    que(i).value = "";
  });
}
clearInput("#name-i", "#reset1");
clearInput("#pesan", "#reset2");

function pick(p) {
  que(p).play();
}

setInterval(pick("#pick-2"), 30);
let nameI;
const nameS = localStorage.getItem("name") || nameI;

// meter
function fungsiMeter(m) {
  let progress = 100;
  let intervalId = 0;
  function updateProgress() {
    progress--;
    m.value = progress;
    if (progress === 0) clearInterval(intervalId);
  }
  intervalId = setInterval(updateProgress, 30);
}

const gif = [
  "img/dua.gif",
  "img/dua.gif",
  "img/tiga.gif",
  "img/ktw.gif",
  "img/empat.gif",
  "img/kado.gif",
  "img/enggak.gif",
];
let i = 0;
function updateGif() {
  que("#gif-j").setAttribute("src", gif[i]);
  i++;
  i > gif.length - 1 ? (i = 0) : "";
}
setInterval(updateGif, 5000);

document.getElementById("btn-mau").addEventListener("click", () => {
  pick("#pick-2");
  modalMau.classList.add("show");
  fungsiMeter(document.getElementById("meter1"));
  setTimeout(() => {
    modalMau.classList.remove("show");
    modalMaaf.classList.add("show");
    pick("#pick-3");

    const meter2 = document.getElementById("meter2");
    fungsiMeter(meter2);
    setTimeout(() => {
      meter2.classList.add("hidden");
      document.getElementById("maaf").classList.add("hidden");
      document.getElementById("becanda").classList.add("hidden");
      document.getElementById("uang").classList.remove("hidden");
      document.getElementById("btn-ya").classList.remove("hidden");
    }, 3000);
  }, 3000);
});

doc("btn-ya").addEventListener("click", () => {
  pick("#pick-1");
  sessionStorage.removeItem("anim-masuk");
  animpage();
  modalMaaf.classList.remove("show");
});

function scroll() {
  window.scrollTo({
    top: 1000,
    left: 0,
    behavior: "instant",
  });
}
doc("btn-balas").addEventListener("click", () => {
  pick("#pick-3");
  modalBalas.classList.add("show");
  doc("pesan").value = `Terimakasih sudah mengucapkan kepada ${nameS}`;
});
doc("btn-kirim").addEventListener("click", () => {
  const pesan = doc("pesan").value;
  if (!pesan) {
    return alert("Harus di isi dulu!!");
  }
  window.open(
    `https://wa.me/6283894452171?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
  localStorage.setItem("foto", "true");
  modalBalas.classList.remove("show");
});

if (!nameS) {
  window.onload = () => {
    confirm.classList.add("show");
  };
} else {
  nama();
}

const nm = ["rifa", "siti", "sitinur", "sitinurlaila", "sitinurlailasari"];
document.getElementById("btn-input").addEventListener("click", () => {
  load.classList.add("show");
  nameI = document.getElementById("name-i").value.toLowerCase();
  const dia = nm.find((n) => n === nameI.replace(/\s+/g, ""));
  if (dia) {
    fetchData();
  }
  if (nameI === "") {
    document.querySelector(".alert1").classList.add("show");
    imgF.setAttribute("src", "img/tidak.gif");
    setTimeout(() => {
      imgF.setAttribute("src", "img/input.gif");
      document.querySelector(".alert1").classList.remove("show");
    }, 1500);
    return;
  }
  if (nameI.length < 4) {
    document.querySelector(".alert2").classList.add("show");
    imgF.setAttribute("src", "img/tidak.gif");
    setTimeout(() => {
      imgF.setAttribute("src", "img/input.gif");
      document.querySelector(".alert2").classList.remove("show");
    }, 1500);
    return;
  }
  if (nameI.length > 18) {
    document.querySelector(".alert4").classList.add("show");
    imgF.setAttribute("src", "img/tidak.gif");
    setTimeout(() => {
      imgF.setAttribute("src", "img/input.gif");
      document.querySelector(".alert4").classList.remove("show");
    }, 1500);
    return;
  }
  localStorage.setItem("name", nameI);
  sessionStorage.setItem("anim-masuk", "true");
  animpage();
  location.reload();
  load.classList.remove("show");
  confirm.classList.remove("show");
});

document.getElementById("btn-enggak").addEventListener("click", () => {
  pick("#pick-2");
  document.getElementById("enggak").classList.remove("hidden");
  document.getElementById("belum-mau").classList.add("hidden");
  que("#gif-j").setAttribute("src", "img/enggak.gif");
  que("#gif-enggak").setAttribute("src", "img/enggak.gif");
});

// write

function write(text, wrt) {
  let i = 0;
  function typeWrite() {
    if (i < text.length) {
      wrt.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWrite, 50);
    }
  }
  typeWrite();
}

let value = 50;
btnNoI.addEventListener("mouseover", () => {
  imgF.setAttribute("src", "img/tidak.gif");
  document.querySelector(".alert3").classList.add("show");
  document.querySelector(".alert1").classList.remove("show");
  btnNoI.style.transform = `translate(-${value}px)`;
});
btnNoI.addEventListener("mouseout", () => {
  setTimeout(() => {
    imgF.setAttribute("src", "img/marah.gif");
    setTimeout(() => {
      imgF.setAttribute("src", "img/input.gif");
    }, 2000);
    document.querySelector(".alert3").classList.remove("show");
  }, 2000);
  if (value > 200) {
    value -= 250;
  } else {
    value += 50;
  }
});
que(".card").classList.remove("hidden");
const dia = nm.find((n) => n === nameS.replace(/\s+/g, ""));
animpage();
function animpage() {
  if (sessionStorage.getItem("anim-masuk")) {
    que("#selamat-ulangtahun").classList.remove("hidden");
    setTimeout(() => {
      que("#write-1").classList.remove("hidden");
      const ucapanSelamat =
        " Semoga panjang umur ya biar aku ada temen, kalau kamu gak ada aku juga ikut gak ada 😒.";
      write(ucapanSelamat, que("#write-1"));
      setTimeout(() => {
        que("#write-2").classList.remove("hidden");
        const ucapanWrite2 = "Sehat selalu ya!!";
        write(ucapanWrite2, que("#write-2"));
        setTimeout(() => {
          que("#lanjut").classList.remove("hidden");
        }, 1000);
      }, 5000);
    }, 1000);
  } else {
    que("#tawaran-kado").classList.add("hidden");
    const ucapanTetap1 =
      "Maaf ya bilangnya lewat sini soalnya kalo bilang langsung aku malu 😂🤣";
    write(ucapanTetap1, doc("tetap-1"));
    sTR("tetap-2", 4600);
    const ucapanTetap3 = "Nambah tua aja ya, hehe ><";
    sTW(ucapanTetap3, "tetap-3", 5000);
    if (localStorage.getItem("name") === dia) {
      sTR("tetap-4", 6600);
    } else {
      sTR("btn-balas", 6600);
    }
    if (dia) {
      que(".container").classList.remove("hidden");
      docR("footer");
      fetchData();
    } else if (nameS) {
      docR("footer");
    }
    if (sessionStorage.getItem("no")) {
      que("#open-form").click();
    }
    balas();
  }
}

que("#lanjut").addEventListener("click", (e) => {
  pick("#pick-3");
  e.preventDefault();
  que("#lanjut").classList.add("hidden");
  que("#tunggu").classList.remove("hidden");
  setTimeout(() => {
    que("#tunggu").classList.add("hidden");
    que("#selamat-ulangtahun").classList.add("hidden");
    que("#write-1").classList.add("hidden");
    que("#write-2").classList.add("hidden");
    que("#tawaran-kado").classList.remove("hidden");
  }, 1000);
});

function balas() {
  if (localStorage.getItem("foto") === "belum-balas") {
    setTimeout(() => {
      que("#modal-balas").classList.add("show");
      que("#pesan").value = `Terimakasih sudah mengucapkan kepada ${nameS}`;
    }, 8000);
  }
}

function docR(dc) {
  return document.getElementById(dc).classList.remove("hidden");
}

function doc(dc) {
  return document.getElementById(dc);
}
function que(q) {
  return document.querySelector(q);
}

function sTR(set, time) {
  setTimeout(() => {
    docR(set);
  }, time);
}

function sTW(wrt, set, time) {
  setTimeout(() => {
    write(wrt, doc(set));
  }, time);
}

function nama() {
  document.querySelectorAll("#name").forEach((i) => {
    i.innerText = nameS;
  });
}

que("#open-form").addEventListener("click", () => {
  docR("display-form-photo");
  doc("home").classList.add("hidden");
  doc("footer").classList.add("hidden");
  noFoto();
});

function noFoto() {
  if (!sessionStorage.getItem("no")) {
    que("#close-form").classList.remove("hidden");
    que(".alert-i").classList.add("hidden");
  } else {
    que(".alert-i").classList.remove("hidden");
  }
}

window.addEventListener("scroll", () => {
  let pageY = this.window.scrollY;
  if (
    !localStorage.getItem("foto") &&
    nameS.replace(/\s+/g, "") === dia &&
    pageY > 600
  ) {
    sessionStorage.setItem("no", "refresh");
    que("#open-form").click();
  }
});
que("#description").addEventListener("input", reset);
que("#title").addEventListener("input", reset);
function reset() {
  if (que("#description").value.trim() || que("#title").value.trim() !== "") {
    que(".reset-form").classList.remove("hidden");
  } else {
    que(".reset-form").classList.add("hidden");
  }
}

que("#close-form").addEventListener("click", () => {
  doc("display-form-photo").classList.add("hidden");
  docR("home");
  docR("footer");
  que("#close-form").classList.add("hidden");
  clearForm();
  scroll();
});

que("#clear").addEventListener("click", () => {
  load.classList.add("show");
  localStorage.clear();
  location.reload();
});
let linkInput = window.location.origin + window.location.pathname;
que("#linkToCopy").value = linkInput;
que("#salin").addEventListener("click", function () {
  const linkInput = document.getElementById("linkToCopy");
  linkInput.select();
  linkInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Link berhasil disalin: " + linkInput.value);
});

// crud foto
const API_URL =
  "https://script.google.com/macros/s/AKfycbxbDiIvOMf5Qn28ARtHumKLv9VXMlxns89geTyv8s4SaNsGDNlCwIdTawxcqZ4VsbOn/exec";
const items = JSON.parse(localStorage.getItem("items")) || [];

if (sessionStorage.getItem("scroll")) {
}

async function fetchData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  if (JSON.stringify(localStorage.getItem("items")) !== JSON.stringify(data)) {
    try {
      const response = saveData("items", JSON.stringify(data));
      console.log(response);
      reloadData();
    } catch (e) {
      alert(e.message);
    }
  }
}

function reloadData() {
  const dataGallery = que(".data-gallery");
  dataGallery.innerHTML = "";
  let i = 1;
  items
    .slice()
    .reverse()
    .forEach((row) => {
      const style = i++ % 2 === 0 ? "true" : "false";
      const div = document.createElement("div");
      div.innerHTML = `
  <div class="display-img-${style}">
    <img src="${row[1]}" alt="${row[2]}" />
    <div class="desc">
    <span id="edit" onclick="editData(${row[0]},'${row[1]}','${row[2]}','${row[3]}')"><i class="fa-solid fa-pen-to-square"></i></span>
      <h3>${row[2]}</h3>
      <blockquote" >
      ${row[3]}
      </blockquote>
    </div>
  </div>
  `;
      dataGallery.appendChild(div);
    });
}
reloadData();

let photoUrl;
document.getElementById("photo").addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    // Cek apakah file adalah gambar berdasarkan ekstensi atau MIME type
    if (file.size > 1024 * 1024 * 2) {
      document.getElementById("photo").value = "";
      return alert("File terlalu besar pilih foto yang lain!!");
    }
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        photoUrl = e.target.result; // URL Base64
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById("photo").value = "";
      return alert("Pilih file foto yang lain!!");
    }
  }
});
//  setelah confert url
document.getElementById("photo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  load.classList.add("show");
  if (!localStorage.getItem("foto")) {
    localStorage.setItem("foto", "belum-balas");
  }
  const id = que("#id").value;
  const title = que("#title").value;
  const description = document.getElementById("description").value;
  const action = id ? "update" : "create"; // Jika ID ada, berarti edit
  if (!photoUrl) {
    return alert("File foto belum dimasukan!");
  }
  // Kirim ke storage dulu
  addItem(parseInt(id), photoUrl, title, description);
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action, id, photoUrl, title, description }),
  });
  console.log(await response.text());
  load.classList.remove("show");
  fetchData();
});

function addItem(id, photoUrl, title, description) {
  try {
    if (id) {
      const index = items.findIndex((item) => item[0] === id);
      items[index] = [id, photoUrl, title, description];
    } else {
      const newID = parseInt(localStorage.getItem("lastR")) + 1 || 0;
      const newItem = [newID, photoUrl, title, description];
      items.push(newItem);
      localStorage.setItem("lastR", newID);
    }
    const response = saveData("items", JSON.stringify(items));
    sessionStorage.removeItem("no");
    console.log(response);
    photoUrl = "";
    reloadData();
    clearForm();
    noFoto();
    balas();
  } catch (e) {
    alert(e.message);
  }
}

function editData(id, photo, title, description) {
  document.getElementById("id").value = id;
  photoUrl = photo;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  que("#open-form").click();
  que(".reset-form").classList.remove("hidden");
}

function clearForm() {
  que("#id").value = "";
  que("#photo").value = "";
  que("#title").value = "";
  que("#description").value = "";
}
function saveData(key, value) {
  try {
    localStorage.setItem(key, value);
    return "Data berhasil disimpan!!";
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      throw new Error("Penyimpanan penuh!!");
    } else {
      throw new Error("Terjadi kesalahan!!");
    }
  }
}
