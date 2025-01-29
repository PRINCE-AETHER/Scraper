<<<<<<< HEAD
const cheerio = require("cheerio");

/**
 * SCRAPED BY AETHER
 * FORBIDDEN TO SELL AND DELETE MY WM
 */

async function igDl(url) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch("https://yt1s.io/api/ajaxSearch", {
      method: "POST",
      body: new URLSearchParams({
        recapthaToken: "",
        q: url,
        t: "media",
        lang: "id",
      }),
    })
      .then((v) => v.json())
      .then((v) => v.data);
    if (!res) return reject("Video Bersifat Pribadi");
    const data = [];
    const $ = cheerio.load(res);
    const downloads = $("ul");
    $(downloads)
      .find("li")
      .each((i, el) => {
        data.push({
          type: $(el)
            .find("a[title]")
            .attr("title")
            .toLowerCase()
            .includes("photo")
            ? "photo"
            : "video",
          thumbnail:
            $(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
          media: $(el).find("a[title]").attr("href"),
        });
      });
    resolve(data);
  });
}

async function igStalk(user) {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://tools.revesery.com/stalkers/${user.replace(
        /[^\w\d]/gi,
        ""
      )}`
    )
      .then((v) => v.json())
      .then((v) => v.result)
      .then((v) => resolve(v))
      .catch((v) => reject(v));
  });
=======
const fetch = require("node-fetch");

/**
 * 📌 INSTAGRAM VIDEO/FOTO DOWNLOADER
 * Scraped by Aetherz - Free to Use
 */

async function igDl(url) {
  try {
    const apiUrl = `https://api.snapinsta.app/api/v1/fetch`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    const json = await response.json();
    console.log(json); 

    if (!json.status || !json.data) throw new Error("Gagal mengambil media!");

    return json.data.map((media) => ({
      type: media.type.includes("video") ? "video" : "photo",
      thumbnail: media.thumbnail || null,
      media: media.url,
    }));
  } catch (error) {
    console.error("Error di igDl:", error);
    throw new Error(`Error: ${error.message}`);
  }
}

/**
 * 📌 INSTAGRAM PROFILE SCRAPER
 * Get user profile data from Instagram
 */

async function igStalk(username) {
  try {
    const apiUrl = `https://www.instagramscraperapi.com/api?username=${username}`;
    const response = await fetch(apiUrl);
    const json = await response.json();
    console.log(json); 

    if (!json.success || !json.data) throw new Error("Gagal mengambil data profil!");

    return {
      username: json.data.username,
      full_name: json.data.full_name,
      followers: json.data.follower_count,
      following: json.data.following_count,
      bio: json.data.biography || "Tidak ada bio.",
      profile_pic: json.data.profile_pic || null,
    };
  } catch (error) {
    console.error("Error di igStalk:", error);
    throw new Error(`Error: ${error.message}`);
  }
>>>>>>> 9f23544 (Scrape)
}

module.exports = {
  igDl,
  igStalk,
};
