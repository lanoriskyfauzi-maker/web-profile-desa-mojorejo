const potensiData = [
  {
    kategori: "umkm",
    nama: "Pia Jolodoro",
    deskripsi: "Roti atau Kue Pia Jolodoro diproduksi menggunakan kombinasi bahan adonan kue tradisional dan berbagai isian.",
    img: "assets/jolodoro.jpeg",
    kontak: "https://wa.me/6281234567890"
  },
  {
    kategori: "umkm",
    nama: "JAN Etes",
    deskripsi: "berfokus pada olahan jajanan tradisional atau camilan kering (snack pangan lokal) yang dikembangkan secara kreatif oleh ibu-ibu Pokja 2 PKK.",
    img: "assets/janetes.jpeg",
    kontak: "https://wa.me/6281234567891"
  },
  {
    kategori: "wisata",
    nama: "Sukasikuda Stable & Resto",
    deskripsi: " destinasi wisata keluarga yang memadukan wisata berkuda (horse riding), olahraga renang, dan wisata kuliner (resto) dalam satu kawasan.",
    img: "assets/keg9.jpg",
    kontak: "#"
  },
  
];

const galeriData = [
  { img: "assets/wisata1.jpeg", kategori: "wisata", caption: "Kolam renang sukasikuda", size: "wide" },
  { img: "assets/keg1.jpeg", kategori: "kegiatan", caption: "Kumpulan Karang taruna", size: "tall" },
  { img: "assets/umkm1.jpeg", kategori: "umkm", caption: "Proses Pembuatan JANetes" },
  { img: "assets/keg2.jpeg", kategori: "kegiatan", caption: "trough leaf printing bersama ibu-ibu PKK dukuh Masan" },
  { img: "assets/umkm2.jpeg", kategori: "umkm", caption: "Proses pembuatan Pia Jolodoro", size: "tall" },
  { img: "assets/keg3.jpeg", kategori: "kegiatan", caption: "Psikoedukasi : Kenali emosi sdn 02 mojorejo" },
  { img: "assets/keg4.jpeg", kategori: "kegiatan", caption: "Pertemuan ibu-ibu PKK" },
  { img: "assets/keg5.jpeg", kategori: "kegiatan", caption: "Posyandu balita" },
  { img: "assets/keg7.jpeg", kategori: "kegiatan", caption: "Pemandangan persawahan" },
];

/* ---------- 2. RENDER: potensi desa ---------- */

function renderPotensi(filter) {
  const grid = document.getElementById("potensiGrid");
  const data = filter === "semua" ? potensiData : potensiData.filter(d => d.kategori === filter);
  const labelMap = { umkm: "UMKM", wisata: "Wisata", fasilitas: "Fasilitas" };

  grid.innerHTML = data.map(item => `
    <div class="card reveal in-view">
      <div class="card-media"><img src="${item.img}" alt="${item.nama}" loading="lazy"></div>
      <div class="card-body">
        <span class="card-tag">${labelMap[item.kategori]}</span>
        <h3>${item.nama}</h3>
        <p>${item.deskripsi}</p>
        ${item.kategori === "umkm" ? `
        <a class="card-link" href="${item.kontak}" target="_blank" rel="noopener">
          Hubungi via WhatsApp →
        </a>` : ""}
      </div>
    </div>
  `).join("");
} 

/* ---------- 3. RENDER: galeri ---------- */

function renderGaleri(filter) {
  const grid = document.getElementById("galeriGrid");
  const data = filter === "semua" ? galeriData : galeriData.filter(d => d.kategori === filter);

  grid.innerHTML = data.map(item => `
    <figure class="${item.size || ""}" data-img="${item.img}" data-caption="${item.caption}">
      <img src="${item.img}" alt="${item.caption}" loading="lazy">
    </figure>
  `).join("");

  document.querySelectorAll("#galeriGrid figure").forEach(fig => {
    fig.addEventListener("click", () => openLightbox(fig.dataset.img, fig.dataset.caption));
  });
}

/* ---------- 4. FILTER BUTTONS ---------- */

function setupFilter(containerId, renderFn) {
  const container = document.getElementById(containerId);
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderFn(btn.dataset.filter);
  });
}

/* ---------- 5. LIGHTBOX ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("open");
}
function closeLightbox() {
  lightbox.classList.remove("open");
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ---------- 6. NAV: toggle mobile + shadow on scroll ---------- */

const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

/* ---------- 7. ACTIVE NAV LINK ON SCROLL ---------- */

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(sec => sectionObserver.observe(sec));

/* ---------- 8. REVEAL ON SCROLL ---------- */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- 9. INIT ---------- */

renderPotensi("semua");
renderGaleri("semua");
setupFilter("potensiFilter", renderPotensi);
setupFilter("galeriFilter", renderGaleri);
