# Fondation technique HKBEES

## Décision

Le prototype actuel n'est pas supprimé. La migration se fait progressivement vers un monorepo professionnel :

```text
apps/web          application de pilotage et portail QR
apps/mobile       Android/iOS, terrain hors ligne, voix, QR/NFC
apps/api          API métier multi-tenant
apps/worker       IA, rapports, notifications et médias
apps/iot-gateway  MQTT, capteurs et alertes
packages/domain   règles métier
packages/database PostgreSQL/PostGIS et migrations
packages/contracts contrats API et événements
packages/ui       design system HKBEES
```

## Architecture cible

- Web Next.js et mobile React Native/Expo.
- API TypeScript modulaire.
- PostgreSQL/PostGIS comme source de vérité.
- SQLite locale et journal de synchronisation pour le hors-ligne.
- Redis pour files et tâches asynchrones.
- stockage compatible S3 pour photos, audio, vidéo et documents.
- MQTT pour balances, météo, température, acoustique, GPS et caméras.
- Stripe/Billing pour abonnements Web et crédits IA.
- 2FA par passkey ou TOTP, obligatoire pour rôles sensibles.

## Intégration HK Group

HK Group reste la marketplace centrale des produits. HKBEES apparaît dans son catalogue avec présentation, tarifs, création de compte, connexion, support et liens vers les magasins mobiles.

Routage recommandé :

- `hkgroup.example/products/hkbees` : fiche marketplace ;
- `app.hkbees.example` : application HKBEES ;
- `api.hkbees.example` : API ;
- `qr.hkbees.example` : traçabilité publique ;
- `status.hkbees.example` : état des services.

L'authentification pourra évoluer vers un SSO HK Group, mais chaque produit conserve des autorisations et données isolées. Une compromission de la marketplace ne doit pas donner automatiquement accès aux données apicoles.

## Migration du prototype

1. Inventorier les écrans et règles utiles.
2. Écrire le modèle métier cible.
3. Ajouter l'authentification et le multi-tenant.
4. Construire l'API PostgreSQL.
5. Migrer les écrans module par module.
6. Ajouter l'application mobile hors ligne.
7. Tester avec un panel d'apiculteurs propre à HKBEES.
8. Basculer seulement après validation et export de secours.

## Règles de Git

- `main` reste protégée et déployable.
- `hkbees/foundation` prépare la nouvelle fondation.
- toute fusion passe par pull request, tests et revue.
- les migrations destructrices sont interdites sans stratégie de retour.
- les versions de production sont taguées.

