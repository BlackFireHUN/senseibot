# SENSEI

SENSEI nagyr�szt nodejs ben �rt priv�t bot, kiz�r�lag az animem.org discord szerver�hez k�sz�lt, �gy lehetnek funkci�k ami guild.id/user.id specifikusak(pl. eval parancs user.id specifikus �s csak BlackFire haszn�lhatja)

## Telep�t�s
Sz�ks�ged lesz:
A node runtime ra a futtat�shoz.
NPM re a repository-k let�lt�s�re.
FFMPEG re (music bot elementhez(nem 100% os a m�k�d�se)).

AJ�NLOT: nodemon telep�t�s�t
```bash
npm i nodemon
```
sok mindenben hasznos de a f�bb �rv ami�rt aj�nlom az hogy �jra tudod ind�tani a bot ot annak le�ll�t�sa n�lk�l.

(Asszem ennyi. megj: a bot fejleszt�si st�tuszban van... csak windowson teszteltem, �s in fact tudom hogy linux on csak kisebb v�ltoztat�sok ut�n lehet futtatni(pl: ffmpeg el�r�si �t).



```bash
add meg a bot kulcs�t a /modules/config.json fileban (itt tudod v�ltoztatni a refix et is).
```
navig�lt egy parancssori abalakot a bot el�r�si utj�hoz: cd /bot/el�r�si/�tja/
vagy shift+jobb klik a bot mapp�j�ban majd katt a "PowerShell-ablak megnyit�sa itt"/"parancssor-ablak megnyit�sa itt" feliratra.

```bash
npm i
```

nodemon n�lk�l:
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