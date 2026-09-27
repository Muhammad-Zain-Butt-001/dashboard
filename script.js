/* =========================================
   PULSEBOARD
   INTERACTIVE WEB ELEMENTS - PROJECT 3
========================================= */


/* =========================================
   DOM SELECTORS
========================================= */

const body = document.body;

const themeToggle = document.querySelector(".js-theme-toggle");
const themeIcon = document.querySelector(".js-theme-icon");

const menuToggle = document.querySelector(".js-menu-toggle");
const mobileMenu = document.querySelector(".js-mobile-menu");

const demoButton = document.querySelector(".js-demo-button");

const counterDisplay = document.querySelector(".js-counter-display");
const increaseButton = document.querySelector(".js-increase");
const decreaseButton = document.querySelector(".js-decrease");
const resetButton = document.querySelector(".js-reset");

const likeButton = document.querySelector(".js-like-button");
const likeIcon = document.querySelector(".js-like-icon");
const likeText = document.querySelector(".js-like-text");
const likeCount = document.querySelector(".js-like-count");

const progressFill = document.querySelector(".js-progress-fill");
const progressValue = document.querySelector(".js-progress-value");
const progressButton = document.querySelector(".js-progress-button");

const faqQuestions = document.querySelectorAll(".js-faq-question");

const toast = document.querySelector(".js-toast");
const toastTitle = document.querySelector(".js-toast-title");
const toastMessage = document.querySelector(".js-toast-message");
const toastClose = document.querySelector(".js-toast-close");

const notificationButton = document.querySelector(
    ".js-notification-button"
);

const periodButtons = document.querySelectorAll(".js-period");

const chartLine = document.querySelector(".js-chart-line");
const chartFill = document.querySelector(".js-chart-fill");
const chartPoints = document.querySelector(".js-chart-points");
const xAxis = document.querySelector(".js-x-axis");

const chartTitle = document.querySelector(".js-chart-title");
const chartNumber = document.querySelector(".js-chart-number");

const barsContainer = document.querySelector(".js-bars");
const barLabels = document.querySelector(".js-bar-labels");

const counters = document.querySelectorAll(".js-counter");


/* =========================================
   STATE
========================================= */

let counterValue = 0;

let isLiked = false;

let currentProgress = 68;

let toastTimer;


/* =========================================
   DASHBOARD DATA
========================================= */

const dashboardData = {

    week: {
        title: "Weekly performance",

        line: [
            35,
            48,
            44,
            62,
            57,
            73,
            81
        ],

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        bars: [
            42,
            58,
            51,
            76,
            64,
            88,
            72
        ],

        barLabels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ]
    },


    month: {
        title: "Monthly performance",

        line: [
            42,
            55,
            49,
            68,
            63,
            76,
            84
        ],

        labels: [
            "1",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30"
        ],

        bars: [
            52,
            67,
            61,
            73,
            69,
            86,
            78
        ],

        barLabels: [
            "1",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30"
        ]
    },


    year: {
        title: "Yearly performance",

        line: [
            38,
            45,
            51,
            57,
            63,
            71,
            86
        ],

        labels: [
            "Jan",
            "Mar",
            "May",
            "Jul",
            "Sep",
            "Nov",
            "Dec"
        ],

        bars: [
            45,
            52,
            58,
            64,
            72,
            81,
            89
        ],

        barLabels: [
            "Jan",
            "Mar",
            "May",
            "Jul",
            "Sep",
            "Nov",
            "Dec"
        ]
    }

};


/* =========================================
   THEME
========================================= */

function applyTheme(theme) {

    if (theme === "dark") {

        body.classList.add("is-dark");

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        body.classList.remove("is-dark");

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


function loadTheme() {

    const savedTheme = localStorage.getItem(
        "pulseboard-theme"
    );

    if (savedTheme) {

        applyTheme(savedTheme);

        return;
    }

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    applyTheme(
        prefersDark ? "dark" : "light"
    );
}


themeToggle.addEventListener(
    "click",
    function () {

        const isDark = body.classList.contains(
            "is-dark"
        );

        const newTheme = isDark
            ? "light"
            : "dark";

        applyTheme(newTheme);

        localStorage.setItem(
            "pulseboard-theme",
            newTheme
        );

        showToast(
            "Theme updated",
            `${newTheme === "dark" ? "Dark" : "Light"} mode is now active.`
        );
    }
);


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener(
    "click",
    function () {

        const isOpen =
            mobileMenu.classList.toggle(
                "is-open"
            );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    }
);


const navigationLinks =
    mobileMenu.querySelectorAll("a");


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove(
                    "is-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        );
    }
);


/* =========================================
   COUNTER
========================================= */

function updateCounter() {

    counterDisplay.textContent =
        counterValue;
}


increaseButton.addEventListener(
    "click",
    function () {

        counterValue++;

        updateCounter();

        showToast(
            "Counter updated",
            `Current value: ${counterValue}`
        );
    }
);


decreaseButton.addEventListener(
    "click",
    function () {

        counterValue--;

        updateCounter();

        showToast(
            "Counter updated",
            `Current value: ${counterValue}`
        );
    }
);


resetButton.addEventListener(
    "click",
    function () {

        counterValue = 0;

        updateCounter();

        showToast(
            "Counter reset",
            "The counter has returned to zero."
        );
    }
);


/* =========================================
   LIKE BUTTON
========================================= */

likeButton.addEventListener(
    "click",
    function () {

        isLiked = !isLiked;

        likeButton.classList.toggle(
            "is-liked",
            isLiked
        );

        likeButton.setAttribute(
            "aria-pressed",
            isLiked
        );


        if (isLiked) {

            likeIcon.textContent = "♥";
            likeText.textContent = "Liked";

            likeCount.textContent = "25";

        } else {

            likeIcon.textContent = "♡";
            likeText.textContent = "Like project";

            likeCount.textContent = "24";
        }
    }
);


/* =========================================
   PROGRESS
========================================= */

progressButton.addEventListener(
    "click",
    function () {

        currentProgress += 8;

        if (currentProgress > 100) {
            currentProgress = 20;
        }

        progressFill.style.width =
            `${currentProgress}%`;

        progressValue.textContent =
            `${currentProgress}%`;

        showToast(
            "Progress updated",
            `Project completion is now ${currentProgress}%.`
        );
    }
);


/* =========================================
   FAQ ACCORDION
========================================= */

faqQuestions.forEach(
    function (question) {

        question.addEventListener(
            "click",
            function () {

                const faqItem =
                    question.closest(
                        ".faq-item"
                    );

                const isOpen =
                    faqItem.classList.toggle(
                        "is-open"
                    );

                question.setAttribute(
                    "aria-expanded",
                    isOpen
                );
            }
        );
    }
);


/* =========================================
   TOAST NOTIFICATION
========================================= */

function showToast(title, message) {

    clearTimeout(toastTimer);

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add(
        "is-visible"
    );

    toastTimer = setTimeout(
        function () {

            toast.classList.remove(
                "is-visible"
            );

        },
        3500
    );
}


function hideToast() {

    toast.classList.remove(
        "is-visible"
    );

    clearTimeout(toastTimer);
}


toastClose.addEventListener(
    "click",
    hideToast
);


notificationButton.addEventListener(
    "click",
    function () {

        showToast(
            "Notification",
            "This message was created dynamically with JavaScript."
        );
    }
);


/* =========================================
   DEMO BUTTON
========================================= */

demoButton.addEventListener(
    "click",
    function () {

        counterValue = 10;

        updateCounter();

        currentProgress = 84;

        progressFill.style.width =
            `${currentProgress}%`;

        progressValue.textContent =
            `${currentProgress}%`;

        showToast(
            "Demo completed",
            "Interactive dashboard values were updated."
        );

        document
            .querySelector("#analytics")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* =========================================
   SVG LINE CHART
========================================= */

function createLineChart(data, labels) {

    const width = 700;
    const height = 280;

    const maxValue = 100;

    const horizontalPadding = 8;
    const verticalPadding = 10;

    const usableWidth =
        width - horizontalPadding * 2;

    const usableHeight =
        height - verticalPadding * 2;


    const points = data.map(
        function (value, index) {

            const x =
                horizontalPadding +
                (
                    index /
                    (data.length - 1)
                ) *
                usableWidth;

            const y =
                verticalPadding +
                (
                    1 -
                    value / maxValue
                ) *
                usableHeight;

            return {
                x,
                y,
                value
            };
        }
    );


    const linePath =
        points
            .map(
                function (point, index) {

                    return `${
                        index === 0
                            ? "M"
                            : "L"
                    } ${point.x} ${point.y}`;
                }
            )
            .join(" ");


    const fillPath =
        `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;


    chartLine.setAttribute(
        "d",
        linePath
    );

    chartFill.setAttribute(
        "d",
        fillPath
    );


    chartPoints.innerHTML = "";


    points.forEach(
        function (point) {

            const circle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );

            circle.setAttribute(
                "cx",
                point.x
            );

            circle.setAttribute(
                "cy",
                point.y
            );

            circle.setAttribute(
                "r",
                "5"
            );

            circle.classList.add(
                "chart-point"
            );

            chartPoints.appendChild(
                circle
            );
        }
    );


    xAxis.innerHTML = "";


    labels.forEach(
        function (label) {

            const labelElement =
                document.createElement(
                    "span"
                );

            labelElement.textContent =
                label;

            xAxis.appendChild(
                labelElement
            );
        }
    );


    chartNumber.textContent =
        Math.max(...data);
}


/* =========================================
   BAR CHART
========================================= */

function createBarChart(data, labels) {

    barsContainer.innerHTML = "";
    barLabels.innerHTML = "";


    data.forEach(
        function (value, index) {

            const bar =
                document.createElement(
                    "div"
                );

            bar.classList.add(
                "bar"
            );

            bar.style.height =
                `${value}%`;

            bar.setAttribute(
                "title",
                `${labels[index]}: ${value}`
            );

            barsContainer.appendChild(
                bar
            );


            const label =
                document.createElement(
                    "span"
                );

            label.textContent =
                labels[index];

            barLabels.appendChild(
                label
            );
        }
    );
}


/* =========================================
   UPDATE CHARTS
========================================= */

function updateDashboard(period) {

    const data =
        dashboardData[period];


    chartTitle.textContent =
        data.title;


    createLineChart(
        data.line,
        data.labels
    );


    createBarChart(
        data.bars,
        data.barLabels
    );
}


/* =========================================
   PERIOD BUTTONS
========================================= */

periodButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                periodButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "is-active"
                        );
                    }
                );


                button.classList.add(
                    "is-active"
                );


                const selectedPeriod =
                    button.dataset.period;


                updateDashboard(
                    selectedPeriod
                );


                showToast(
                    "Analytics updated",
                    `${button.textContent.trim()} data is now displayed.`
                );
            }
        );
    }
);


/* =========================================
   STAT COUNTER ANIMATION
========================================= */

function animateStatCounter(element) {

    const target =
        Number(
            element.dataset.target
        );

    const duration = 1200;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                target *
                easedProgress
            );


        element.textContent =
            currentValue.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString();
        }
    }


    requestAnimationFrame(
        update
    );
}


/* =========================================
   INITIALIZATION
========================================= */

loadTheme();

updateCounter();

updateDashboard("week");


counters.forEach(
    function (counter) {

        animateStatCounter(
            counter
        );
    }
);