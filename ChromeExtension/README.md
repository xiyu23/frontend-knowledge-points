VVLog (Vite Video Log)

Functionalities
1. support user to pass in the data field (aka, `column name`) they want to check
2. each line of the raw logs would be formatted as a single logo:
   ```
   [2024-11-12 22:12:59.152] {log}
   ```
3. the `log` is the output of the pipeline that can be defined by the users, they can format the log they want
4. the log may needed to be colored, so we need it to be an object
5. support to filter the log, e.g only websocket(up/down)


How to get the raw data?
1. How to intercept the response returned to the web page?
2. How to pass it into our extension's html


How does the project organized?
ts(source code) + react(UI) + vite(builder)
after build, the dist directly will be the extension ready to use


## Concepts
### Service worker
Run in background and don't have access to the DOM. But can be combined with an `offscreen document` for this usecase?

step 1. register
```json
// manifest.json
{
  // ...
  "background": {
    "service_worker": "background.js"
  },
  // ...
}
```
step 2. 


### Content script
Run in the context of the web page. Extensions can run scripts that read and modify the content of a page. These are called content scripts.
```json
// manifest.json
{
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```
`matches` used to identify which sites to inject the content scripts into
```
syntax: <scheme>://<host><path>
```



### Toolbar action
Do sth when user clicks on the toolbar icon, or show a popup usnig the Chrome Action API

### Side panel
Show customer html in the browser's side panel

### DeclarativeNetRequest
Intercept, block, or modify network requests.


## APIs
### Badge
Badge: a bit of text layered over the icon.

use `chrome.action.setBadgeBackgroundColor` and `chrome.action.setBadgeText` to set the colored text.
4 or few letters are preferred.


## Tips
### 1. `chrome.action.onClicked.addListener` not working
```
You cannot have a "popup" with an onclick event. Remove the popup.html from the manifest file. And keep the background page, and it will work.
```
That is correct. Popup completely eliminates the onclick event! Took me two days to figure that out.


## Omnibox
Enables extensions to implement customized behavior when the user types into the browser's address bar.

Omnibox API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/omnibox

When the user types the keyword in browser's address bar, the extension will get an event invoked `omnibox.onInputStarted`.
Since we are developing based on chrome, so the chrome provided the similar api as `chrome.omnibox.onInputChanged`
```json
{
  // ...
  "omnibox": {
    "keyword": "api"
  },
}
```