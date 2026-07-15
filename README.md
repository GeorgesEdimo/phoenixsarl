# Phoenix International SARL - Site Web

Site web professionnel et moderne pour Phoenix International SARL, une entreprise multisectorielle spécialisée dans la prestation de services, le commerce général, le négoce, la logistique et le transport, ainsi que la douane et le transit.

## 🚀 Fonctionnalités

- **Design Premium & Moderne**: Interface élégante, aérée et professionnelle
- **Multilingue**: Support français et anglais avec sélecteur de langue
- **Mode Sombre/Clair**: Basculement persistant entre les thèmes
- **Responsive**: Optimisé pour tous les appareils (mobile, tablette, desktop)
- **SEO Optimisé**: Structure optimisée pour les moteurs de recherche
- **Navigation Intuitive**: Menu clair avec liens vers toutes les sections
- **CTA Élégants**: Boutons d'appel à l'action stratégiquement placés
- **Pages Complètes**:
  - Accueil impactant
  - À propos
  - Services détaillés
  - Partenaires (ARITMA, Ambassade du Cameroun en France, LE PILIER)
  - Contact avec formulaire
  - Boutique en ligne (placeholder pour futur catalogue)

## 🛠️ Technologies

- **Next.js 14**: Framework React moderne avec App Router
- **TypeScript**: Typage statique pour la robustesse
- **TailwindCSS**: Framework CSS utilitaire pour le design
- **Lucide React**: Icônes modernes et élégantes
- **next-themes**: Gestion du thème clair/sombre
- **React Context**: Gestion de l'été pour la langue

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en production
npm start
```

## 📁 Structure du Projet

```
phoenixsarl/
├── app/
│   ├── about/          # Page À propos
│   ├── contact/        # Page Contact
│   ├── globals.css     # Styles globaux
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   ├── partners/       # Page Partenaires
│   ├── services/       # Page Services
│   └── shop/           # Page Boutique (placeholder)
├── components/
│   ├── footer.tsx      # Pied de page
│   ├── header.tsx      # En-tête avec navigation
│   ├── language-provider.tsx  # Contexte pour la langue
│   └── theme-provider.tsx     # Provider pour le thème
├── lib/
│   └── utils.ts        # Utilitaires
├── public/             # Assets statiques (logos, images)
└── ...                 # Configuration files
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.ts`:
- `primary`: Bleu principal (confiance, professionnalisme)
- `accent`: Orange/Or (chaleur, premium)

### Traductions
Les traductions sont gérées dans `components/language-provider.tsx`. Pour ajouter une nouvelle langue:
1. Ajouter la langue au type `Language`
2. Ajouter les traductions dans l'objet `translations`

### Thème
Le thème est géré par `next-themes` et persiste dans le localStorage.

## 🌐 Déploiement sur Vercel

### Étape 1 : Préparer le repository GitHub
1. Créer un nouveau repository sur GitHub
2. Initialiser git dans le projet :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/phoenixsarl.git
git push -u origin main
```

### Étape 2 : Déployer sur Vercel
1. Créer un compte sur [vercel.com](https://vercel.com)
2. Cliquer sur "Add New Project"
3. Importer le repository GitHub
4. Configurer les variables d'environnement dans Vercel :
   - `DATABASE_URL`: `file:./dev.db` (pour SQLite local)
5. Cliquer sur "Deploy"

### Étape 3 : Configurer le domaine personnalisé
1. Dans Vercel, aller dans Settings → Domains
2. Ajouter `phoenixinternational.com`
3. Vercel affichera les enregistrements DNS à configurer

### Étape 4 : Configurer les DNS LWS
1. Connectez-vous à votre panel LWS
2. Allez dans "Gestion DNS" pour phoenixinternational.com
3. Ajoutez les enregistrements suivants :
   - **Type A**: `@` → `76.76.21.21` (Vercel)
   - **Type CNAME**: `www` → `cname.vercel-dns.com`
4. Sauvegardez et attendez la propagation DNS (24-48h)

### Variables d'environnement
- `DATABASE_URL`: URL de connexion à la base de données
- `NODE_ENV`: `production` (automatique sur Vercel)

## 📞 Contact

Pour toute question ou modification, contactez l'équipe de Phoenix International SARL.

## 📄 Licence

© 2024 Phoenix International SARL. Tous droits réservés.

---
**Développé par Georges Edimo**  
Développeur Full Stack | Expert en React, Next.js, TypeScript  
Portfolio : https://georgesedimo.com
