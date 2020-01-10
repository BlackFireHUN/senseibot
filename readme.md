# SENSEI

SENSEI nagyrészt nodejs ben írt privát bot, kizárólag az animem.org discord szerveréhez készült, így lehetnek funkciók ami guild.id/user.id specifikusak(pl. eval parancs user.id specifikus és csak BlackFire használhatja)

## Telepítés
Szükséged lesz:
A node runtime ra a futtatáshoz.
NPM re a repository-k letöltésére.
FFMPEG re (music bot elementhez(nem 100% os a müködése)).

AJÁNLOT: nodemon telepítését
```bash
npm i nodemon
```
sok mindenben hasznos de a fõbb érv amiért ajánlom az hogy újra tudod indítani a bot ot annak leállítása nélkül.

(Asszem ennyi. megj: a bot fejlesztési státuszban van... csak windowson teszteltem, és in fact tudom hogy linux on csak kisebb változtatások után lehet futtatni(pl: ffmpeg elérési út).



```bash
add meg a bot kulcsát a /modules/config.json fileban (itt tudod változtatni a refix et is).
```
navigált egy parancssori abalakot a bot elérési utjához: cd /bot/elérési/útja/
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