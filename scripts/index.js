window.addEventListener("DOMContentLoaded", () => {
    loadData().then(() => {
        document.body.style.opacity = "1";
    });
});


async function loadData() {
    const $create = document.createElement.bind(document);

    try {
        const response = await fetch("data.json", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        const data = await response.json();
        const listOfPrices = data.map((item) => {
            return item.amount;
        });
        const maximumValue = Math.max(...listOfPrices);
        const barChart = document.getElementById("bar-chart");

        data.forEach((item, idx) => {
            const listEl = $create("li");
            const text = $create("small");
            const div = $create("div");
            const tooltip = $create("span");

            if (item.amount == maximumValue) {
                div.setAttribute("data-max", "true");
            }

            const percentage = Math.floor((item.amount / maximumValue) * 100);

            text.textContent = item.day;


            tooltip.textContent = `\$${item.amount}`;

            tooltip.classList.add("tooltip");

            div.append(tooltip);
            listEl.append(text);
            listEl.append(div);

            barChart.append(listEl);

            setTimeout(() => {
                div.animate({
                    height: `${percentage}%`
                }, {
                    duration: 250,
                    fill: "forwards",
                    ease: "ease-in-out"
                });
            }, 125 * idx);
        });
    } catch (error) {
        console.error(error);
    }
};
