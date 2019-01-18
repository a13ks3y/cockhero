(function () {
    //@todo: save and load to/from localstorage.
    const scaleOnHoverElement = document.getElementById("scale-on-hover");
    const hamburgerElement = document.getElementById("hamburger");
    const headerElement = document.getElementById("header");
    const mainElement = document.getElementById("main");

    const hideHeader = () => {
        headerElement.classList.remove("show");
        headerElement.classList.add("hide");
    }

    const showHeader = () => {
        headerElement.classList.remove("hide");
        headerElement.classList.add("show");
    }

    hamburgerElement.addEventListener("click", () => {
        headerElement.classList.contains("show") ? hideHeader() : showHeader();
    });

    const videoUrlElements = document.querySelectorAll(".video-url");

    videoUrlElements.forEach((element, i) =>
        element.addEventListener("change", e => {
            const index = i + 1;
            const src = "https://www.pornhub.com/embed/" + e.currentTarget.value;
            const iframe = document.getElementById("temptation-" + index);
            iframe && (iframe.src = src);
        })
    );

    scaleOnHoverElement.addEventListener("change", e => {
        const ct = e.currentTarget;
        ct.checked ? mainElement.classList.add("resizable-on-hover") : mainElement.classList.remove("resizable-on-hover");
    });
}());