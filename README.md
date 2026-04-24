Diceware Español (Lista Curada)

Este proyecto construye una lista de palabras estilo Diceware en español,
priorizando legibilidad, simplicidad y consistencia.

⸻

📌 Motivación

* El método Diceware usa listas de 7776 palabras (6⁵ combinaciones).
* La lista oficial en español (DW-Espanol-1.txt) presenta problemas:
    * Contiene palabras poco naturales (y1, a3, símbolos).
    * Baja calidad en términos de memorización.
* Existe una alternativa en inglés:
    * EFF Large Wordlist
    * Mejor curada, sin símbolos extraños y con palabras comunes.

👉 Este proyecto busca una versión equivalente en español.

⸻

🎯 Objetivo

Construir una lista Diceware en español que sea:

* ✔️ Fácil de leer
* ✔️ Fácil de escribir
* ✔️ Sin ambigüedades
* ✔️ Basada en palabras comunes
* ✔️ Con tamaño controlado

⸻

📊 Estrategia de palabras

Se toma como referencia la distribución de la lista EFF:

Longitud	Cantidad aprox
9 letras	~1557
8 letras	~1779
7 letras	~1591
6 letras	~1372
5 letras	~928
4 letras	~467
3 letras	~82

👉 Se replica este rango en español (3 a 9 letras).

⸻

🧠 Criterios de selección

Cada palabra se evalúa con una especie de “rúbrica”:

* ✔️ Común → elefante (~ tungsteno)
* ✔️ Legible → mesa (~ psique)
* ✔️ Escribible → pasa (~ paza)
* ✔️ No ambigua → casa (~ caza)
* ✔️ Visual → nube (~ proceso)
* ✔️ Sin variantes → cerca (~ cercas)
* ✔️ Forma base → comer (~ apenitas)
* ⚠️ Regionalismos → evitar

Casos especiales

* Homófonos: ll / y, c / s / z
* Letras mudas: h
* Se evita:
    * Tildes
    * ñ, ü
    * caracteres especiales

👉 Se prioriza ASCII puro para máxima compatibilidad.

⸻

📁 Archivos

* diccionario-es.txt → diccionario base
* DW-Espanol-1.txt → lista oficial
* eff_large_wordlist.txt → referencia en inglés
* diccionario-*-comun.txt → listas finales por longitud

⸻

⚙️ Scripts útiles

```
# Filtrar palabras sin tilde por tamaño
sed -n 's/,.*//; p' diccionario-es.txt \
| awk '3 < length($0) && length($0) < 7' \
| grep -v '[áéíóúñ-]' > output.txt

# Versión solo con awk
sed -n 's/,.*//; p' diccionario-es.txt \
| awk 'length($0) == 8 && $0 !~ /[áéíóúñü]/'

# Comparar listas (eliminar duplicados)
grep -Fxv -f diccionario-6-comun.txt <(
  cat DW-es-bonito.csv \
  | sed -n "s/.\{7\}//; s/.$// p" \
  | awk '5 < length($0) && length($0) < 7' \
  | sort \
  | grep -v "[áéíóúñ]"
) | less

# Extraer palabras de longitud específica
grep -v '[,ñáéíóú-]' diccionario-es.txt \
| awk 'length($0) == 7' > output-7.txt

# Conteo total
wc -l diccionario-*-comun*

# Validar checksum
jq -r '.checksum.value' diceware-es-0.1.0.meta.json \
| sha256sum -c
```
⸻

🛠️ Proceso de construcción

1. Generar palabras filtradas (output.txt)
2. Abrir archivos en vim
3. Clasificar manualmente según criterios
4. Agregar a diccionario-*-comun.txt
5. Validar duplicados y consistencia
6. Verificar checksum

⸻

🎲 Generación de valores

Puedes simular dados con:

* https://google.com/search?q=5*d6
* https://share.google/auepsGdSLUDvtWj8S

También puedes usar una representación visual tipo:

* plano X/Y
* colores para agrupar combinaciones

⸻

🔗 Fuentes

* https://corpus.rae.es/lfrecuencias.html
* https://github.com/JorgeDuenasLerin/diccionario-espanol-txt
* https://github.com/mir123/dadoware-bonito-es
* https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt

⸻

❓ Preguntas frecuentes

¿Por qué no usar “Diceware Bonito”?

* Contiene palabras muy largas (>10 caracteres)
* Reduce la usabilidad como contraseña
* Aumenta errores al escribir

👉 Este proyecto prioriza equilibrio entre seguridad y usabilidad

⸻

Si quieres, en el siguiente paso podemos:

* convertir esto en un README estilo GitHub (badges, ejemplos)
* o automatizar la rúbrica con un script en Python 👍
