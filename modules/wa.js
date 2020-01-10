const fetch = require('fetch-base64')
const rp = require('request-promise')
const anifetch = require('anifetch');

const config = require("./config.json")
const wa_url = `https://trace.moe/api/search?token=${config.wa_token}`

const Anime = (title_romaji, title_english, title_japanese, episode, at, link) => {
    return { title_romaji, title_english, title_japanese, episode, at, link }
}

exports.imgtob64 = async function(image_url) {
    const res = await fetch.remote(image_url)
    return res[0]
}

exports.callapi = async function(b64) {
    var options = {
        method: 'POST',
        uri: wa_url,
        form: { image: b64 },
    };
    return await rp(options)
}

getLink = async function(title) {
    let results = await anifetch.search('anilist', 'anime', title)
    return results[0]['url']
}

calcTime = async function(s) {
    let m = data["at"] / 60
    let ms = Math.round(m) + ":" + Math.round(m % 1 * 60)
    return ms;
}

exports.parsejson = async function(json) {
    data = await JSON.parse(json)["docs"][0]
    at = await calcTime(data["at"])
    link = await getLink(data["title_english"])
    return Anime(data["title_romaji"], data["title_english"], data["title"], data["episode"], at, link)
}