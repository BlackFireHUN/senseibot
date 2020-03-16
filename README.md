# SENSEI
<h2 align="center"><img src="http://blackfire.hu/dl/running.png"></h2>

SENSEI nagyrészt nodejs ben írt privát bot, kizárólag az animem.org discord szerveréhez készült,<br/> így lehetnek funkciók ami guild.id/user.id specifikusak(pl. eval parancs user.id specifikus és csak BlackFire használhatja)

## Telepítés
<p>Szükséged lesz:</p>
<ul>
<li>A node runtime ra a futtatáshoz.</li>
<li>NPM re a repository-k letöltésére.</li>
<li>FFMPEG re (music bot elementhez(nem 100% os a müködése)).</li>
</ul>

(Asszem ennyi. megj: a bot fejlesztési státuszban van... csak windowson teszteltem, és in fact tudom hogy linux on csak kisebb változtatások után lehet futtatni(pl: ffmpeg elérési út).



```bash
add meg a bot kulcsát a config.json fileban (itt tudod változtatni a prefix et is).
illetve add meg a youtube api kulcsodat is.
```
navigálj egy parancssori abalakot a bot elérési utjához: 
```bash
cd /bot/elérési/útja/
```
vagy shift+jobb klik a bot mappájában majd katt a "PowerShell-ablak megnyitása itt"/"parancssor-ablak megnyitása itt" feliratra.

dependency-k telepítése:
```bash
npm i
```

indítás:
```bash
node bot.js
```

## SENSEI - the not finished branch - 
i'm not skilled enugh to make sensei as good as it should be... i think imma stop developing sensei... im just ruining it... it works... kinda... the level system does not in this branch... the user info ha a mysql error... i wont include the mysql schemas or what for the bot... u can guess it by loking into the code... the database stuff is in the config.json... the new mysql based log works great so far... altho it has the connection in the log.js... so the first message event after the bot start wont be loged... GL &HF ... i really enjoyed working on sensei... i hope someone will take the effort to understand my bad code and tries to make sensei better...

## AUTHOR
[BlackFire](https://blackfire.hu/) 
