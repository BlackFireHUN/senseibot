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

AJÁNLOT: nodemon telepítését
```bash
npm i nodemon
```
sok mindenben hasznos de a főbb érv amiért ajánlom az hogy újra tudod indítani a bot ot annak leállítása nélkül.

(Asszem ennyi. megj: a bot fejlesztési státuszban van... csak windowson teszteltem, és in fact tudom hogy linux on csak kisebb változtatások után lehet futtatni(pl: ffmpeg elérési út).



```bash
add meg a bot kulcsát a config.json fileban (itt tudod változtatni a prefix et is).
```
navigálj egy parancssori abalakot a bot elérési utjához: 
```bash
cd /bot/elérési/útja/
```
vagy shift+jobb klik a bot mappájában majd katt a "PowerShell-ablak megnyitása itt"/"parancssor-ablak megnyitása itt" feliratra.

```bash
npm i
```

nodemon nélkül:
```bash
node bot.js
```
vagy
nodemon-al:
```bash
nodemon bot.js
```


## AUTHOR
[BlackFire](https://blackfire.hu/)
