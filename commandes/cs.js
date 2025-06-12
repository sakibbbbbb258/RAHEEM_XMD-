"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "repo",
    catégorie: "General",
    reaction: "🚀", // Reaction restored
    nomFichier: __filename,
  },
  async (dest, zk, commandOptions) => {
    const githubRepo = "https://api.github.com/repos/Raheem-cm/RAHEEM_XMD-";
    const imageUrl = "https://files.catbox.moe/z5g58c.jpg";
    const audioUrl = "https://files.catbox.moe/2w6sq8.mp3";

    try {
      const response = await fetch(githubRepo);
      const data = await response.json();

      if (data) {
        const repoInfo = {
          stars: data.stargazers_count,
          forks: data.forks_count,
          lastUpdate: data.updated_at,
          owner: data.owner.login,
        };

        const releaseDate = new Date(data.created_at).toLocaleDateString("en-GB");
        const lastUpdateDate = new Date(data.updated_at).toLocaleDateString("en-GB");

        const repoMessage = `
╭━━━『 *RAHEEM XMD* 』━━⬣
┃
┃ 🔗 *Repository:* ${data.html_url}
┃ 👤 *Owner:* ${repoInfo.owner}
┃ ⭐ *Stars:* ${repoInfo.stars}
┃ 🍴 *Forks:* ${repoInfo.forks}
┃ 📆 *Created:* ${releaseDate}
┃ 🔄 *Last Updated:* ${lastUpdateDate}
┃
┃ 📣 *Join our Channel:* 
┃ https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣
        `;

        // Step 1: Send image with repo caption
        const sentMsg = await zk.sendMessage(dest, {
          image: { url: imageUrl },
          caption: repoMessage,
        });

        // Step 2: Send audio reply to that message
        await zk.sendMessage(dest, {
          audio: { url: audioUrl },
          mimetype: "audio/mp4",
          ptt: true,
        }, { quoted: sentMsg });

      } else {
        console.log("Failed to fetch repository data.");
      }
    } catch (error) {
      console.log("Error fetching repository info:", error);
    }
  }
);
