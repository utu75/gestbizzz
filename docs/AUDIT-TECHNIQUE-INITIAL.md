# Audit technique initial — HKBEES

Date de référence : 17 novembre 2026 (Pacific/Marquesas).

## Verdict

Le dépôt contient un prototype fonctionnel d'interface, utile comme inventaire produit, mais pas une application de production. Il doit être repris progressivement et non déployé tel quel.

## Éléments réutilisables

- navigation et inventaire des modules métier ;
- écrans ruchers, ruches, récoltes, sanitaire, stocks et rapports ;
- composants React/Radix ;
- première direction visuelle ;
- prototype FastAPI comme point de départ de l'API.

## Bloquants de production

### Critique

- identifiants administrateur et mot de passe affichés et codés dans le frontend ;
- authentification simulée dans `localStorage` ;
- route d'administration protégée seulement par l'état du navigateur ;
- données métier fictives et suppressions uniquement en mémoire ;
- aucune isolation entre exploitations ;
- CORS autorisé à `*` par défaut avec credentials activés ;
- aucune gestion de secrets, 2FA, audit ou révocation de session.

### Important

- API limitée à un `status check` ;
- MongoDB sans modèle métier ni migrations ;
- aucun contrat API versionné ;
- absence de synchronisation hors ligne ;
- pas de tests métier significatifs ;
- pas de workflow CI/CD propre au dépôt ;
- aucune facturation réelle, quota ou contrôle d'offre côté serveur ;
- aucune gestion de médias, QR, IoT ou voix.

## Décision d'architecture

1. Conserver le prototype sur la branche historique.
2. Construire le noyau métier et les droits par offre sur `hkbees/foundation`.
3. Remplacer l'authentification simulée avant toute bêta externe.
4. Passer à PostgreSQL/PostGIS avec migrations.
5. Introduire une API `/v1` et des contrôles multi-tenant systématiques.
6. Migrer les écrans progressivement vers l'API.
7. Construire l'application mobile hors ligne après stabilisation du domaine rucher/colonie.

## Offres structurantes

| Offre | Taille | Utilisateurs | Positionnement |
|---|---:|---:|---|
| Débutant | 1–10 ruches | 1 | registre essentiel et apprentissage |
| Pro | 11–399 ruches | 3 | exploitation commerciale et IA |
| Exploitation | 400–999 ruches | 10 | équipes, IoT et automatisations |
| Entreprise | 1 000+ | personnalisé | coopératives et organisations |

Les limites sont contrôlées par l'API. Masquer un bouton dans l'interface ne constitue jamais une protection.

## Ordre de correction

1. Sécurité de l'authentification.
2. Organisations, utilisateurs, rôles et abonnements.
3. PostgreSQL et modèle rucher/ruche/colonie.
4. Journal d'audit et quotas.
5. API et migration des écrans.
6. Mobile hors ligne, voix et QR.
7. Traçabilité du miel.
8. IoT et agents IA.

