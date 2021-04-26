const PORNHUB_VIEWKEY_URL_PATTERN = /https:\/\/www.pornhub(premium)?\.com\/view_video\.php\?viewkey=([^/&]+)/i;
const PORNHUB_VIEWKEY_PATTERN = /[a-zA-Z0-9]{15}/i;
function viewkeyFromPronHubUrl(url) {
    return PORNHUB_VIEWKEY_URL_PATTERN.test(url) ? url.match(PORNHUB_VIEWKEY_URL_PATTERN)[2] : viewkeyFromViewkey(url);
}

function viewkeyFromViewkey(viewkey) {
    return PORNHUB_VIEWKEY_PATTERN.test(viewkey) ? viewkey : null;
}

function viewkeyToEmbedUrl(viewkey) {
    return `${location.protocol}//www.pornhub.com/embed/${viewkey}`;
}

function createPornHubIframe(viewkey) {
    if (viewkey instanceof Array) {
        const nodeList = document.createDocumentFragment();
        viewkey.forEach(viewkeyItem => {
            // could be written as
            // viewkeyItem |> createPornHubIframe |> nodeList.appendChild;
            // in typescript/ECMAScript7
            nodeList.appendChild(createPornHubIframe(viewkeyItem));
        });
        return nodeList;
    } else {
        const node = document.createElement('iframe');
        node.src = viewkeyToEmbedUrl(viewkey);
        node.frameborder = "0";
        node.width = "560";
        node.height = "340";
        node.autoplay = true;
        node.scrolling = "no";
        node.allowfullscreen = true;
        return node;
    }
}

function viewKeyToVideoObject(viewKey) {
    if (viewKey && viewKey.length) {
        return {
            "url": `https://www.pornhubpremium.com/view_video.php?viewkey=${viewKey}`,
            "viewkey": viewKey,
            "iframeUrl": `https://www.pornhub.com/embed/${viewKey}`,
            "iframe": {"frameborder": "0", "autoplay": true, "allowfullscreen": true}
        };
    } else {
        return null;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
