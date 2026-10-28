# Configuration Firebase Analytics & Suivi des Tractions

Ce document détaille l'intégration de **Firebase Analytics** (propulsé par Google Analytics 4 / Google Tag) sur l'ensemble du site `ctokoffi.me`.

---

## 1. Paramètres et clés nécessaires

Créez un fichier `.env.local` à la racine du projet (ou configurez vos variables d'environnement dans votre plateforme d'hébergement comme Vercel / Netlify / Cloudflare) avec les clés suivantes :

```env
# Clé obligatoire pour activer la collecte Google Analytics 4 / Firebase
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Clés de configuration de l'application Web Firebase (issues de la console Firebase)
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
FIREBASE_PROJECT_ID=votre-projet-id
FIREBASE_APP_ID=1:1234567890:web:abcdef...
FIREBASE_MESSAGING_SENDER_ID=1234567890

# Note : Les préfixes NEXT_PUBLIC_FIREBASE_* sont également supportés de manière interchangeable.
```

> **Important** : Le paramètre indispensable pour la réception des données et événements dans Firebase Analytics est `FIREBASE_MEASUREMENT_ID` (format `G-XXXXXXXXXX`). Grâce à la configuration `next.config.ts`, les variables sont automatiquement injectées dans le bundle client lors du build sur Vercel.

---

## 2. Comment obtenir ces clés dans la console Firebase ?

1. Rendez-vous sur la [Console Firebase](https://console.firebase.google.com/).
2. Ouvrez ou créez votre projet.
3. Activez **Google Analytics** dans le menu latéral gauche (**Analytics**).
4. Cliquez sur la roue crantée ⚙️ en haut à gauche → **Paramètres du projet** (*Project settings*).
5. Dans l'onglet **Général**, faites défiler jusqu'à la section **Vos applications** (*Your apps*).
6. Si ce n'est pas déjà fait, cliquez sur l'icône Web `</>` pour ajouter une application Web (donnez-lui un surnom comme `ctokoffi-web`).
7. Sous **Configuration du SDK**, cochez **Config** : vous verrez s'afficher l'objet de configuration avec toutes les clés :
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `measurementId` → `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (commence par `G-`)

---

## 3. Ce qui est configuré et suivi sur l'ensemble du site

### A. Conformité RGPD & Consent Mode v2
- Tant que le visiteur n'a pas cliqué sur **Accepter**, aucun cookie ou traceur n'est envoyé (`analytics_storage: 'denied'`, `ad_storage: 'denied'`).
- Un bandeau clair permet d'accepter ou refuser en 1 clic.
- Un bouton flottant discret reste accessible en permanence pour changer ses préférences à tout moment.

### B. Changements de pages (Single Page Application / Next.js)
- Chaque navigation vers `/`, `/projets`, `/recherche`, `/journal`, `/a-propos`, `/contact` ou vers un article/projet individuel déclenche automatiquement un événement `page_view` sans double comptage.

### C. Défilement & Profondeur de lecture (Scroll Depth)
- Les paliers de traction sont suivis automatiquement : **25%**, **50%**, **75%**, **90%** et **100%**.
- Chaque palier n'est envoyé qu'une seule fois par page visitée.
- Événement envoyé : `scroll_depth` avec les paramètres `percent_scrolled` et `page_path`.

### D. Boutons, Liens et Tags d'interaction
Tous les éléments interactifs sont équipés de tags `data-analytics-*` ou capturés automatiquement :
- **Téléchargement du CV** : événement `cv_download` (clic sur le CV dans le hero, dans la section contact ou sur la page dédiée).
- **Prise de contact / Email** : événement `contact_click` (`mailto:`, email copié, téléphone).
- **Copie d'email** : événement `copy_email`.
- **Visite de projet** : `project_modal_open`, `case_study_click`, `project_external_visit` avec le nom et l'ID du projet.
- **Filtres de projets** : `filter_projects` (Tous, IA, Produit, Web3).
- **Publications scientifiques** : `research_view`, `zenodo_click`, `pdf_download`.
- **Partage d'articles** : `share_article` (copie de lien).
- **Accessibilité / Motion** : `motion_toggle` (active/désactive les animations 3D et transitions).
- **Liens sortants** : `outbound_click` (vers GitHub, LinkedIn, Zenodo, sites partenaires).
- **Soumissions de formulaire** : `form_submit`.

