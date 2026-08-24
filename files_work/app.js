/* =========================================================
   CAMPUS EXTRA JAVASCRIPT
   Paste this at the END of your existing app.js file.

   Adds:
   - Event sorting
   - Live event result counter
   - Saved sort preference
   - Password strength checker
   - Confirm-password validation
   - Better form handling
   - Toast notifications
   - Back-to-top button
   - Keyboard shortcuts
   - Online/offline detection
   - Automatic footer year
   - LocalStorage UI preferences

   No Node.js
   No Map API
   No backend
========================================================= */

(function () {
  "use strict";

  const EXTRA_PREFS_KEY = "campus_extra_preferences_v1";

  const select = (selector, root = document) =>
    root.querySelector(selector);

  const selectAll = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  /* =========================================================
     LOCAL STORAGE PREFERENCES
  ========================================================= */

  function getPreferences() {
    try {
      return (
        JSON.parse(localStorage.getItem(EXTRA_PREFS_KEY)) || {}
      );
    } catch (error) {
      return {};
    }
  }

  function savePreference(name, value) {
    const preferences = getPreferences();

    preferences[name] = value;

    localStorage.setItem(
      EXTRA_PREFS_KEY,
      JSON.stringify(preferences)
    );
  }

  /* =========================================================
     DEBOUNCE
     Prevents a function from running too many times.
  ========================================================= */

  function debounce(callback, delay = 150) {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  /* =========================================================
     TOAST MESSAGE
  ========================================================= */

  function showExtraToast(message) {
    let toast = select("#extra-toast");

    if (!toast) {
      toast = document.createElement("div");

      toast.id = "extra-toast";

      toast.style.position = "fixed";
      toast.style.right = "25px";
      toast.style.bottom = "25px";
      toast.style.padding = "12px 18px";
      toast.style.background = "#14171f";
      toast.style.color = "#ffffff";
      toast.style.borderRadius = "8px";
      toast.style.fontSize = "13px";
      toast.style.fontWeight = "600";
      toast.style.zIndex = "99999";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition =
        "opacity .2s ease, transform .2s ease";
      toast.style.pointerEvents = "none";

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 2200);
  }

  /* =========================================================
     EVENT DATE CONVERSION
     Converts:
     20 Aug 2026
     into JavaScript Date value.
  ========================================================= */

  function convertEventDate(dateString) {
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    };

    const parts = String(dateString)
      .trim()
      .split(" ");

    if (parts.length !== 3) {
      return Number.MAX_SAFE_INTEGER;
    }

    const day = Number(parts[0]);
    const month = months[parts[1]];
    const year = Number(parts[2]);

    if (
      Number.isNaN(day) ||
      month === undefined ||
      Number.isNaN(year)
    ) {
      return Number.MAX_SAFE_INTEGER;
    }

    return new Date(
      year,
      month,
      day
    ).getTime();
  }

  /* =========================================================
     EVENT RESULT COUNTER
  ========================================================= */

  function updateEventCounter() {
    const eventGrid =
      select("#events-grid");

    const counter =
      select("#extra-event-count");

    if (!eventGrid || !counter) {
      return;
    }

    const cards =
      selectAll(
        ".event-card",
        eventGrid
      );

    const visibleCards =
      cards.filter((card) => {
        return !card.classList.contains(
          "hidden"
        );
      });

    const total =
      visibleCards.length;

    if (total === 1) {
      counter.textContent =
        "1 event shown";
    } else {
      counter.textContent =
        `${total} events shown`;
    }
  }

  /* =========================================================
     EVENT SORTING
  ========================================================= */

  function sortEventCards(sortType) {
    const eventGrid =
      select("#events-grid");

    if (!eventGrid) {
      return;
    }

    const cards =
      selectAll(
        ".event-card",
        eventGrid
      );

    cards.sort((cardA, cardB) => {
      const titleA =
        cardA.dataset.title || "";

      const titleB =
        cardB.dataset.title || "";

      const dateA =
        convertEventDate(
          cardA.dataset.date
        );

      const dateB =
        convertEventDate(
          cardB.dataset.date
        );

      const registeredA =
        Number(
          cardA.dataset.registered || 0
        );

      const registeredB =
        Number(
          cardB.dataset.registered || 0
        );

      const capacityA =
        Number(
          cardA.dataset.capacity || 0
        );

      const capacityB =
        Number(
          cardB.dataset.capacity || 0
        );

      const spotsA =
        capacityA - registeredA;

      const spotsB =
        capacityB - registeredB;

      switch (sortType) {
        case "date-earliest":
          return dateA - dateB;

        case "date-latest":
          return dateB - dateA;

        case "popular":
          return registeredB - registeredA;

        case "spots":
          return spotsB - spotsA;

        case "az":
          return titleA.localeCompare(
            titleB
          );

        case "za":
          return titleB.localeCompare(
            titleA
          );

        default:
          return 0;
      }
    });

    cards.forEach((card) => {
      eventGrid.appendChild(card);
    });

    savePreference(
      "eventSort",
      sortType
    );

    updateEventCounter();
  }

  /* =========================================================
     CREATE EVENT SORT CONTROLS
  ========================================================= */

  function setupEventSorting() {
    const searchInput =
      select("#event-search");

    const eventGrid =
      select("#events-grid");

    if (
      !searchInput ||
      !eventGrid
    ) {
      return;
    }

    if (
      select("#extra-event-tools")
    ) {
      return;
    }

    const tools =
      document.createElement("div");

    tools.id =
      "extra-event-tools";

    tools.style.display = "flex";
    tools.style.alignItems = "center";
    tools.style.justifyContent =
      "space-between";
    tools.style.gap = "15px";
    tools.style.flexWrap = "wrap";
    tools.style.margin =
      "0 0 22px 0";

    const resultText =
      document.createElement("span");

    resultText.id =
      "extra-event-count";

    resultText.style.fontSize =
      "13px";
    resultText.style.color =
      "#777b86";

    const sortWrapper =
      document.createElement("label");

    sortWrapper.style.display =
      "flex";
    sortWrapper.style.alignItems =
      "center";
    sortWrapper.style.gap =
      "8px";
    sortWrapper.style.fontSize =
      "13px";
    sortWrapper.style.fontWeight =
      "600";

    sortWrapper.textContent =
      "Sort:";

    const sortSelect =
      document.createElement("select");

    sortSelect.id =
      "extra-event-sort";

    sortSelect.style.padding =
      "8px 10px";
    sortSelect.style.border =
      "1px solid #d8d9dd";
    sortSelect.style.borderRadius =
      "6px";
    sortSelect.style.background =
      "#ffffff";
    sortSelect.style.cursor =
      "pointer";

    sortSelect.innerHTML = `
      <option value="date-earliest">
        Date: Earliest
      </option>

      <option value="date-latest">
        Date: Latest
      </option>

      <option value="popular">
        Most Registered
      </option>

      <option value="spots">
        Most Spots Left
      </option>

      <option value="az">
        Title A-Z
      </option>

      <option value="za">
        Title Z-A
      </option>
    `;

    sortWrapper.appendChild(
      sortSelect
    );

    tools.appendChild(
      resultText
    );

    tools.appendChild(
      sortWrapper
    );

    const chipRow =
      select(".chip-row");

    if (chipRow) {
      chipRow.insertAdjacentElement(
        "afterend",
        tools
      );
    } else {
      eventGrid.insertAdjacentElement(
        "beforebegin",
        tools
      );
    }

    const preferences =
      getPreferences();

    const savedSort =
      preferences.eventSort ||
      "date-earliest";

    sortSelect.value =
      savedSort;

    sortEventCards(
      savedSort
    );

    sortSelect.addEventListener(
      "change",
      function () {
        sortEventCards(
          sortSelect.value
        );

        showExtraToast(
          "Event sorting updated"
        );
      }
    );

    searchInput.addEventListener(
      "input",
      debounce(() => {
        setTimeout(
          updateEventCounter,
          20
        );
      }, 120)
    );

    selectAll(
      "[data-category]"
    ).forEach((button) => {
      button.addEventListener(
        "click",
        function () {
          setTimeout(
            updateEventCounter,
            20
          );
        }
      );
    });

    const observer =
      new MutationObserver(() => {
        updateEventCounter();
      });

    selectAll(
      ".event-card",
      eventGrid
    ).forEach((card) => {
      observer.observe(
        card,
        {
          attributes: true,
          attributeFilter: [
            "class"
          ]
        }
      );
    });

    updateEventCounter();
  }

  /* =========================================================
     PASSWORD STRENGTH
  ========================================================= */

  function calculatePasswordStrength(
    password
  ) {
    let score = 0;

    if (
      password.length >= 6
    ) {
      score++;
    }

    if (
      password.length >= 10
    ) {
      score++;
    }

    if (
      /[A-Z]/.test(password)
    ) {
      score++;
    }

    if (
      /[0-9]/.test(password)
    ) {
      score++;
    }

    if (
      /[^A-Za-z0-9]/.test(
        password
      )
    ) {
      score++;
    }

    return Math.min(
      score,
      4
    );
  }

  function setupPasswordStrength() {
    const registerForm =
      select("#register-form");

    if (!registerForm) {
      return;
    }

    const passwordInput =
      registerForm.elements.password;

    const confirmInput =
      registerForm.elements
        .confirmPassword;

    if (
      !passwordInput ||
      !confirmInput
    ) {
      return;
    }

    const strengthBox =
      document.createElement("div");

    strengthBox.style.margin =
      "-5px 0 12px 0";

    const strengthBar =
      document.createElement("div");

    strengthBar.style.width =
      "100%";
    strengthBar.style.height =
      "5px";
    strengthBar.style.background =
      "#e9e9ec";
    strengthBar.style.borderRadius =
      "10px";
    strengthBar.style.overflow =
      "hidden";

    const strengthFill =
      document.createElement("div");

    strengthFill.style.width =
      "0%";
    strengthFill.style.height =
      "100%";
    strengthFill.style.transition =
      "all .25s ease";

    strengthBar.appendChild(
      strengthFill
    );

    const strengthText =
      document.createElement("small");

    strengthText.style.display =
      "block";
    strengthText.style.marginTop =
      "6px";
    strengthText.style.color =
      "#777b86";

    strengthText.textContent =
      "Password strength";

    strengthBox.appendChild(
      strengthBar
    );

    strengthBox.appendChild(
      strengthText
    );

    passwordInput
      .closest(".field")
      .insertAdjacentElement(
        "afterend",
        strengthBox
      );

    function refreshStrength() {
      const password =
        passwordInput.value;

      const score =
        calculatePasswordStrength(
          password
        );

      const labels = [
        "Very weak",
        "Weak",
        "Okay",
        "Strong",
        "Very strong"
      ];

      const colors = [
        "#d64545",
        "#d97706",
        "#c49a00",
        "#31825c",
        "#18794e"
      ];

      if (
        password.length === 0
      ) {
        strengthFill.style.width =
          "0%";

        strengthText.textContent =
          "Password strength";

        return;
      }

      strengthFill.style.width =
        `${(score + 1) * 20}%`;

      strengthFill.style.background =
        colors[score];

      strengthText.textContent =
        `Password strength: ${labels[score]}`;

      strengthText.style.color =
        colors[score];
    }

    function checkPasswords() {
      if (
        confirmInput.value &&
        confirmInput.value !==
          passwordInput.value
      ) {
        confirmInput.setCustomValidity(
          "Passwords do not match"
        );
      } else {
        confirmInput.setCustomValidity(
          ""
        );
      }
    }

    passwordInput.addEventListener(
      "input",
      function () {
        refreshStrength();
        checkPasswords();
      }
    );

    confirmInput.addEventListener(
      "input",
      checkPasswords
    );
  }

  /* =========================================================
     FORM CLEANUP
  ========================================================= */

  function setupFormCleanup() {
    selectAll(
      'input[type="email"]'
    ).forEach((input) => {
      input.addEventListener(
        "blur",
        function () {
          input.value =
            input.value
              .trim()
              .toLowerCase();
        }
      );
    });

    selectAll(
      'input[type="text"]'
    ).forEach((input) => {
      input.addEventListener(
        "blur",
        function () {
          input.value =
            input.value.trim();
        }
      );
    });
  }

  /* =========================================================
     BACK TO TOP BUTTON
  ========================================================= */

  function setupBackToTop() {
    if (
      select("#back-to-top-extra")
    ) {
      return;
    }

    const button =
      document.createElement("button");

    button.id =
      "back-to-top-extra";

    button.type =
      "button";

    button.textContent =
      "↑";

    button.title =
      "Back to top";

    button.style.position =
      "fixed";

    button.style.right =
      "25px";

    button.style.bottom =
      "80px";

    button.style.width =
      "42px";

    button.style.height =
      "42px";

    button.style.border =
      "none";

    button.style.borderRadius =
      "50%";

    button.style.background =
      "#14171f";

    button.style.color =
      "#ffffff";

    button.style.fontSize =
      "20px";

    button.style.cursor =
      "pointer";

    button.style.opacity =
      "0";

    button.style.visibility =
      "hidden";

    button.style.transition =
      "all .2s ease";

    button.style.zIndex =
      "999";

    document.body.appendChild(
      button
    );

    function updateButton() {
      if (
        window.scrollY > 450
      ) {
        button.style.opacity =
          "1";

        button.style.visibility =
          "visible";
      } else {
        button.style.opacity =
          "0";

        button.style.visibility =
          "hidden";
      }
    }

    window.addEventListener(
      "scroll",
      updateButton,
      {
        passive: true
      }
    );

    button.addEventListener(
      "click",
      function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    );

    updateButton();
  }

  /* =========================================================
     KEYBOARD SHORTCUTS
  ========================================================= */

  function setupKeyboardShortcuts() {
    document.addEventListener(
      "keydown",
      function (event) {
        const activeElement =
          document.activeElement;

        const tagName =
          activeElement
            ? activeElement.tagName
            : "";

        const userTyping =
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT";

        /*
           Press /
           Focus event search
        */

        if (
          event.key === "/" &&
          !userTyping
        ) {
          const search =
            select("#event-search");

          if (search) {
            event.preventDefault();

            search.focus();

            showExtraToast(
              "Search focused"
            );
          }
        }

        /*
           Press Escape while
           using event search
           to clear search.
        */

        if (
          event.key === "Escape" &&
          activeElement &&
          activeElement.id ===
            "event-search"
        ) {
          activeElement.value =
            "";

          activeElement.dispatchEvent(
            new Event(
              "input",
              {
                bubbles: true
              }
            )
          );

          activeElement.blur();

          showExtraToast(
            "Search cleared"
          );
        }
      }
    );
  }

  /* =========================================================
     ONLINE / OFFLINE STATUS
  ========================================================= */

  function setupConnectionStatus() {
    window.addEventListener(
      "offline",
      function () {
        showExtraToast(
          "You are offline. Local saved data still works."
        );
      }
    );

    window.addEventListener(
      "online",
      function () {
        showExtraToast(
          "You are back online."
        );
      }
    );
  }

  /* =========================================================
     AUTOMATIC FOOTER YEAR
  ========================================================= */

  function updateFooterYear() {
    const currentYear =
      new Date().getFullYear();

    selectAll(
      ".footer-bottom span"
    ).forEach((element) => {
      if (
        element.textContent.includes(
          "©"
        )
      ) {
        element.textContent =
          element.textContent.replace(
            /©\s*\d{4}/,
            `© ${currentYear}`
          );
      }
    });
  }

  /* =========================================================
     PAGE VISIT PREFERENCE
  ========================================================= */

  function rememberPageVisit() {
    const page =
      document.body.dataset.page;

    if (!page) {
      return;
    }

    savePreference(
      "lastVisitedPage",
      page
    );

    savePreference(
      "lastVisitTime",
      new Date().toISOString()
    );
  }

  /* =========================================================
     STORAGE SYNC
     If Campus is open in two browser tabs,
     changes in one tab can be detected in another.
  ========================================================= */

  function setupStorageSync() {
    window.addEventListener(
      "storage",
      function (event) {
        if (!event.key) {
          return;
        }

        if (
          event.key.includes(
            "campus"
          )
        ) {
          showExtraToast(
            "Campus data changed in another tab"
          );
        }
      }
    );
  }

  /* =========================================================
     INITIALIZE ALL EXTRA FEATURES
  ========================================================= */

  function initializeExtraFeatures() {
    setupEventSorting();

    setupPasswordStrength();

    setupFormCleanup();

    setupBackToTop();

    setupKeyboardShortcuts();

    setupConnectionStatus();

    setupStorageSync();

    updateFooterYear();

    rememberPageVisit();
  }

  /*
     app.js already uses defer,
     but this also makes the code safe
     if script loading changes later.
  */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeExtraFeatures
    );
  } else {
    initializeExtraFeatures();
  }
})();