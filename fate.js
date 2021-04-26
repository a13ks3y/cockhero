/**
 *  "Technically speaking, your URL should never be longer than 2,048 characters"
 *  So, according to this calculation
 *  2000 / '/ph582c6a6a90147'.length // 125
 *  up to 125 video-keys could be passed by URL. UP TO 125!!!
 */

// Init
const mainEl = document.getElementById('main');

const SIX_SECONDS = 6666;
const FEW_MINUTES = 0xA * SIX_SECONDS * (1 + ~~(Math.random() * 0xF));
const defaultViewKeys = [
    "ph582c6a6a90147",
    "pm554ceda34a835",
    "ph5e01c31d04538",
    "ph5d1fac50cd0e3",
    "ph5ee793cda1428",
    "ph5edc0dd547142",
    "ph5ae74628cec94",
    "ph5f21700d2d46e",
    "ph5edd6abac6c6c",
    "ph5ad59f0f5e4f2",
    "ph5a7d7c1145969",
    "ph5e85ab166e122",
    "ph6023e713677c6",
    "ph5f3858cd0892e",
    "ph5cc555b520cc5",
    "ph60423eb8a7397",
    "ph59faf120a2db4",
    "ph6040556055c5c",
    "ph5fe40e45d725f",
    "ph5f1ea54524386",
    "ph604260a74779c",
    "ph59d143400aae5",
    "ph5f6db156504f8",
    "ph605cbeb4cdafa",
    "ph605ce95487ce6",
    "ph6023e713677c6",
    "ph60695cd88d4c7"
];

//Exposition
let videos = [];
window.addEventListener('hashchange', hashChanged);
hashChanged();
function hashChanged() {
    const viewKeys = location.hash.length > 1 ? (location.hash.substr(1).split('/')) : defaultViewKeys;
    console.info('Using viewkeys:', viewKeys);
    videos = viewKeys.map(viewKeyToVideoObject).filter(v => !!v);
    console.info('Videos:', videos);
    startTheShow();
}

function playVideos(videos) {
    const videosFragment = createPornHubIframe(videos.map(video => video.viewkey));
    mainEl.innerHTML = '';
    mainEl.appendChild(videosFragment);
}

function shuffleVideos() {
    // @todo: must be a better way to do it.
    videos = videos.sort(() => -(1/2) + Math.random());
}

function startTheShow() {
    setTimeout(() => {
        // wait until start animation ends
        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const columnsCount = ~~(width / 640);
        const rowsCount = ~~(height / 480)
        const videosCount = columnsCount * rowsCount;
        shuffleVideos();
        const videosToPlay = videos.filter((v, i) => i < videosCount);
        playVideos(videosToPlay);

        // @todo: countdown to next wave/iteration/video-change?
        // Like CockHero Temptation (which one?), the "Endless Road Track" I think.
        // @todo: background music (not always, but needed)
        //Rising action
        //Climax
        //Denouement
    }, SIX_SECONDS);
}

startTheShow();


