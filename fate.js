// Init
const mainEl = document.getElementById('main');

const SIX_SECONDS = 6666;
const FEW_MINUTES = 0xA * SIX_SECONDS * ( 1 + ~~(Math.random()*0xF));

// Может лучше


//Exposition
const someVideos = [{
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5f1ea54524386&pkey=190335392",
    "viewkey": "ph5f1ea54524386",
    "iframeUrl": "http://www.pornhub.com/embed/ph5f1ea54524386",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5aeca92e6f071",
    "viewkey": "ph5aeca92e6f071",
    "iframeUrl": "http://www.pornhub.com/embed/ph5aeca92e6f071",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph59d143400aae5&pkey=sys:dvd:372022",
    "viewkey": "ph59d143400aae5",
    "iframeUrl": "http://www.pornhub.com/embed/ph59d143400aae5",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph5f6db156504f8&t=1278&utm_source=127.0.0.1:8080&utm_medium=embed&utm_campaign=embed-title-html5",
    "viewkey": "ph5f6db156504f8",
    "iframeUrl": "http://www.pornhub.com/embed/ph5f6db156504f8",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}];

const nextLevelVideos = [{
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph6023e713677c6",
    "viewkey": "ph6023e713677c6",
    "iframeUrl": "http://www.pornhub.com/embed/ph6023e713677c6",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5f3858cd0892e&pkey=80535321",
    "viewkey": "ph5f3858cd0892e",
    "iframeUrl": "http://www.pornhub.com/embed/ph5f3858cd0892e",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph5cc555b520cc5",
    "viewkey": "ph5cc555b520cc5",
    "iframeUrl": "http://www.pornhub.com/embed/ph5cc555b520cc5",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph60423eb8a7397&pkey=173458352",
    "viewkey": "ph60423eb8a7397",
    "iframeUrl": "http://www.pornhub.com/embed/ph60423eb8a7397",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph59faf120a2db4&pkey=80535321",
    "viewkey": "ph59faf120a2db4",
    "iframeUrl": "http://www.pornhub.com/embed/ph59faf120a2db4",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
},{
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=40097746&pkey=166229981",
    "viewkey": "40097746",
    "iframeUrl": "http://www.pornhub.com/embed/40097746",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph6040556055c5c",
    "viewkey": "ph6040556055c5c",
    "iframeUrl": "http://www.pornhub.com/embed/ph6040556055c5c",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5fe40e45d725f&pkey=190334792",
    "viewkey": "ph5fe40e45d725f",
    "iframeUrl": "http://www.pornhub.com/embed/ph5fe40e45d725f",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}];
const ultimateLevel = [ {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph602fd12be254c",
    "viewkey": "ph602fd12be254c",
    "iframeUrl": "http://www.pornhub.com/embed/ph602fd12be254c",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5f602682bb8ff&pkey=80535321",
    "viewkey": "ph5f602682bb8ff",
    "iframeUrl": "http://www.pornhub.com/embed/ph5f602682bb8ff",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph602a9a710520e",
    "viewkey": "ph602a9a710520e",
    "iframeUrl": "http://www.pornhub.com/embed/ph602a9a710520e",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5e506261a4469&pkey=80535321",
    "viewkey": "ph5e506261a4469",
    "iframeUrl": "https://www.pornhubpremium.com/view_video.php?viewkey=ph5e506261a4469&pkey=80535321",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}];


const iJustDoNotKnowHowToCallIt = [{
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph605cbeb4cdafa&utm_source=127.0.0.1&utm_medium=embed&utm_campaign=embed-removed-nt4x4-html5",
    "viewkey": "ph605cbeb4cdafa",
    "iframeUrl": "http://www.pornhub.com/embed/ph605cbeb4cdafa",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph605ce95487ce6&utm_source=127.0.0.1&utm_medium=embed&utm_campaign=embed-removed-nt4x4-html5",
    "viewkey": "ph605ce95487ce6",
    "iframeUrl": "http://www.pornhub.com/embed/ph605ce95487ce6",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph6023e713677c6&utm_source=127.0.0.1:8080&utm_medium=embed&utm_campaign=embed-title-html5",
    "viewkey": "ph6023e713677c6",
    "iframeUrl": "http://www.pornhub.com/embed/ph6023e713677c6",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}, {
    "url": "https://www.pornhub.com/view_video.php?viewkey=ph60695cd88d4c7",
    "viewkey": "ph60695cd88d4c7",
    "iframeUrl": "http://www.pornhub.com/embed/ph60695cd88d4c7",
    "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
}];










function playVideos(videos) {
    const videosFragment = createPornHubIframe(videos.map(video => video.viewkey));
    mainEl.innerHTML = '';
    mainEl.appendChild(videosFragment);
}

setTimeout(() => {
    // wait until start animation ends
    //playVideos(ultimateLevel);
    playVideos(iJustDoNotKnowHowToCallIt);
    // @todo: add countdown to next wave (how?).
    setTimeout(() => {
        // @todo: some "pulse"/"blink" animation effect?
        playVideos(someVideos);

        setTimeout(() => {
            playVideos(nextLevelVideos);
        }, FEW_MINUTES * 6);

    }, FEW_MINUTES * 3);
    // @todo: countdown to next wave/iteration/video-change?
}, SIX_SECONDS);
// Like CockHero Temptation (which one?), the "Endless Road Track" I think.
// @todo: background music (not always, but needed)
//Rising action
//Climax
//Denouement
