// TDent website — small, dependency-free interactions.
(function () {
  "use strict";

  var themes = ["t-blue", "t-violet", "t-teal", "t-amber"];
  var screens = [
    { file: "01-today", url: "tdent.site/today", title: "আজকের সব, এক পেজে",
      desc: "দিনের শুরুতেই দেখুন আজ কী কী আছে। নতুন রোগী থেকে বিল — কিছুই বাদ যায় না।",
      points: ["আজকের নতুন রোগী আর ভিজিট", "অ্যাপয়েন্টমেন্ট আর সিরিয়াল", "আজকের বিল আর জমা"] },
    { file: "02-appointments", url: "tdent.site/appointments", title: "অ্যাপয়েন্টমেন্ট",
      desc: "ডাক্তার আর চেয়ার অনুযায়ী সময় দিন। কাল কার আসার কথা, আর ভুলবেন না।",
      points: ["ডাক্তার ও চেয়ার অনুযায়ী সময়", "রোগীর পেজ থেকেই ঠিক করা যায়", "আগের আর পরের সব অ্যাপয়েন্টমেন্ট"] },
    { file: "03-patient-profile", url: "tdent.site/patients/TD-0001", title: "রোগীর পুরো প্রোফাইল",
      desc: "রোগীর নাম লিখলেই সব হাজির — চিকিৎসার ইতিহাস থেকে বাকির হিসাব পর্যন্ত।",
      points: ["মোট বিল, জমা আর বকেয়া", "চিকিৎসা ও মেডিকেল হিস্ট্রি", "ফাইল, ছবি আর অ্যাপয়েন্টমেন্ট"] },
    { file: "04-new-bill", url: "tdent.site/bill/new", title: "দাঁতের নম্বরসহ বিল",
      desc: "দাঁতের চার্ট থেকে দাঁত বেছে বিল করুন। রিসিটে কোন দাঁতে কী কাজ, লেখা থাকে।",
      points: ["দাঁতের চার্ট থেকে বাছাই", "ডিসকাউন্ট আর আংশিক জমা", "এক ক্লিকে মানি রিসিট প্রিন্ট"] },
    { file: "05-doctor-profit", url: "tdent.site/doctors", title: "ডাক্তারের লাভ-লস",
      desc: "মাস শেষে আর হাতে হিসাব নয়। প্রতিটা ডাক্তারের আয় আর শেয়ার অটোমেটিক।",
      points: ["ডাক্তার অনুযায়ী আয়", "শেয়ার আর পাওনা হিসাব", "লাভ-লস এক নজরে"] },
    { file: "06-daily-account", url: "tdent.site/daily", title: "দৈনিক হিসাব",
      desc: "দিন শেষে ক্যাশ মিলিয়ে নিন। আজ কত এল, কত গেল — পরিষ্কার।",
      points: ["আজকের কালেকশন", "আজকের খরচ", "আগের তারিখের জমা সেই তারিখেই"] },
    { file: "07-monthly-report", url: "tdent.site/reports/monthly", title: "মাসিক রিপোর্ট",
      desc: "পুরো মাসের আয়, খরচ আর লাভ এক রিপোর্টে। সিদ্ধান্ত নিন তথ্য দেখে।",
      points: ["মাসের মোট আয় ও খরচ", "নিট লাভ", "খরচের খাত অনুযায়ী ভাগ"] },
    { file: "08-inventory", url: "tdent.site/inventory", title: "ইনভেন্টরি",
      desc: "মালামাল ফুরিয়ে যাওয়ার আগেই জানুন। স্টক থাকে সবসময় হিসাবে।",
      points: ["সব মালামালের স্টক", "কম পড়লে সতর্কবার্তা", "কেনা আর ব্যবহারের হিসাব"] }
  ];
  var bnDigits = "০১২৩৪৫৬৭৮৯";
  function bn(n) { return String(n).replace(/\d/g, function (d) { return bnDigits[d]; }); }
  function src(i) { return "assets/img/" + screens[i].file + ".webp"; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // Build showcase rows
  var rows = document.getElementById("rows");
  rows.innerHTML = screens.map(function (s, i) {
    return '<article class="row ' + themes[i % 4] + (i % 2 ? " flip" : "") + '">' +
      '<div class="copy reveal"><span class="num"><em>' + bn(i + 1) + "</em>" + (i < 9 ? "" : "") + "</span>" +
      "<h3>" + esc(s.title) + "</h3><p>" + esc(s.desc) + "</p><ul>" +
      s.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="visual reveal"><figure class="frame zoomable" data-i="' + i + '">' +
      '<div class="chrome"><i></i><i></i><i></i><span>' + esc(s.url) + "</span></div>" +
      '<img src="' + src(i) + '" alt="TDent — ' + esc(s.title) + '" width="1600" height="1000" loading="lazy"></figure></div>' +
      "</article>";
  }).join("");

  // Nav: shadow on scroll + mobile menu
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Lightbox for every screenshot
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var current = 0;
  function openLb(i) {
    current = (i + screens.length) % screens.length;
    lbImg.src = src(current);
    lbImg.alt = screens[current].title;
    lbCap.textContent = bn(current + 1) + " / " + bn(screens.length) + " · " + screens[current].title;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  document.addEventListener("click", function (e) {
    var z = e.target.closest(".zoomable");
    if (z) openLb(+z.getAttribute("data-i"));
  });
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
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  document.getElementById("year").textContent = bn(new Date().getFullYear());
})();
