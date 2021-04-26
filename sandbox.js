const hamburgerEl = document.getElementById('hamburger');
const headerEl = document.getElementsByTagName('header').item(0);
const mainEl = document.getElementsByTagName('main').item(0);
const videoUrlEl = document.getElementById('video-url');
const addButtonEl = document.getElementById('add-button');
const clearAllButtonEl = document.getElementById('clear-all-button');
const saveToClipboardButtonEl = document.getElementById('save-to-clipboard-button');
const shareLinkButtonEl = document.getElementById('share-link-button');
let videos = [];
let viewkeys = [];

const savedViewKeysStr = localStorage.getItem('sandbox-viewkeys');
const defaultViewKeys = (savedViewKeysStr && savedViewKeysStr.length) ? JSON.parse(savedViewKeysStr) : [];

window.addEventListener('hashchange', hashChanged);
hashChanged();
function hashChanged() {
    viewkeys = location.hash.length > 1 ? (location.hash.substr(1).split('/')) : defaultViewKeys;
    viewkeys = viewkeys.filter(onlyUnique);
    videos = viewkeys.map(viewKeyToVideoObject).filter(v => !!v);
    mainEl.innerHTML = '';
    console.info(viewkeys);
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    const columnsCount = ~~(width / 640);
    const rowsCount = ~~(height / 480)
    const availableCount = columnsCount * rowsCount;
    const videosToPlayCount = availableCount > videos.length ? videos.length : availableCount;
    let videosToPlay = [];
    if (videosToPlayCount < videos.length) {
        // @todo: show notification?
        videosToPlay = videos.filter((v, i) => i < videosToPlayCount);
    } else {
        // all videos fit, nothing to do here.
        videosToPlay = [...videos];
    }
    console.log(videosToPlayCount, videos.length);
    videosToPlay.forEach(addVideo);
}






headerEl.classList.add('hidden');
videoUrlEl.addEventListener("focus", e => e.currentTarget.select());


function saveVideosToLocalStorage() {
    viewkeys = videos.map(v => v.viewkey).filter(onlyUnique);
    localStorage.setItem('sandbox-viewkeys', JSON.stringify(viewkeys));
}

function removeVideo(video) {
    const indexToRemove = videos.indexOf(video);
    video.iframe.remove();
    video.iframeContainer.remove();
    videos = videos.filter(v => v !== video);
    saveVideosToLocalStorage();
}

function addVideo(video) {
    videos.push(video);
    video.iframe = createPornHubIframe(video.viewkey);
    video.iframeContainer = document.createElement('div');
    const removeVideoButtonElement = document.createElement('button');
    removeVideoButtonElement.classList.add('fa', 'fa-remove', 'remove-video');
    removeVideoButtonElement.addEventListener('click', () => removeVideo(video));
    video.iframeContainer.classList.add('video-container')
    video.iframeContainer.appendChild(removeVideoButtonElement);
    video.iframeContainer.appendChild(video['iframe']);
    mainEl.appendChild(video.iframeContainer);
    saveVideosToLocalStorage();
}

addButtonEl.addEventListener('click', () => {
    // @todo: add youtube embedded also?
    // @todo: play from filesystem/localhost? (extension? app? electron?)
    const value = videoUrlEl.value;
    // @todo: default viewkey value?
    const viewkey = viewkeyFromPronHubUrl(value);

    if (!viewkey) {
        throw new Error('FUCK!');
    }

    const iframeUrl = `${location.protocol}//www.pornhub.com/embed/${viewkey}`;
    const video = {
        url: value,
        viewkey,
        iframeUrl
    };
    addVideo(video);
});
clearAllButtonEl.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        localStorage.clear();
        viewkeys = [];
        videos = [];
        mainEl.innerHTML = '';
    }
});
saveToClipboardButtonEl.addEventListener('click', () => {
    const strToCopy = localStorage.getItem('sandbox-viewkeys');
    navigator.clipboard.writeText(strToCopy).then(() => {
        alert('Copied!');
    }).catch(() => {
        alert('Fuck :(');
    });
});
shareLinkButtonEl.addEventListener('click', (e) => {
    const pageName = e.ctrlKey ? 'fate' : (e.altKey ? 'index' : 'sandbox');
    const strToCopy = `http://a13ks3y.github.io/cockhero/${pageName}.html#${viewkeys.join('/')}`;
    navigator.clipboard.writeText(strToCopy).then(() => {
        alert('Link copied to clipboard!');
    }).catch(() => {
        alert('Fuck :(');
    });
});
hamburgerEl.addEventListener('click', () => {
    if (headerEl.classList.contains('hidden')) {
        headerEl.classList.remove('hidden');
        headerEl.classList.add('visible');
        hamburgerEl.classList.remove('hidden');
        hamburgerEl.classList.add('visible');
    } else {
        headerEl.classList.remove('visible');
        headerEl.classList.add('hidden');
        hamburgerEl.classList.remove('visible');
        hamburgerEl.classList.add('hidden');
    }
})
