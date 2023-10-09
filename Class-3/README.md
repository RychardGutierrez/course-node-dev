# Class 3 - Fix CORS and Development API Rest with Express

### Content:
- Explicando la clase
- Pequeño Repaso de la Clase 2 (para recordar)
- A MOVER LAS MANITAS ✋🙂✋
- ¿Qué es una REST API? 
    - It is software arquitecture
- Principios de REST
- Fundamentos de REST
- Creando los GET
- Parámetros/filtro
- GET Recuperar todas las películas (Segmento dinámico)
- GET Recuperar una película por id + que es un endpoint (Segmento dinámico)
- Regex & Path-to-regex
- GET Filtrar por género + query string (segmento dinámico)
- POST Crear una película
- Crear IDs con Node/crypto
- Recurso: HTTP CAT
- Validaciones con POST + Zod
- 400 vs 402
- PATCH Actualizar una película
- POST VS PUT VS PATCH
- CORS, SOLUCIONES Y PROBLEMAS
- CORS PRE-FLIGHT + SOLUCIÓN
- Usando un Middleware CORS


### Notes
Idempotence: The ability to perform a given action several times and still obtain the same result that would be obtained by doing it once.

POST: Create a new element in the server

/movies

post is not idempotence because you always create a new element


PUT: Update all element that already exists or create a new element

/movies/123-213-123
Yes it's idempotence because the result allways the same.


PATCH: Update partial a element

/movies/123-213-123

Normally yes it could be, but it depends