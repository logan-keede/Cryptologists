(async () => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];
  let type = ""; // Initialize type variable

  const API_KEY = "AIzaSyCh-Sm_srQDULYEMjUimS5cMUKXjk6B-tc"; // Replace with your YouTube Data API Key
  function addButton() {
    const targetElement = document.getElementById("owner");

    if (targetElement) {
      const buttonExists = document.getElementById("extract");
      if (!buttonExists) {
        const button = document.createElement("button");
        button.innerHTML =
          '<div class="cbox yt-spec-button-shape-next__button-text-content"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">Extract Transcript</span></div>';
        button.class =
          "yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";
        button.id = "extract";
        button.addEventListener("click", extractTranscript);
        targetElement.appendChild(button);
      }
    }
  }

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.innerText = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text: ", err);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function extractTranscript() {
    const transcriptDropdown = document.querySelector("ytd-menu-renderer[class='style-scope ytd-watch-metadata'] yt-button-shape[id='button-shape'] div[class='yt-spec-touch-feedback-shape__fill']");

    if (transcriptDropdown) {
      transcriptDropdown.click();

      setTimeout(() => {
        const showTranscriptButton = document.querySelector(".yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m");

        if (showTranscriptButton) {
          showTranscriptButton.click();

          setTimeout(() => {
            const transcriptLines = Array.from(document.querySelectorAll("yt-formatted-string.segment-text"));
            const transcriptContent = transcriptLines.map((line) => line.innerText).join("\n");
            copyToClipboard(transcriptContent);

            const newTab = window.open("https://chat.openai.com/", "_blank");
          }, 1000);
        }
      }, 1000);
    }
  }

  addButton();
  // const observer = new MutationObserver((mutations) => {
  //   mutations.forEach((mutation) => {
  //     // Check for specific changes in the DOM that indicate new content
  //     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
  //       // New content has been added to the DOM
  //       console.log("New content added:", mutation.addedNodes);
  //       addLikebtn(type);

  //     }
  //   });
  // });
  
  // // Start observing changes in the body or another relevant DOM element
  // const targetNode = document.body; // or another element
  // const config = { childList: true, subtree: true };
  // observer.observe(targetNode, config);

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };
  function convertToTime(seconds) {
      if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
      }
    
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
    
      const formattedTime = [hours, minutes, remainingSeconds]
        .map(unit => unit.toString().padStart(2, "0"))
        .join(":");
    
      return formattedTime;
    }
  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + convertToTime(currentTime),
    };
    console.log(newBookmark);

    currentVideoBookmarks = await fetchBookmarks();

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName('video-stream')[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    console.log(type);
    if (type === "watch") {
      currentVideo = videoId;
      newVideoLoaded();
      addButton();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if ( type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
      chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

      response(currentVideoBookmarks);
    }
    addLikebtn(type);
    addButton();
    
  });  
  function handleURLChange(event) {
    const newURL = window.location.href;
    console.log("URL changed to:", newURL);
    // Perform actions or call other functions based on the new URL
    // Example: Reload the page when the URL changes
    addLikebtn(type);
  }
  
  // Listen for the "popstate" event, which occurs when the URL changes
  window.addEventListener("popstate", handleURLChange);

  console.log(document.location.href);
  if (document.location.href.includes("youtube.com/watch")) {
    type = "watch";
    newVideoLoaded();
  } else if (document.location.href.includes("youtube.com/results")) {
    type = "search";
  } else if (document.location.href.includes("youtube.com")) {
    type = "NEW";
  }
 
  const addLikebtn = async (type) => {
    let Videos;
    if (document.location.href.includes("youtube.com/watch")) {
      type = "watch";
      
    } else if (document.location.href.includes("youtube.com/results")) {
      type = "search";
    } else if (document.location.href.includes("youtube.com")) {
      type = "NEW";
    }
    if (type === "NEW") {
      Videos = document.getElementsByTagName("ytd-rich-item-renderer");
    } else if (type === "search") {
      Videos = document.getElementsByTagName("ytd-video-renderer");
    } else if (type === "watch") {
      Videos = document.getElementsByTagName("ytd-compact-video-renderer");
    }

    for (let i = 0; i < Videos.length; i++) {
      addLike(Videos[i]);
      addSub(Videos[i]);
    }
  };



  const addLike = async (video) => {
    let url = video.getElementsByTagName("a")[0].href;
    const likeBtnExists = video.getElementsByClassName("like-btn");

    for (let i = 0; i<likeBtnExists.length;i++){
    likeBtnExists[i].remove();
      
    }

    let {likes,dislikes} = await getLikes(url);
    likes = formatNumber(likes);
    dislikes = formatNumber(dislikes);
    
    const likeBtn = document.createElement("span");
    likeBtn.innerHTML = likes + " likes • "+ dislikes+" dislikes";
    likeBtn.className = "inline-metadata-item style-scope ytd-video-meta-block like-btn";
    likeBtn.title = "Number of likes in this video";
    
    video.querySelector("div.style-scope.ytd-video-meta-block#metadata-line").appendChild(likeBtn);
    
    // console.log(videoMetaBlock);
    //   videoMetaBlock.appendChild(likeBtn);
    
  };

 

  const addSub = async (video) => {
    let url = video.getElementsByTagName("a")[0].href;
    const subBtnExists = video.getElementsByClassName("sub-btn");

    for (let i = 0; i<subBtnExists.length;i++){
      subBtnExists[i].remove();
      
    }

    const { subscriberCount, videoCount } = await getSubs(url);

    const subBtn = document.createElement("pre");
    subBtn.innerHTML = ` ${formatNumber(subscriberCount)} Subs • ${formatNumber(videoCount)} Videos`;
    subBtn.className = "inline-metadata-item style-scope ytd-video-meta-block sub-btn";
    subBtn.title = "Subscriber Count and Video Count";
    subBtn.style.color = "#808080";

    const channelNameArray = video.getElementsByTagName("ytd-channel-name");
    if (channelNameArray.length > 0) {
      channelNameArray[channelNameArray.length - 1].appendChild(subBtn);
    }
  };
  const getLikes = async (url) => {
    let id = url.split("=")[1];
    let likes = 0;
    let dislikes = 0;

    try {
      const cacheKey = `likes_${id}`;
      // Check the browser's cache for the API response
      const cacheResponse = await caches.match(cacheKey);

      if (cacheResponse) {
        const cacheData = await cacheResponse.json();
        likes = cacheData.likes;
        dislikes = cacheData.dislikes;
      } else {
        // let response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${API_KEY}`);
        let response = await fetch(`https://returnyoutubedislikeapi.com/Votes?videoId=${id}`);
        let data = await response.json();
        likes = data.likes;
        dislikes=data.dislikes;

        // Store the API response in the browser's cache
        const cacheData = { likes,dislikes };
        const cacheHeaders = { "Content-Type": "application/json" };
        const cacheResponse = new Response(JSON.stringify(cacheData), {
          headers: cacheHeaders,
        });
        await caches.open("api-cache").then((cache) => {
          cache.put(cacheKey, cacheResponse);
        });
      }
    } catch (error) {
      console.log("Error fetching likes: " + error);
    }

    return {likes,dislikes};
  };

  const getSubs = async (url) => {
    let id = url.split("=")[1];
    let channelId = "";

    try {
      const cacheKey = `channelId_${id}`;
      // Check the browser's cache for the API response
      const cacheResponse = await caches.match(cacheKey);

      if (cacheResponse) {
        const cacheData = await cacheResponse.json();
        channelId = cacheData.channelId;
      } else {
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`);
        let data = await response.json();
        channelId = data.items[0].snippet.channelId;

        // Store the API response in the browser's cache
        const cacheData = { channelId };
        const cacheHeaders = { "Content-Type": "application/json" };
        const cacheResponse = new Response(JSON.stringify(cacheData), {
          headers: cacheHeaders,
        });
        await caches.open("api-cache").then((cache) => {
          cache.put(cacheKey, cacheResponse);
        });
      }
    } catch (error) {
      console.log("Error fetching channel ID: " + error);
    }

    let subscriberCount = 0;
    let videoCount = 0;

    try {
      const cacheKey = `channelStats_${channelId}`;
      // Check the browser's cache for the API response
      const cacheResponse = await caches.match(cacheKey);

      if (cacheResponse) {
        const cacheData = await cacheResponse.json();
        subscriberCount = cacheData.subscriberCount;
        videoCount = cacheData.videoCount;
      } else {
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`);
        let data = await response.json();
        subscriberCount = data.items[0].statistics.subscriberCount;
        videoCount = data.items[0].statistics.videoCount;

        // Store the API response in the browser's cache
        const cacheData = { subscriberCount, videoCount };
        const cacheHeaders = { "Content-Type": "application/json" };
        const cacheResponse = new Response(JSON.stringify(cacheData), {
          headers: cacheHeaders,
        });
        await caches.open("api-cache").then((cache) => {
          cache.put(cacheKey, cacheResponse);
        });
      }
    } catch (error) {
      console.log("Error fetching channel statistics: " + error);
    }

    return { subscriberCount: formatNumber(subscriberCount), videoCount };
  };


  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  }

  
  function processElement(element) {
    // Do something with the element, e.g., modify it
    addLike(element);
    addSub(element);
  }
  // addLikebtn(type);
  // Target node where mutations will be observed
  const targetNode = document.body; // You can change this to the desired target node
  
  // Options for the observer (in this case, watch for childList mutations)
  const observerOptions = { childList: true,subtree: true };
  
  // Create a MutationObserver instance
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Check added nodes for the desired tag name
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.tagName && (addedNode.tagName.toLowerCase() === "ytd-rich-item-renderer"||addedNode.tagName.toLowerCase() === "ytd-compact-video-renderer"||addedNode.tagName.toLowerCase() === "ytd-video-renderer")) {
            console.log("found");
            processElement(addedNode); // Apply the function to the element
          }
        });
      }
    }
  });
  
  // Start observing the target node
  observer.observe(targetNode, observerOptions);

})();
