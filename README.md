# YouTube Video Like Counter

**OVERVIEW**

This Chrome extension is designed to enhance your YouTube viewing experience by providing two key features:

- Video Like Counter: View the number of likes on a YouTube video without having to open the video itself.

- Timestamp Bookmarker: Easily bookmark and store timestamps for important moments in a video. These bookmarks are saved locally for future reference.

- Extract Transcript: Extract the Transcript of a Video and copy it to the clipboard,



## Features

**Video Like Counter**

-  View the number of likes and dislikes on a YouTube video without opening the video page.
- Conveniently gauge the popularity of videos in search results and playlists.
- Shows the subscriber count and number of videos uploaded by the channel

### Additional Features

**Timestamp Bookmarker**

-  Bookmark timestamps in videos for easy reference.
-  Add labels or descriptions to your bookmarks for context.
- Quickly access and manage your saved timestamps through the extension's interface.

  **Extract Transcript**
- Extract Transcript of a Video and copy it to clipboard.

## Acknowledgements

- [ Mentor-Harsh Sharma ]
  
- [APIs](https://aws.amazon.com/what-is/api/)



## API Reference

#### Youtube Data Api

```http
  https://developers.google.com/youtube/v3/docs/videos/list?apix_params=%7B%22part%22%3A%5B%22statistics%22%5D%2C%22id%22%3A%5B%228gDZBfs9Yv4%22%5D%7D#http-request
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the item to fetch |




## Appendix


### 1. Supported Video Platforms

- YouTube
-more platforms to be added....

### 2. Usage Instructions

To use this Chrome extension:

1. Install the extension from the Chrome Web Store.
2. Open a supported video platform and play a video.
3. The extension will display the following information:
   - **Likes**: The number of likes the video has received.
   - **Dislikes**: The number of dislikes the video has received.
   - **Bookmarks**: The number of times the video has been bookmarked.
   - **Video Timestamps**: A list of important timestamps within the video.

### 3. How Data Is Collected

This extension collects video engagement data through APIs provided by the respective video platforms. It does not collect any personal user data or violate any privacy policies.

### 4. Known Issues

- Occasionally, the extension may not accurately retrieve engagement data due to changes in the video platform's website structure. We aim to address such issues promptly in updates.

### 5. Upcoming Features

We have plans to add the following features in future releases:

- Support for more video platforms.
- Enhanced analytics and historical data tracking.
- User customization options for displayed data.

### 6. Feedback and Contributions

We welcome feedback, bug reports, and contributions from the open-source community.

---


## Demo

Insert gif or link to the demo

## Installation

To use this extension, follow these steps:

 1.**Clone the Repository**: Clone this GitHub repository to your local machine using the following command:
 ```bash
 git clone https://github.com/logan-keede/Cryptologists.git

```
 2.**Install in Chrome:**

 a. Open Chrome and go to chrome://extensions/.

b. Enable "Developer mode" in the top-right corner.

c. Click on the "Load unpacked" button.

d. Select the folder where you cloned this repository.

**Usage:**

a. Navigate to a YouTube video page.

b. The extension will automatically display the number of likes, dislikes, subscriber count, and number of videos uploaded by the channel along with the  video title.

c. To bookmark a timestamp, click the plus icon (located in the Chrome toolbar) while watching the video at the desired moment. A dialog will appear for you to enter a label or description for the bookmark.

d. To access your bookmarks, click the extension icon and choose "View Bookmarks." You can see your saved timestamps there.

**Logo**
    
![Insight](https://github.com/logan-keede/Cryptologists/assets/129597590/421110c5-2e85-4813-83bb-68b0aebe52f7)


## Roadmap

- Additional browser support

- Add more integrations

## Troubleshooting

If you encounter any issues with the extension, please check the following:

 - Ensure that you are using a supported version of Google Chrome.
 - Make sure you are playing a video on YouTube before clicking the extension icon.
 - If the extension is not working as expected, try reloading the YouTube page and playing the video again.
 - If the issue persists, please report it in the issue tracker.

## Screenshots

![2fcbc177-178e-4018-bdf1-02fe639e81a6](https://github.com/logan-keede/Cryptologists/assets/129597590/18687fe7-ca8f-46e7-9266-2b5c008a56f1)

## 🔗 Developers profile

**Vedic Chawla**
[![Git Hub profile](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![Linkdin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![Instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/your_instagram_profile/)



**Aman Parmar**
[![Git Hub profile](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://https://github.com/logan-keede/)
[![Linkdin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vedic-chawla-a46538255/)
[![Instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/vedic_chawla/)


**Devika Verma**
[![Git Hub profile](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![Linkdin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![Instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/your_instagram_profile/)



## Documentation and Resources

 - How to use Youtube Data APIs [ https://developers.google.com/youtube/v3 ]
 - javascript [ https://developer.mozilla.org/en-US/docs/Web/JavaScript ]
 - REACTjs [ https://react.dev/ ]
 - REACTjs tutorial [ https://youtu.be/J6mDkcqU_ZE?si=VbjV7SZx8NzSEJyt ]
 - MongoDb [ https://www.mongodb.com/docs/ ]
 - MongoDb tutorial [ https://youtu.be/J6mDkcqU_ZE?si=VbjV7SZx8NzSEJyt ]
 - Fonts [ https://fontawesome.com/ ]
 - ChatGpt [ https://chat.openai.com/c/24f030f9-47cb-474c-90f5-dad3c4e91427 ]
 - GitHub documents [ https://docs.github.com/en/actions ]
 - 

`
## Tech Stack

**Client:** React, JavaScript, CSS, HTML

**Server:** Express, MongoDB ,NodeJs



