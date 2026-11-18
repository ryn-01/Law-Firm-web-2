const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    menuButton.querySelector("svg").innerHTML = isOpen
      ? '<path d="m6 6 12 12M18 6 6 18"/>'
      : "<path d=\"M4 7h16M4 12h16M4 17h16\"/>";
    navigation.classList.toggle("is-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    const subject = `Permintaan konsultasi awal — ${values.get("nama")}`;
    const body = [
      `Nama: ${values.get("nama")}`,
      `Telepon/WhatsApp: ${values.get("telepon")}`,
      `Email: ${values.get("email") || "-"}`,
      `Kota domisili: ${values.get("kota")}`,
      `Kategori: ${values.get("bidang")}`,
      `Waktu yang diinginkan: ${values.get("waktu")}`,
      "",
      "Ringkasan:",
      values.get("pesan"),
    ].join("\n");
    const mailto = `mailto:hspatnerslawfirm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    document.querySelector(".form-status").textContent =
      "Draf email disiapkan. Periksa isinya, lalu tekan Kirim di aplikasi email Anda. Pesan belum terkirim dari situs.";
    window.location.href = mailto;
  });
}
