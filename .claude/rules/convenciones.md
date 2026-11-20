# Convenciones del proyecto

- Leer `CLAUDE.md` y los `docs/` relevantes antes de cambios grandes.
- Si una decisión cambia el stack, el modelo de datos o el alcance, actualizar el doc correspondiente en `docs/` en el mismo cambio.
- El código va en `src/`, las pruebas en `tests/`.
- No subir secretos: variables sensibles en `.env` (ignorado por git) y un `.env.example` documentado.
