---

title: Transparent .webm Videos on iOS  
date: 2025-01-01  

---

## Intro

While making this website, I created videos of the monitor and the keyboard. I wanted these videos to have transparent backgrounds, and to my delight, it seemed that `.webm` supported this feature. I got to work, created the videos, and practically had everything ready. Then, I deployed the site to GitHub Pages, opened it on my iPhone, and to my horror, the transparency didn’t work. Instead, the videos displayed with an ugly black background. This issue persisted no matter which browser I used on iOS.  

I then tested the videos on all major desktop browsers and even on an Android emulator, and everything worked as expected there.  

## How did I address the issue?

After some Googling, I found articles describing a similar issue, but only on Safari. It was confusing because, in my case, the issue occurred on iPhones regardless of the browser. Here are the articles I found:  

- [CSS-Tricks: Overlaying Video with Transparency While Wrangling Cross-Browser Support](https://css-tricks.com/overlaying-video-with-transparency-while-wrangling-cross-browser-support/)  
- [Supergeekery: Transparent Video in Chrome, Edge, Firefox, and Safari (circa 2022)](https://supergeekery.com/blog/transparent-video-in-chrome-edge-firefox-and-safari-circa-2022)  

My solution ended up being a combination of the approaches suggested in these articles. Here’s what I did:  

**NOTE:** As far as I know, you will need a Mac computer to complete these steps.  

1. I exported my video as `.png` images from Blender into a folder.  
2. I then ran [FFmpeg](https://www.ffmpeg.org/) with the following command to create the `.webm` version of the video:  

   ```bash
   ffmpeg -framerate 30 -i %04d.png -c:v libvpx-vp9 -pix_fmt yuva420p output.webm
   ```  

   - `-framerate`: Sets the frames per second for the video. In my case, I exported the images with 30fps from Blender.  
   - `-i %04d.png`: Matches all the `.png` files in the folder (e.g., `0001.png`).  
   - `-c:v libvpx-vp9`: Specifies the codec, in this case, [VP9](https://en.wikipedia.org/wiki/VP9), an open video codec developed by Google.  
   - `-pix_fmt yuva420p`: Sets the pixel format. `yuva420p` is commonly used for web compatibility.  
   - `output.webm`: Specifies the name of the output file.  

3. Next, I created the iOS-compatible version of the video with this command:  

   ```bash
   ffmpeg -framerate 30 -i %04d.png -c:v prores_ks -pix_fmt yuva444p10le -alpha_bits 16 -profile:v 4444 -f mov output.mov
   ```  

   - `-c:v prores_ks`: Sets the codec to Apple ProRes, owned by Apple.  
   - `-pix_fmt yuva444p10le`: Offers better color precision, which can improve transparency.  
   - `-alpha_bits 16`: Specifies 16-bit precision for the alpha channel.  
   - `-profile:v 4444`: Uses the highest quality ProRes profile, which supports alpha channels.  

4. On my Mac, I right-clicked the output video in Finder and selected "Encode Selected Video Files."  
   - Oddly, it took about 5 seconds for the window to open.  

5. In the "Encode Media" window, I chose the following options and clicked "Continue":  
   - Set the setting to `HEVC 1080p` ([link](https://en.wikipedia.org/wiki/HEVC)).  
   - Enabled the `Preserve Transparency` option.  

6. Finally, I included both the resulting `.mov` and `.webm` files in my HTML:  

   ```html
   <video autoplay loop playsinline muted disablepictureinpicture disableremoteplayback poster="/pictures/output.png">
       <source width="512" src="/videos/output.mov" type="video/mp4;codecs=hvc1" />
       <source width="512" src="/videos/output.webm" type="video/webm" />
   </video>
   ```  

   The browser checks if it can play the first source. On iOS, the device recognizes the type `video/mp4;codecs=hvc1` and uses the `.mov` file. Other browsers skip it and play the `.webm` file instead.  

## Conclusion

Apple makes you jump through extra hoops to get video transparency working on iPhones, but it’s doable. Hopefully, in the future, we’ll be able to rely on a single `.webm` source for all devices.  