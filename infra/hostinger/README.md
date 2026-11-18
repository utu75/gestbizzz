# Déploiement HKBEES sur l'infrastructure Hostinger de HK Group

## Isolation obligatoire

HKBEES partage l'infrastructure physique de HK Group mais pas ses secrets, bases, réseaux internes ou cycles de déploiement.

```text
CDN/WAF
  ├── domaine HK Group → reverse proxy → marketplace HK Group
  └── domaine HKBEES   → reverse proxy → réseau Docker hkbees
                                            ├── web
                                            ├── api
                                            ├── worker
                                            ├── redis
                                            └── mqtt gateway
```

PostgreSQL et les médias doivent disposer de sauvegardes chiffrées hors du VPS. Le VPS Hostinger ne doit jamais être l'unique copie.

## Comptes

- comptes techniques au nom de HK Group ;
- deux administrateurs nominatifs minimum ;
- MFA sur Hostinger, DNS, GitHub, paiement et magasins mobiles ;
- SSH par clés uniquement ;
- aucun mot de passe partagé ;
- accès production séparé du développement.

## Déploiement

1. construction et scan des images en CI ;
2. sauvegarde et contrôle des migrations ;
3. transfert des images signées ;
4. déploiement progressif ;
5. tests de fumée ;
6. retour automatique à la version précédente en cas d'échec ;
7. journal de déploiement et notification HK Group.

## Avant mise en ligne

- domaine et marque validés ;
- TLS et renouvellement testés ;
- politiques de confidentialité et CGV publiées ;
- restauration de sauvegarde démontrée ;
- 2FA obligatoire pour les comptes sensibles ;
- pilote Haïti Mélina séparé de la production commerciale ;
- monitoring, alertes et page de statut opérationnels.

