
(function () {
    const LOCAL_STORAGE_SAVE_KEY = 'viewkeys';
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

    const saveAppStateToLocalStorage = () => {
        const hash = location.hash.substr(1);
        const viewkeys = hash.split("/");
        localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, JSON.stringify(viewkeys));
        alert("Saved to localStorage.");
    };

    const loadAppStateFromLocalStorage = () => {
        const item = localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);
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
    }

    const parseVideoUrlElementInput = (value) => {
        const urlPattern = /https:\/\/www.pornhub(premium)?\.com\/view_video\.php\?viewkey=(.[^&\/])/i;
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
        ct["checked"] ? mainElement.classList.add("scale-on-hover") : mainElement.classList.remove("scale-on-hover");
    });

    toggleFullScreenElement.addEventListener("change", () => {
        const isInFullScreen = (document.fullscreenElement && true) || (document.webkitFullscreenElement && true) || (document.mozFullScreenElement && true) || (document.msFullscreenElement && true);

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

    /*
        Original Default View Keys. (for legacy).

        const defaultViewKeys = [
            "ph571567833f1e5",
            "409491452",
            "ph57132f2e9c79e",
            "ph59b852804b178"
        ];
    * */
    const defaultViewKeys = Array(4).fill('');

    const updateViewKey = (viewkey, index) => {
        if (index < 0 || index > 3) {
            console.error("updateViewKey wrong index param:", index);
            return;
        }
        const element = videoUrlElements[index];
        element.value = viewkey;
        element.dispatchEvent(new Event("change"));
    };

    const btnRestore = document.getElementById("btn-restore");
    const restoreDefaults = () => {
        // check if not saved and purpose to save before restore
        if (!localStorage.getItem(LOCAL_STORAGE_SAVE_KEY)) {
            if (confirm('You didn\'t save. Do you want to save now before discard all changes?')) {
                saveAppStateToLocalStorage();
            }
        }
        defaultViewKeys.forEach(updateViewKey); // I love FP ^_^
    }
    btnRestore.addEventListener("click", restoreDefaults);

    const btnSave = document.getElementById("btn-save");
    const btnLoad = document.getElementById("btn-load");
    btnSave.addEventListener("click", () => {
        saveAppStateToLocalStorage();
    });
    btnLoad.addEventListener("click", () => {
        loadAppStateFromLocalStorage();
    });


    const onHashChange = () => {
        if (isHashChangeShouldBeIgnored) {
            isHashChangeShouldBeIgnored = false;
            return;
        }
        if (location.hash && location.hash.length > 1) {
            const hash = location.hash.substr(1);
            const viewkeys = hash.split("/");
            viewkeys.forEach(updateViewKey);

        } else {
            console.log("hash changed and it's empty, so restore defaults");
            restoreDefaults();
        }
    };
    window.addEventListener("hashchange", onHashChange) || onHashChange();
}());
