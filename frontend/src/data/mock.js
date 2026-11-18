// HKBEES - données fictives de démonstration

export const mockUser = {
  id: '1',
  name: 'Jean-Pierre Dupont',
  email: 'apiculteur@hkbees.local',
  role: 'Apiculteur',
  avatar: 'JD',
  exploitation: 'Rucher du Soleil',
  siret: '123 456 789 00012',
  napi: 'NAPI-75-001234'
};

export const mockRuchers = [
  { id: '1', name: 'H1', location: 'Hatiheu (Poihapapu)', lat: 48.8566, lng: 2.3522, ruchesCount: 0, status: 'actif', dateCreation: '2025-12-15' },
  { id: '2', name: 'H2', location: 'Hatiheu (Otto)', lat: 48.4047, lng: 2.7013, ruchesCount: 2, status: 'actif', dateCreation: '2025-12-10' },
  { id: '3', name: 'Maison', location: 'Taiohae', lat: 48.5421, lng: 2.6557, ruchesCount: 0, status: 'actif', dateCreation: '2025-11-20' },
  { id: '4', name: 'T1', location: 'Taipivai (HEIANI)', lat: 48.5607, lng: 3.2994, ruchesCount: 0, status: 'actif', dateCreation: '2025-10-05' },
  { id: '5', name: 'T2', location: 'Taipivai (Boiteu)', lat: 48.5607, lng: 3.2994, ruchesCount: 0, status: 'actif', dateCreation: '2025-09-15' },
  { id: '6', name: 'VAIHI', location: 'Baie du contrôleur', lat: 48.5607, lng: 3.2994, ruchesCount: 0, status: 'actif', dateCreation: '2025-08-01' }
];

export const mockRuches = [
  { id: '1', numero: 'R001', rucherId: '1', rucherName: 'Rucher Principal', type: 'Dadant', etat: 'Fort', reine: 'Marquée 2024', race: 'Buckfast', dateInstallation: '2022-03-15', derniereVisite: '2024-12-20', production: 28 },
  { id: '2', numero: 'R002', rucherId: '1', rucherName: 'Rucher Principal', type: 'Langstroth', etat: 'Moyen', reine: 'Marquée 2023', race: 'Carnica', dateInstallation: '2022-04-10', derniereVisite: '2024-12-18', production: 22 },
  { id: '3', numero: 'R003', rucherId: '1', rucherName: 'Rucher Principal', type: 'Dadant', etat: 'Fort', reine: 'Marquée 2024', race: 'Buckfast', dateInstallation: '2022-05-20', derniereVisite: '2024-12-15', production: 35 },
  { id: '4', numero: 'R004', rucherId: '2', rucherName: 'Rucher de la Vallée', type: 'Warré', etat: 'Faible', reine: 'Non marquée', race: 'Noire', dateInstallation: '2023-02-01', derniereVisite: '2024-12-10', production: 12 },
  { id: '5', numero: 'R005', rucherId: '2', rucherName: 'Rucher de la Vallée', type: 'Dadant', etat: 'Fort', reine: 'Marquée 2024', race: 'Buckfast', dateInstallation: '2023-03-15', derniereVisite: '2024-12-22', production: 30 },
  { id: '6', numero: 'R006', rucherId: '3', rucherName: 'Rucher du Lac', type: 'Dadant', etat: 'Moyen', reine: 'Marquée 2023', race: 'Italienne', dateInstallation: '2021-06-10', derniereVisite: '2024-12-19', production: 25 },
  { id: '7', numero: 'R007', rucherId: '3', rucherName: 'Rucher du Lac', type: 'Langstroth', etat: 'Fort', reine: 'Marquée 2024', race: 'Buckfast', dateInstallation: '2021-07-20', derniereVisite: '2024-12-21', production: 32 },
  { id: '8', numero: 'R008', rucherId: '4', rucherName: 'Rucher Bio', type: 'Kenyane', etat: 'Moyen', reine: 'Marquée 2022', race: 'Noire', dateInstallation: '2020-09-05', derniereVisite: '2024-12-05', production: 18 }
];

export const mockRecoltes = [
  { id: '1', date: '2024-07-15', rucherId: '1', rucherName: 'Rucher Principal', type: 'Miel', variete: 'Acacia', quantite: 45, unite: 'kg', qualite: 'Premium' },
  { id: '2', date: '2024-07-20', rucherId: '2', rucherName: 'Rucher de la Vallée', type: 'Miel', variete: 'Toutes fleurs', quantite: 32, unite: 'kg', qualite: 'Standard' },
  { id: '3', date: '2024-08-10', rucherId: '3', rucherName: 'Rucher du Lac', type: 'Miel', variete: 'Tilleul', quantite: 55, unite: 'kg', qualite: 'Premium' },
  { id: '4', date: '2024-08-25', rucherId: '1', rucherName: 'Rucher Principal', type: 'Pollen', variete: 'Mixte', quantite: 8, unite: 'kg', qualite: 'Bio' },
  { id: '5', date: '2024-09-05', rucherId: '4', rucherName: 'Rucher Bio', type: 'Propolis', variete: 'Brute', quantite: 2.5, unite: 'kg', qualite: 'Bio' },
  { id: '6', date: '2024-09-15', rucherId: '2', rucherName: 'Rucher de la Vallée', type: 'Cire', variete: 'Opercules', quantite: 5, unite: 'kg', qualite: 'Standard' },
  { id: '7', date: '2024-10-01', rucherId: '3', rucherName: 'Rucher du Lac', type: 'Miel', variete: 'Châtaignier', quantite: 38, unite: 'kg', qualite: 'Premium' },
  { id: '8', date: '2024-11-10', rucherId: '1', rucherName: 'Rucher Principal', type: 'Miel', variete: 'Forêt', quantite: 28, unite: 'kg', qualite: 'Standard' }
];

export const mockSanitaire = [
  { id: '1', date: '2024-12-01', rucheId: '1', rucheNumero: 'R001', type: 'Traitement', description: 'Traitement Varroa - Apivar', produit: 'Apivar', resultat: 'Succès', prochainRdv: '2025-03-01' },
  { id: '2', date: '2024-11-15', rucheId: '2', rucheNumero: 'R002', type: 'Inspection', description: 'Contrôle sanitaire annuel', produit: '-', resultat: 'RAS', prochainRdv: '2025-11-15' },
  { id: '3', date: '2024-10-20', rucheId: '4', rucheNumero: 'R004', type: 'Traitement', description: 'Traitement Nosémose', produit: 'Fumidil B', resultat: 'En cours', prochainRdv: '2025-01-20' },
  { id: '4', date: '2024-09-10', rucheId: '3', rucheNumero: 'R003', type: 'Vaccination', description: 'Prévention Loque américaine', produit: 'Terramycine', resultat: 'Succès', prochainRdv: '2025-09-10' },
  { id: '5', date: '2024-08-05', rucheId: '5', rucheNumero: 'R005', type: 'Inspection', description: 'Vérification post-essaimage', produit: '-', resultat: 'RAS', prochainRdv: '2025-02-05' },
  { id: '6', date: '2024-12-15', rucheId: '6', rucheNumero: 'R006', type: 'Traitement', description: 'Traitement Varroa hivernal', produit: 'Acide oxalique', resultat: 'Succès', prochainRdv: '2025-01-15' }
];

export const mockStocks = [
  { id: '1', nom: 'Cadres Dadant', categorie: 'Matériel', quantite: 150, unite: 'pcs', seuil: 50, prix: 3.50, fournisseur: 'Thomas Apiculture' },
  { id: '2', nom: 'Cire gaufrée', categorie: 'Consommable', quantite: 25, unite: 'kg', seuil: 10, prix: 18.00, fournisseur: 'ICKO Apiculture' },
  { id: '3', nom: 'Apivar (lanières)', categorie: 'Sanitaire', quantite: 40, unite: 'pcs', seuil: 20, prix: 2.80, fournisseur: 'Véto-pharma' },
  { id: '4', nom: 'Pots 500g', categorie: 'Conditionnement', quantite: 500, unite: 'pcs', seuil: 100, prix: 0.45, fournisseur: 'Apiculture.net' },
  { id: '5', nom: 'Sirop de nourrissement', categorie: 'Alimentation', quantite: 80, unite: 'L', seuil: 30, prix: 2.20, fournisseur: 'Thomas Apiculture' },
  { id: '6', nom: 'Gants cuir', categorie: 'Protection', quantite: 5, unite: 'paires', seuil: 2, prix: 25.00, fournisseur: 'ICKO Apiculture' },
  { id: '7', nom: 'Enfumoir inox', categorie: 'Matériel', quantite: 3, unite: 'pcs', seuil: 1, prix: 45.00, fournisseur: 'Thomas Apiculture' },
  { id: '8', nom: 'Acide oxalique', categorie: 'Sanitaire', quantite: 2, unite: 'kg', seuil: 1, prix: 35.00, fournisseur: 'Véto-pharma' }
];

export const mockTaches = [
  { id: '1', titre: 'Visite de printemps', date: '2026-03-15', rucher: 'Tous', priorite: 'Haute', statut: 'Planifié', description: 'Première visite de la saison' },
  { id: '2', titre: 'Traitement Varroa', date: '2026-01-15', rucher: 'Rucher Principal', priorite: 'Haute', statut: 'Planifié', description: 'Traitement hivernal acide oxalique' },
  { id: '3', titre: 'Commander cire', date: '2026-01-12', rucher: '-', priorite: 'Moyenne', statut: 'Planifié', description: 'Stock bas - commander 20kg' },
  { id: '4', titre: 'Réparation ruches', date: '2026-01-20', rucher: 'Rucher Bio', priorite: 'Basse', statut: 'Planifié', description: 'Réparer 3 toits endommagés' },
  { id: '5', titre: 'Déclaration annuelle', date: '2026-01-31', rucher: 'Tous', priorite: 'Haute', statut: 'En cours', description: 'Télédéclaration des ruches' },
  { id: '6', titre: 'Pose hausses', date: '2026-04-01', rucher: 'Tous', priorite: 'Haute', statut: 'Planifié', description: 'Début de miellée' }
];

export const mockStats = {
  totalRuches: 41,
  totalRuchers: 4,
  productionAnnuelle: 283,
  recoltesMois: 28,
  santeMoyenne: 85,
  alertes: 3,
  productionParMois: [
    { mois: 'Jan', production: 0 },
    { mois: 'Fév', production: 0 },
    { mois: 'Mar', production: 5 },
    { mois: 'Avr', production: 15 },
    { mois: 'Mai', production: 35 },
    { mois: 'Jun', production: 52 },
    { mois: 'Jul', production: 77 },
    { mois: 'Aoû', production: 48 },
    { mois: 'Sep', production: 32 },
    { mois: 'Oct', production: 15 },
    { mois: 'Nov', production: 4 },
    { mois: 'Déc', production: 0 }
  ],
  repartitionProduction: [
    { type: 'Miel Acacia', valeur: 45, color: '#FFD93D' },
    { type: 'Miel Toutes fleurs', valeur: 60, color: '#F5A623' },
    { type: 'Miel Tilleul', valeur: 55, color: '#8B5CF6' },
    { type: 'Miel Châtaignier', valeur: 38, color: '#6B4423' },
    { type: 'Miel Forêt', valeur: 28, color: '#059669' },
    { type: 'Pollen', valeur: 8, color: '#F59E0B' },
    { type: 'Propolis', valeur: 2.5, color: '#7C3AED' },
    { type: 'Cire', valeur: 5, color: '#EAB308' }
  ]
};

export const mockNotifications = [
  { id: '1', type: 'warning', message: 'Stock bas: Cire gaufrée (25 kg)', date: '2025-01-08', read: false },
  { id: '2', type: 'info', message: 'Rappel: Traitement Varroa dans 7 jours', date: '2025-01-08', read: false },
  { id: '3', type: 'success', message: 'Déclaration annuelle envoyée', date: '2025-01-05', read: true },
  { id: '4', type: 'warning', message: 'Ruche R004 - État faible détecté', date: '2025-01-03', read: false }
];
