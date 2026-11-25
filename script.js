// TDent website — small, dependency-free interactions.
(function () {
  "use strict";

  // App screens shown in the tab gallery and lightbox.
  var screens = [
    { file: "01-today", url: "tdent.app/today", title: "আজকের সব", desc: "আজকের নতুন রোগী, অ্যাপয়েন্টমেন্ট, সিরিয়াল, বিল আর জমা — সব এক পেজে।" },
    { file: "02-appointments", url: "tdent.app/appointments", title: "অ্যাপয়েন্টমেন্ট", desc: "ডাক্তার আর চেয়ার অনুযায়ী সময় ঠিক করুন, ভুল হলে এক ক্লিকে বদলান।" },
    { file: "03-patient-profile", url: "tdent.app/patients/TD-0001", title: "রোগীর প্রোফাইল", desc: "মোট বিল, জমা, বকেয়া আর পুরো চিকিৎসার ইতিহাস এক জায়গায়।" },
    { file: "04-new-bill", url: "tdent.app/bill/new", title: "নতুন বিল", desc: "দাঁতের চার্ট থেকে দাঁত বেছে বিল করুন, রিসিটে দাঁতের নম্বর থাকবে।" },
    { file: "05-doctor-profit", url: "tdent.app/doctors", title: "ডাক্তারের লাভ-লস", desc: "প্রতিটা ডাক্তারের আয়, শেয়ার আর লাভ-লস অটোমেটিক হিসাব।" },
    { file: "06-daily-account", url: "tdent.app/daily", title: "দৈনিক হিসাব", desc: "আজ কত কালেকশন, কত খরচ, ক্যাশে কত আছে — দিন শেষে এক নজরে।" },
    { file: "07-monthly-report", url: "tdent.app/reports/monthly", title: "মাসিক রিপোর্ট", desc: "পুরো মাসের আয়, খরচ আর লাভের পরিষ্কার রিপোর্ট।" },
    { file: "08-inventory", url: "tdent.app/inventory", title: "ইনভেন্টরি", desc: "মালামালের স্টক রাখুন, কম পড়লে আগেই জানবেন।" }
  ];
  var bnDigits = "০১২৩৪৫৬৭৮৯";
  function bn(n) { return String(n).replace(/\d/g, function (d) { return bnDigits[d]; }); }
  function src(i) { return "assets/img/" + screens[i].file + ".webp"; }

  // Mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Screen tabs
  var list = document.getElementById("tabList");
  var img = document.getElementById("tabImg");
  var current = 0;
  screens.forEach(function (s, i) {
    var b = document.createElement("button");
    b.className = "tab-btn";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.innerHTML = '<span class="n">' + bn(i + 1) + "</span>" + s.title;
    b.addEventListener("click", function () { show(i); });
    list.appendChild(b);
  });
  function show(i) {
    current = i;
    var s = screens[i];
    [].forEach.call(list.children, function (b, k) { b.setAttribute("aria-selected", k === i); });
    img.classList.add("fade");
    setTimeout(function () {
      img.src = src(i);
      img.alt = "TDent — " + s.title;
      img.classList.remove("fade");
    }, 180);
    document.getElementById("tabUrl").textContent = s.url;
    document.getElementById("tabTitle").textContent = s.title;
    document.getElementById("tabDesc").textContent = s.desc;
  }
  show(0);
  // Preload the rest so switching is instant.
  screens.forEach(function (_, i) { if (i) { var p = new Image(); p.src = src(i); } });

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  function openLb(i) {
    current = (i + screens.length) % screens.length;
    lbImg.src = src(current);
    lbImg.alt = screens[current].title;
    lbCap.textContent = bn(current + 1) + " / " + bn(screens.length) + " · " + screens[current].title;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; show(current); }
  document.querySelector(".tab-view .browser").addEventListener("click", function () { openLb(current); });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { openLb(current - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { openLb(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openLb(current - 1);
    if (e.key === "ArrowRight") openLb(current + 1);
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  document.getElementById("year").textContent = bn(new Date().getFullYear());
})();
