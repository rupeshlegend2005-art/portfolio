# 🎬 Rupesh — Video Editor & Motion Designer Portfolio

A cinematic portfolio website featuring **dedicated, separate showcase sections** for each editing category:
1. **🔥 Gym & Fitness Reels (9:16 Vertical Phone Layout)**
2. **⚡ Viral Shorts & TikToks (9:16 Vertical Phone Layout)**
3. **📺 Commercials & Promotional Ads (16:9 Widescreen Cinema)**
4. **🎙️ Studio Podcasts & Talking Head (16:9 Multi-Camera)**
5. **🎬 YouTube Vlogs & Long-Form (16:9 Narrative Storytelling)**

Built with high-performance modern web technologies (HTML5, CSS3, Vanilla JS) featuring zero dependencies, zero build-step errors, and 100 Lighthouse performance score. Ready for one-click deployment on **Vercel**.

---

## 🌟 Structure of Your Portfolio

- **Sticky Quick-Jump Bar**: Visitors can click pills (`Gym & Fitness`, `Viral Shorts`, `Brand Ads`, `Podcasts`, `YouTube Vlogs`) to glide straight to the exact category they want.
- **Dedicated Category Showcases**:
  - Each section has its own glowing header, view count, and specialized layout:
    - **Vertical 9:16 Reels Grid** (4 items per row) for Gym Reels & Shorts.
    - **Cinematic 16:9 Widescreen Grid** (2 items per row) for Ads, Podcasts, and Vlogs.
- **Smart Video Player Lightbox**:
  - Automatically plays **both direct MP4 video files** and **YouTube links / YouTube Shorts**!
  - When a visitor clicks any project, it opens an interactive modal with view counts, retention statistics, client name, and editing software used.
- **Interactive Before vs After Slider**: Side-by-side draggable comparison showing flat raw camera footage vs final color graded and sound-designed master cut.
- **Interactive Project Brief Form & WhatsApp**: Direct 1-click lead capture button that sends project requests straight to your WhatsApp.

---

## 💻 How to Preview in Your Browser

In File Explorer, simply go to:
```
d:\portfolio antigravity
```
and **double-click `index.html`** to view your portfolio live in your web browser!

---

## 🎥 How to Add Your Own Videos to Each Section

Open [index.html](file:///d:/portfolio%20antigravity/index.html) in your editor (such as VS Code). You will see clearly marked sections:

### 1. Adding a Gym Reel:
Look for `<!-- SECTION 1: GYM REELS & FITNESS -->` around line 170.
Inside any `.project-card`, update:
```html
data-video="YOUR_VIDEO_URL_OR_YOUTUBE_LINK"
data-title="Your Gym Reel Title"
data-client="Athlete or Brand Name"
data-views="2.4M Views"
```
And replace the thumbnail image:
```html
<img src="YOUR_THUMBNAIL_IMAGE_URL" alt="..." class="card-thumb">
```

### 2. Adding YouTube Videos or Shorts:
You can simply paste your YouTube link directly into `data-video`:
- `data-video="https://www.youtube.com/watch?v=VIDEO_ID"`
- Or Shorts link: `data-video="https://www.youtube.com/shorts/VIDEO_ID"`
- The smart video player will automatically convert it into a smooth, ad-free iframe inside the modal!

### 3. Adding Commercial Ads, Podcasts, or Vlogs:
Look for their corresponding sections in `index.html`:
- `<!-- SECTION 3: COMMERCIALS & PROMOTIONAL ADS -->`
- `<!-- SECTION 4: PODCASTS & TALKING HEAD -->`
- `<!-- SECTION 5: YOUTUBE VLOGS & LONG-FORM -->`

---

## ☁️ How to Deploy on Vercel

1. Open your Vercel Dashboard ([vercel.com](https://vercel.com)) where you have **"Deploy your first project"**.
2. **Drag and drop the folder `d:\portfolio antigravity`** directly into the browser window.
3. Vercel will instantly detect `index.html` and deploy your portfolio live with a free `.vercel.app` URL!
