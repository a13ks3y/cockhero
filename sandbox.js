const hamburgerEl = document.getElementById('hamburger');
const headerEl = document.getElementsByTagName('header').item(0);
const mainEl = document.getElementsByTagName('main').item(0);
const videoUrlEl = document.getElementById('video-url');
const addButtonEl = document.getElementById('add-button');
const clearAllButtonEl = document.getElementById('clear-all-button');
const saveToClipboardButtonEl = document.getElementById('save-to-clipboard-button');
const videos = [];
const savedVideosStr = localStorage.getItem('sandbox-videos');
if (savedVideosStr && savedVideosStr.length) {
    const savedVideos = JSON.parse(savedVideosStr);
    savedVideos.forEach(video => addVideo(video));
}
headerEl.classList.add('hidden');
videoUrlEl.addEventListener("focus", e => e.currentTarget.select());


function removeVideo(video) {
    // @todo:
}

function addVideo(video) {
    videos.push(video);
    video.iframe = createPornHubIframe(video.viewkey)
    mainEl.appendChild(video["iframe"]);
}

addButtonEl.addEventListener('click', () => {
    // @todo: add youtube embedded also?
    // @todo: play from filesystem/localhost? (extension? app? electron?)
    const value = videoUrlEl.value;
    const PORNHUB_VIEWKEY_URL_PATTERN = /https:\/\/www.pornhub(premium)?\.com\/view_video\.php\?viewkey=([^/&]+)/i;
    const viewkey = PORNHUB_VIEWKEY_URL_PATTERN.test(value) ? value.match(PORNHUB_VIEWKEY_URL_PATTERN)[2] : value;

    const iframeUrl = `${location.protocol}//www.pornhub.com/embed/${viewkey}`;
    const video = {
        url: value,
        viewkey,
        iframeUrl
    };
    addVideo(video);
    localStorage.setItem('sandbox-videos', JSON.stringify(videos));
});
clearAllButtonEl.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        localStorage.clear();
        videos.length = 0; // is this legal?!!
        mainEl.innerHTML = '';
    }
});
saveToClipboardButtonEl.addEventListener('click', () => {
    const strToCopy = localStorage.getItem('sandbox-videos');
    navigator.clipboard.writeText(strToCopy).then(() => {
        alert('Copied!');
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
