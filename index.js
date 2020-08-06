(function () {
    const scaleOnHoverElement = document.getElementById("scale-on-hover");
    const toggleFullScreenElement = document.getElementById("toggle-full-screen");
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
            if (viewkey && viewkey.length) {
                e.currentTarget.value = viewkey;
                const src = "https://www.pornhub.com/embed/" + viewkey;
                const iframe = document.getElementById("temptation-" + index);
                iframe && (iframe.src = src);
                updateHash();    
            } else {
                // @todo: viewkey is not set or empty string.
            }
        })
    });

    scaleOnHoverElement.addEventListener("change", e => {
        const ct = e.currentTarget;
        ct.checked ? mainElement.classList.add("resizable-on-hover") : mainElement.classList.remove("resizable-on-hover");
    });

    toggleFullScreenElement.addEventListener("change", e => {
        const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

        const docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } 
    });

    const defaultViewKeys = [
        "",//"ph571567833f1e5",
        "",//"409491452",
        "",//"ph57132f2e9c79e",
        "",//"ph59b852804b178"
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
        const hash = location.hash.substr(1);
        const viewkeys = hash.split("/");
        localStorage.setItem('viewkeys', JSON.stringify(viewkeys));
        alert("Saved to localStorage.");
    });
    btnLoad.addEventListener("click", () => {
        const item = localStorage.getItem('viewkeys');
        try {
            if (item && item.length) {
                const viewkeys = JSON.parse(item);
                viewkeys.forEach(updateViewKey);
            } else {
                throw new Error('Nothing to load!');
            }
        } catch (error) {
            alert(error.message);
        }
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