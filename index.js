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

    const parseVideoUrlElementInput = (value) => {
        const urlPattern = /https:\/\/www.pornhub\.com\/view_video\.php\?viewkey=(.*)/i;
        // @todo: check if url is valid and return false if it's not.
        return urlPattern.test(value) ? value.match(urlPattern)[1] : value;
    };
    let isHashChangeShouldBeIgnored = false;
    const updateHash = () => {
        isHashChangeShouldBeIgnored = true;
        location.hash = Array.from(videoUrlElements).map(e => e.value).join("/");
    };

    videoUrlElements.forEach((element, i) => {
        element.addEventListener("focus", e => e.currentTarget.select());
        element.addEventListener("change", e => {
            const index = i + 1;
            const viewkey = parseVideoUrlElementInput(e.currentTarget.value);
            // @todo: check if viewkey is false and handle it
            e.currentTarget.value = viewkey;
            const src = "https://www.pornhub.com/embed/" + viewkey;
            const iframe = document.getElementById("temptation-" + index);
            iframe && (iframe.src = src);
            updateHash();
        })
    });

    scaleOnHoverElement.addEventListener("change", e => {
        const ct = e.currentTarget;
        ct.checked ? mainElement.classList.add("resizable-on-hover") : mainElement.classList.remove("resizable-on-hover");
    });

    const defaultViewKeys = [
        "ph571567833f1e5",
        "409491452",
        "ph57132f2e9c79e",
        "ph59b852804b178"
    ];

    const updateViewKey = (viewkey, index) => {
        if (index < 0 || index > 3) {
            console.error("updateViewKey wrong index paraam:", index);
            return;
        }
        const element = videoUrlElements[index];
        element.value = viewkey;
        element.dispatchEvent(new Event("change"));
    };

    const btnRestore = document.getElementById("btn-restore");
    const restoreDefaults = () => {
        // @todo: check if not saved and purpose to save begore restore
        defaultViewKeys.forEach(updateViewKey); // I love FP ^_^
    }
    btnRestore.addEventListener("click", restoreDefaults);

    const btnSave = document.getElementById("btn-save");
    const btnLoad = document.getElementById("btn-load");
    btnSave.addEventListener("click", () => {
        alert("Coming soon!");
    });
    btnLoad.addEventListener("click", () => {
        alert("Coming soon!");
    });


    const onHashChange = () => {
        if (isHashChangeShouldBeIgnored) {
            isHashChangeShouldBeIgnored = false;
            return;
        }
        if (location.hash && location.hash.length > 1) {
            console.log("hash changed and not empty");
            const hash = location.hash.substr(1);
            const viewkeys = hash.split("/");
            viewkeys.forEach(updateViewKey);

        } else {
            console.log("hash changed and it's empty, so restore defaults");
            restoreDefaults();
        }
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
}());