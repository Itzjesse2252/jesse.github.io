const navBtnIcon = document.querySelector("#nav-btn-icon");
const navBar = document.querySelector("#navigation");
const body = document.querySelector("body");
const navBtn = document.querySelector("#nav-btn");
const themeBtn = document.querySelector("#theme-btn");
const themeIcon = document.querySelector("#theme-icon");
const transSubmitBtn = document.querySelector("#trans-submit-btn");
const aiAboutBtn = document.querySelector("#ai-about-btn");
const realAboutBtn = document.querySelector("#real-about-btn");
const realAbout = document.querySelector("#real-about");
const aiAbout = document.querySelector("#ai-about");
const devPageLink = document.querySelector("#dev-page-link");
const aboutPageLink = document.querySelector("#about-page-link");
const contactPageLink = document.querySelector("#contact-page-link");
const devPage = document.querySelector("#developer-page");
const aboutPage = document.querySelector("#about-page");
const contactPage = document.querySelector("#contact-page");
const contactBtn = document.querySelector("#contact-btn");
const aboutBtn = document.querySelector("#about-btn");
const showingPage = document.querySelector("#showing-page");
const navCancelBtn = document.querySelector("#cancel-btn");
const stickyNav = document.querySelector("#sticky-nav");
const footer = document.querySelector("footer");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
} else {
  body.classList.remove("dark-theme");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

showingPage.classList.add("hidden");
  navCancelBtn.classList.add("hidden");
  devPage.classList.add("hidden");
    aboutPage.classList.add("hidden");
    contactPage.classList.add("hidden");
    
    
navBtnIcon.addEventListener("click", () => {
  if (navBtnIcon.classList.contains("fa-grip-lines")) {
    navBtnIcon.classList.replace("fa-grip-lines", "fa-xmark");
  } else {
    navBtnIcon.classList.replace("fa-xmark", "fa-grip-lines");
  }
  navBar.classList.toggle("hidden");
});

function toggleTheme() {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

function showPage(pageToShow, pageName) {
  setTimeout(() => {
    // Hide all pages
    devPage.classList.add("hidden");
    aboutPage.classList.add("hidden");
    contactPage.classList.add("hidden");// Show requested page
pageToShow.classList.remove("hidden");
footer.classList.remove("hidden");

// Scroll after layout update
requestAnimationFrame(() => {
  pageToShow.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  // Offset for sticky nav
  window.scrollBy(0, -stickyNav.offsetHeight);
});

// Update nav
stickyNav.classList.remove("hidden");
showingPage.classList.remove("hidden");
  navCancelBtn.classList.remove("hidden");
showingPage.textContent = pageName;
 }, 1000
);
}


devPageLink.addEventListener("click", () => showPage(devPage, "Dev Page"));
aboutPageLink.addEventListener("click", () => showPage(aboutPage, "About Page"));
contactPageLink.addEventListener("click", () => showPage(contactPage, "Contact Page"));




// Sticky nav close button
navCancelBtn.addEventListener("click", () => {
  showingPage.classList.add("hidden");
  navCancelBtn.classList.add("hidden");
  devPage.classList.add("hidden");
    aboutPage.classList.add("hidden");
    contactPage.classList.add("hidden");
    footer.classList.add("hidden");
});

// Internal links in dev section
if (aboutBtn) {
  aboutBtn.addEventListener("click", () => showPage(aboutPage, "About Page"));
}
if (contactBtn) {
  contactBtn.addEventListener("click", () => showPage(contactPage, "Contact Page"));
}



themeBtn.addEventListener("click", () => {
  toggleTheme()
});

aiAboutBtn.addEventListener("click", () => {
  realAbout.classList.add("hidden");
  aiAbout.classList.remove("hidden");
});

realAboutBtn.addEventListener("click", () => {
  aiAbout.classList.add("hidden");
  realAbout.classList.remove("hidden");
});

function timeTranslator (inputTime) {
  if (!inputTime || isNaN(new Date(inputTime).getTime())) {
    return `Please select a valid date and time`;
  } else {
    const date = new Date(inputTime);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const myTimeInfo = Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Lagos",
      timeStyle: "short",
      dateStyle: "full"
    }).format(date);

    const userTimeInfo = Intl.DateTimeFormat("en-US", {
      timeZone: userTimeZone,
      timeStyle: "full",
      dateStyle: "full"
    }).format(date);

    const myOffset = new Date(date.toLocaleString("en-US", { timeZone: "Africa/Lagos" })).getTimezoneOffset();
    const userOffset = new Date(date.toLocaleString("en-US", { timeZone: userTimeZone })).getTimezoneOffset();
    const timeOffset = (myOffset - userOffset) / 60;
    const absTimeOffset = Math.abs(timeOffset);
    
    return `My Date and Time: ${myTimeInfo}<br>Your Date and Time: ${userTimeInfo}.<br>In short, You are ${
      timeOffset === 0 ? "at the same timezone with me" : `${
        absTimeOffset
      } ${
        absTimeOffset > 1 ? "hours" : "hour"
      } ${
        timeOffset > 0 ? "ahead of" : "behind"
      } me`
    }`;
  } 
}

transSubmitBtn.addEventListener("click", () => {
  const timeTrans = document.querySelector("#time-trans");
  const transDisplay = document.querySelector("#trans-display");
  transDisplay.innerHTML = timeTranslator(timeTrans.value);
});

const emailBtn = document.querySelector("#email-btn");
emailBtn.addEventListener("click", () => {
  window.location.href = "mailto:jessechukwuemekae2252@gmail.com?subject=" + encodeURIComponent("Message about") + "&body=" + encodeURIComponent("Hello Jesse...");
});

const xBtn = document.querySelector("#x-btn");
xBtn.addEventListener("click", () => {
  window.open("https://x.com/messages/compose?recipient_id=1888884380950462464&text=Hello%20Jesse", "_blank");
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});


