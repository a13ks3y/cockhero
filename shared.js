const PORNHUB_VIEWKEY_URL_PATTERN = /https:\/\/www.pornhub(premium)?\.com\/view_video\.php\?viewkey=([^/&]+)/i;
function viewkeyFromPronHubUrl(url) {
    return PORNHUB_VIEWKEY_URL_PATTERN.test(value) ? url.match(PORNHUB_VIEWKEY_URL_PATTERN)[2] : url;
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
