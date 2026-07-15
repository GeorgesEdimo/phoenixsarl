"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'fr' | 'en'
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.partners': 'Partenaires',
    'nav.contact': 'Contact',
    'nav.shop': 'Boutique',
    
    // Hero
    'hero.title': 'Excellence & Innovation',
    'hero.subtitle': 'Votre partenaire multisectoriel de confiance pour les services, le commerce, la logistique et le transport',
    'hero.cta1': 'Découvrir nos services',
    'hero.cta2': 'Demander un devis',
    'hero.slogan': 'votre projet, notre expertise',
    'hero.cta_text': 'Contactez-nous dès aujourd\'hui pour découvrir comment nous pouvons vous aider à atteindre vos objectifs.',
    'hero.cta_title': 'Prêt à collaborer avec nous ?',
    'hero.badge': 'Excellence & Innovation',
    
    // About
    'about.title': 'À propos de nous',
    'about.subtitle': 'Une entreprise ambitieuse en pleine croissance',
    'about.description': 'Phoenix International SARL est une entreprise multisectorielle dynamique spécialisée dans la prestation de services, le commerce général, le négoce, la logistique et le transport, ainsi que la douane et le transit.',
    'about.mission': 'Notre mission',
    'about.mission_text': 'Offrir des solutions innovantes et de qualité supérieure à nos clients, en nous appuyant sur notre expertise multisectorielle et notre engagement envers l\'excellence.',
    'about.vision': 'Notre vision',
    'about.vision_text': 'Devenir le partenaire de référence pour les entreprises et organisations cherchant des solutions intégrées en Afrique et au-delà.',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Des solutions complètes pour tous vos besoins',
    'services.service1': 'Prestation de Services',
    'services.service1_desc': 'Services professionnels sur mesure adaptés à vos besoins spécifiques',
    'services.service2': 'Commerce Général',
    'services.service2_desc': 'Négoce et distribution de produits de qualité',
    'services.service3': 'Logistique & Transport',
    'services.service3_desc': 'Solutions de transport et de chaîne d\'approvisionnement efficaces',
    'services.service4': 'Douane & Transit',
    'services.service4_desc': 'Expertise en douane et transit pour faciliter vos opérations internationales',
    'services.image_alt': 'Nos Services en Action',
    'services.why_choose_bg_alt': 'Why Choose Us Background',
    
    // Partners
    'partners.title': 'Nos Partenaires',
    'partners.subtitle': 'Des collaborations stratégiques pour votre succès',
    'partners.aritma': 'ARITMA',
    'partners.aritma_desc': 'Partenaire stratégique dans le domaine social',
    'partners.ambassade': 'Ambassade du Cameroun en France',
    'partners.ambassade_desc': 'Partenariat institutionnel pour faciliter les échanges franco-camerounais',
    'partners.pilier': 'Le Pillier Ltd',
    'partners.pilier_desc': 'Projets durables et développement responsable',
    'partners.image_alt': 'Nos Partenaires Stratégiques',
    'partners.benefits_bg_alt': 'Partnership Benefits Background',
    
    // Online Store
    'store.title': 'Boutique en Ligne',
    'store.subtitle': 'Bientôt disponible',
    'store.description': 'Nous préparons une plateforme e-commerce pour vous offrir nos services et produits en ligne. Restez informés !',
    'store.cta': 'Être notifié du lancement',
    'store.notification_title': 'Soyez notifié du lancement',
    'store.notification_text': 'Inscrivez-vous pour recevoir une notification lorsque notre boutique sera en ligne',
    'store.image_alt': 'Notre Boutique en Ligne',
    'store.email_placeholder': 'votre@email.com',
    'store.hero_alt': 'Shop Hero Background',
    'store.badge': 'Bientôt disponible',
    'store.notification_bg_alt': 'Notification Background',
    'store.expect_bg_alt': 'What to Expect Background',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes à votre écoute',
    'contact.name': 'Nom complet',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le message',
    'contact.address': 'Adresse',
    'contact.phone_label': 'Téléphone',
    'contact.email_label': 'Email',
    'contact.service': 'Service souhaité',
    'contact.service_placeholder': 'Sélectionnez un service',
    'contact.service_option_services': 'Prestation de Services',
    'contact.service_option_commerce': 'Commerce Général',
    'contact.service_option_logistics': 'Logistique & Transport',
    'contact.service_option_customs': 'Douane & Transit',
    'contact.service_option_quote': 'Demande de devis',
    'contact.service_option_other': 'Autre demande',
    'contact.message_placeholder': 'Décrivez votre projet ou votre demande...',
    'contact.success_message': 'Merci pour votre message ! Nous vous répondrons bientôt.',
    'contact.email_placeholder': 'votre@email.com',
    'contact.phone_placeholder': '+237 600 000 000',
    'contact.name_placeholder': 'Votre nom complet',
    'contact.info_title': 'Informations de contact',
    'contact.address_value': 'Yaoundé, Rue 4.771, Cameroun',
    'contact.phone_value': '+237 693 674 211 / +237 675 385 034',
    'contact.email_value': 'phoenixinternationalsarl2@gmail.com',
    'contact.map_title': 'Carte Phoenix International SARL - Yaoundé',
    'contact.hours_label': 'Heures d\'ouverture',
    'contact.hours_value': 'Lun - Ven: 8h00 - 18h00',
    'contact.quick_response_title': 'Réponse rapide',
    'contact.quick_response_text': 'Nous nous engageons à répondre à toutes les demandes dans un délai de 24 à 48 heures ouvrées.',
    'contact.image_alt': 'Contactez-Nous',
    'contact.form_title': 'Envoyez-nous un message',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.company': 'Phoenix International SARL',
    'footer.company_name': 'Phoenix International',
    'footer.company_type': 'SARL',
    'hero.carousel_alt': 'Phoenix International SARL',
    'hero.store_teaser_alt': 'Store Teaser Background',
    
    // Chat Widget
    'chat.maximize': 'Agrandir',
    'chat.minimize': 'Réduire',
    'chat.close': 'Fermer',
    'chat.send': 'Envoyer',
    'chat.placeholder': 'Tapez votre message...',
    'chat.typing': 'En train d\'écrire...',
    'chat.online': 'En ligne 24h/24',
    'chat.open': 'Ouvrir le chat',
    'chat.suggested1': 'Quels services proposez-vous ?',
    'chat.suggested2': 'Comment vous contacter ?',
    'chat.suggested3': 'Quels sont vos tarifs ?',
    'chat.suggested4': 'Où êtes-vous situé ?',
    
    // Image Carousel
    'carousel.previous': 'Diapositive précédente',
    'carousel.next': 'Diapositive suivante',
    'carousel.alt': 'Image du carrousel',
    
    // Header
    'header.logo_alt': 'Phoenix International SARL',
    'header.toggle_theme': 'Changer de thème',
    'header.company_name': 'Phoenix International',
    'header.company_type': 'SARL',
    
    // Cookie Banner
    'cookie.title': 'Gestion des cookies',
    'cookie.description': 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez choisir lesquels accepter.',
    'cookie.necessary': 'Cookies nécessaires',
    'cookie.necessary_desc': 'Essentiels au fonctionnement du site',
    'cookie.analytics': 'Cookies analytiques',
    'cookie.analytics_desc': 'Pour améliorer nos services',
    'cookie.marketing': 'Cookies marketing',
    'cookie.marketing_desc': 'Pour personnaliser votre expérience',
    'cookie.reject_all': 'Refuser tout',
    'cookie.save': 'Enregistrer',
    'cookie.accept_all': 'Tout accepter',
    
    // Metadata
    'meta.title': 'Phoenix International SARL - Services, Commerce, Logistique & Transport',
    'meta.description': 'Phoenix International SARL est une entreprise multisectorielle spécialisée dans la prestation de services, le commerce général, le négoce, la logistique et le transport, ainsi que la douane et le transit.',
    
    // CTA
    'cta.learn_more': 'En savoir plus',
    'cta.contact_us': 'Nous contacter',

    // Stats
    'stats.clients': 'Clients satisfaits',
    'stats.projects': 'Projets réalisés',
    'stats.partners': 'Partenaires',
    'stats.countries': 'Pays desservis',

    // Values
    'values.title': 'Nos Valeurs',
    'values.excellence': 'Excellence',
    'values.excellence_desc': 'Nous nous engageons à fournir des services de la plus haute qualité',
    'values.innovation': 'Innovation',
    'values.innovation_desc': 'Nous adoptons constamment de nouvelles approches et technologies',
    'values.integrity': 'Intégrité',
    'values.integrity_desc': 'Nous opérons avec transparence et honnêteté dans toutes nos relations',
    'values.collaboration': 'Collaboration',
    'values.collaboration_desc': 'Nous croyons au pouvoir du partenariat et du travail d\'équipe',

    // Why Choose Us
    'why.title': 'Pourquoi nous choisir',
    'why.experience': 'Expérience',
    'why.experience_desc': 'Des années d\'expertise dans divers secteurs',
    'why.quality': 'Qualité',
    'why.quality_desc': 'Standards de qualité supérieure dans tous nos services',
    'why.support': 'Support',
    'why.support_desc': 'Assistance client dédiée et réactive',
    'why.flexibility': 'Flexibilité',
    'why.flexibility_desc': 'Solutions adaptées à vos besoins spécifiques',

    // Partnership Benefits
    'partnership.title': 'Avantages du partenariat',
    'partnership.growth': 'Croissance mutuelle',
    'partnership.growth_desc': 'Opportunités de développement conjoint',
    'partnership.network': 'Réseau étendu',
    'partnership.network_desc': 'Accès à notre réseau de partenaires et clients',
    'partnership.expertise': 'Expertise partagée',
    'partnership.expertise_desc': 'Échange de connaissances et de meilleures pratiques',
    'partnership.visibility': 'Visibilité',
    'partnership.visibility_desc': 'Augmentation de votre visibilité sur nos plateformes',

    // Shop Features
    'shop.feature1': 'Large catalogue de produits',
    'shop.feature1_desc': 'Une sélection variée de produits de qualité pour répondre à vos besoins',
    'shop.feature2': 'Livraison rapide',
    'shop.feature2_desc': 'Livraison fiable et rapide partout au Cameroun et à l\'international',
    'shop.feature3': 'Paiements sécurisés',
    'shop.feature3_desc': 'Moyens de paiement sécurisés et protection de vos données',
    'shop.feature4': 'Services en ligne',
    'shop.feature4_desc': 'Accès à nos services professionnels directement depuis la plateforme',

    // Shop Categories
    'shop.category1': 'Services Professionnels',
    'shop.category1_items': 'Consulting, Formation, Support technique, Gestion de projet',
    'shop.category2': 'Produits',
    'shop.category2_items': 'Équipements, Fournitures, Technologie, Matériaux',
    'shop.category3': 'Solutions Logistiques',
    'shop.category3_items': 'Transport, Entreposage, Douane, Transit',

    // Shop CTA
    'shop.cta_title': 'Besoin de services maintenant ?',
    'shop.cta_desc': 'Notre boutique est en préparation, mais nos services sont déjà disponibles. Contactez-nous !',
    'shop.cta_discover': 'Découvrir nos services',

    // Services Benefits
    'services.benefit1': 'Expertise multisectorielle',
    'services.benefit1_desc': 'Une connaissance approfondie de plusieurs domaines pour des solutions intégrées',
    'services.benefit2': 'Approche client centrée',
    'services.benefit2_desc': 'Chaque projet est unique et mérite une attention personnalisée',
    'services.benefit3': 'Réseau international',
    'services.benefit3_desc': 'Des partenaires stratégiques pour faciliter vos opérations à l\'échelle mondiale',
    'services.benefit4': 'Engagement qualité',
    'services.benefit4_desc': 'Des standards élevés pour garantir votre satisfaction',
    'services.why_title': 'Pourquoi nous choisir ?',
    'services.why_subtitle': 'Des avantages qui font la différence',
    'services.cta_title': 'Besoin de nos services ?',
    'services.cta_desc': 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.',

    // Partners Benefits
    'partners.benefit1': 'Expertise partagée',
    'partners.benefit1_desc': 'Accès à des compétences complémentaires et à une expertise sectorielle approfondie',
    'partners.benefit2': 'Réseau étendu',
    'partners.benefit2_desc': 'Connexion à un réseau international de partenaires et d\'opportunités',
    'partners.benefit3': 'Innovation conjointe',
    'partners.benefit3_desc': 'Développement de solutions innovantes grâce à la collaboration',
    'partners.benefit4': 'Croissance mutuelle',
    'partners.benefit4_desc': 'Opportunités de croissance et de développement pour tous les partenaires',
    'partners.benefits_title': 'Avantages de nos partenariats',
    'partners.benefits_subtitle': 'Des collaborations stratégiques pour créer de la valeur',
    'partners.cta_title': 'Intéressé par un partenariat ?',
    'partners.cta_desc': 'Nous sommes toujours ouverts à de nouvelles collaborations stratégiques.',

    // About Values
    'about.value1': 'Excellence',
    'about.value1_desc': 'Nous nous engageons à fournir des services de la plus haute qualité',
    'about.value2': 'Intégrité',
    'about.value2_desc': 'La transparence et l\'honnêteté sont au cœur de nos relations',
    'about.value3': 'Innovation',
    'about.value3_desc': 'Nous innovons constamment pour mieux servir nos clients',
    'about.values_title': 'Nos Valeurs',
    'about.values_subtitle': 'Les principes qui guident notre action chaque jour',
    'about.stat1': 'Années d\'expérience',
    'about.stat2': 'Clients satisfaits',
    'about.stat3': 'Secteurs d\'activité',
    'about.stat4': 'Partenaires stratégiques',
    'about.stat1_number': '5+',
    'about.stat2_number': '50+',
    'about.stat3_number': '4',
    'about.stat4_number': '3',
    'about.legal_title': 'Informations Légales',
    'about.rccm_label': 'RCCM',
    'about.niu_label': 'NIU',
    'about.stats_bg_alt': 'Stats Background',
    'about.hero_alt': 'À propos de Phoenix International SARL',
    'about.values_bg_alt': 'Values Section Background',
    'about.rccm_value': 'CM-NSI-02-2026-B-00563',
    'about.niu_value': 'M0326618478819G',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.partners': 'Partners',
    'nav.contact': 'Contact',
    'nav.shop': 'Shop',
    
    // Hero
    'hero.title': 'Excellence & Innovation',
    'hero.subtitle': 'Your trusted multisector partner for services, trade, logistics, and transportation',
    'hero.cta1': 'Discover our services',
    'hero.cta2': 'Request a quote',
    'hero.slogan': 'your project, our expertise',
    'hero.cta_text': 'Contact us today to discover how we can help you achieve your goals.',
    'hero.cta_title': 'Ready to collaborate with us?',
    'hero.badge': 'Excellence & Innovation',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'An ambitious company in full growth',
    'about.description': 'Phoenix International SARL is a dynamic multisector company specializing in service provision, general trade, commerce, logistics and transportation, as well as customs and transit.',
    'about.mission': 'Our Mission',
    'about.mission_text': 'To offer innovative and superior quality solutions to our clients, leveraging our multisector expertise and commitment to excellence.',
    'about.vision': 'Our Vision',
    'about.vision_text': 'To become the reference partner for companies and organizations seeking integrated solutions in Africa and beyond.',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Complete solutions for all your needs',
    'services.service1': 'Service Provision',
    'services.service1_desc': 'Professional customized services tailored to your specific needs',
    'services.service2': 'General Trade',
    'services.service2_desc': 'Trading and distribution of quality products',
    'services.service3': 'Logistics & Transportation',
    'services.service3_desc': 'Efficient transportation and supply chain solutions',
    'services.service4': 'Customs & Transit',
    'services.service4_desc': 'Customs and transit expertise to facilitate your international operations',
    'services.image_alt': 'Our Services in Action',
    'services.why_choose_bg_alt': 'Why Choose Us Background',
    
    // Partners
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Strategic collaborations for your success',
    'partners.aritma': 'ARITMA',
    'partners.aritma_desc': 'Strategic partner in the social domain',
    'partners.ambassade': 'Embassy of Cameroon in France',
    'partners.ambassade_desc': 'Institutional partnership to facilitate Franco-Cameroonian exchanges',
    'partners.pilier': 'Le Pillier Ltd',
    'partners.pilier_desc': 'Sustainable projects and responsible development',
    'partners.image_alt': 'Our Strategic Partners',
    'partners.benefits_bg_alt': 'Partnership Benefits Background',
    
    // Online Store
    'store.title': 'Online Store',
    'store.subtitle': 'Coming Soon',
    'store.description': 'We are preparing an e-commerce platform to offer you our services and products online. Stay informed!',
    'store.cta': 'Get notified of launch',
    'store.notification_title': 'Get notified of launch',
    'store.notification_text': 'Sign up to receive a notification when our store goes online',
    'store.image_alt': 'Our Online Store',
    'store.email_placeholder': 'your@email.com',
    'store.hero_alt': 'Shop Hero Background',
    'store.badge': 'Coming Soon',
    'store.notification_bg_alt': 'Notification Background',
    'store.expect_bg_alt': 'What to Expect Background',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to listen',
    'contact.name': 'Full Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.address': 'Address',
    'contact.phone_label': 'Phone',
    'contact.email_label': 'Email',
    'contact.service': 'Service required',
    'contact.service_placeholder': 'Select a service',
    'contact.service_option_services': 'Service Provision',
    'contact.service_option_commerce': 'General Trade',
    'contact.service_option_logistics': 'Logistics & Transportation',
    'contact.service_option_customs': 'Customs & Transit',
    'contact.service_option_quote': 'Request a quote',
    'contact.service_option_other': 'Other request',
    'contact.message_placeholder': 'Describe your project or request...',
    'contact.success_message': 'Thank you for your message! We will respond to you soon.',
    'contact.email_placeholder': 'your@email.com',
    'contact.phone_placeholder': '+237 600 000 000',
    'contact.name_placeholder': 'Your full name',
    'contact.info_title': 'Contact Information',
    'contact.address_value': 'Yaoundé, Rue 4.771, Cameroon',
    'contact.phone_value': '+237 693 674 211 / +237 675 385 034',
    'contact.email_value': 'phoenixinternationalsarl2@gmail.com',
    'contact.map_title': 'Phoenix International SARL Map - Yaoundé',
    'contact.hours_label': 'Opening Hours',
    'contact.hours_value': 'Mon - Fri: 8:00 AM - 6:00 PM',
    'contact.quick_response_title': 'Quick Response',
    'contact.quick_response_text': 'We commit to responding to all inquiries within 24 to 48 business hours.',
    'contact.image_alt': 'Contact Us',
    'contact.form_title': 'Send us a message',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.company': 'Phoenix International SARL',
    'footer.company_name': 'Phoenix International',
    'footer.company_type': 'SARL',
    'hero.carousel_alt': 'Phoenix International SARL',
    'hero.store_teaser_alt': 'Store Teaser Background',
    
    // Chat Widget
    'chat.maximize': 'Maximize',
    'chat.minimize': 'Minimize',
    'chat.close': 'Close',
    'chat.send': 'Send',
    'chat.placeholder': 'Type your message...',
    'chat.typing': 'Typing...',
    'chat.online': 'Online 24/7',
    'chat.open': 'Open chat',
    'chat.suggested1': 'What services do you offer?',
    'chat.suggested2': 'How can I contact you?',
    'chat.suggested3': 'What are your rates?',
    'chat.suggested4': 'Where are you located?',
    
    // Image Carousel
    'carousel.previous': 'Previous slide',
    'carousel.next': 'Next slide',
    'carousel.alt': 'Carousel image',
    
    // Header
    'header.logo_alt': 'Phoenix International SARL',
    'header.toggle_theme': 'Toggle theme',
    'header.company_name': 'Phoenix International',
    'header.company_type': 'SARL',
    
    // Cookie Banner
    'cookie.title': 'Cookie Management',
    'cookie.description': 'We use cookies to improve your experience on our site. You can choose which ones to accept.',
    'cookie.necessary': 'Necessary cookies',
    'cookie.necessary_desc': 'Essential for the site to function',
    'cookie.analytics': 'Analytics cookies',
    'cookie.analytics_desc': 'To improve our services',
    'cookie.marketing': 'Marketing cookies',
    'cookie.marketing_desc': 'To personalize your experience',
    'cookie.reject_all': 'Reject all',
    'cookie.save': 'Save',
    'cookie.accept_all': 'Accept all',
    
    // Metadata
    'meta.title': 'Phoenix International SARL - Services, Commerce, Logistics & Transport',
    'meta.description': 'Phoenix International SARL is a multi-sector company specializing in service provision, general trade, brokerage, logistics and transport, as well as customs and transit.',
    
    // CTA
    'cta.learn_more': 'Learn more',
    'cta.contact_us': 'Contact us',

    // Stats
    'stats.clients': 'Satisfied clients',
    'stats.projects': 'Projects completed',
    'stats.partners': 'Partners',
    'stats.countries': 'Countries served',

    // Values
    'values.title': 'Our Values',
    'values.excellence': 'Excellence',
    'values.excellence_desc': 'We are committed to providing the highest quality services',
    'values.innovation': 'Innovation',
    'values.innovation_desc': 'We constantly adopt new approaches and technologies',
    'values.integrity': 'Integrity',
    'values.integrity_desc': 'We operate with transparency and honesty in all our relationships',
    'values.collaboration': 'Collaboration',
    'values.collaboration_desc': 'We believe in the power of partnership and teamwork',

    // Why Choose Us
    'why.title': 'Why Choose Us',
    'why.experience': 'Experience',
    'why.experience_desc': 'Years of expertise in various sectors',
    'why.quality': 'Quality',
    'why.quality_desc': 'Superior quality standards in all our services',
    'why.support': 'Support',
    'why.support_desc': 'Dedicated and responsive customer assistance',
    'why.flexibility': 'Flexibility',
    'why.flexibility_desc': 'Solutions tailored to your specific needs',

    // Partnership Benefits
    'partnership.title': 'Partnership Benefits',
    'partnership.growth': 'Mutual Growth',
    'partnership.growth_desc': 'Opportunities for joint development',
    'partnership.network': 'Extended Network',
    'partnership.network_desc': 'Access to our network of partners and clients',
    'partnership.expertise': 'Shared Expertise',
    'partnership.expertise_desc': 'Exchange of knowledge and best practices',
    'partnership.visibility': 'Visibility',
    'partnership.visibility_desc': 'Increased visibility on our platforms',

    // Shop Features
    'shop.feature1': 'Large product catalog',
    'shop.feature1_desc': 'A varied selection of quality products to meet your needs',
    'shop.feature2': 'Fast delivery',
    'shop.feature2_desc': 'Reliable and fast delivery throughout Cameroon and internationally',
    'shop.feature3': 'Secure payments',
    'shop.feature3_desc': 'Secure payment methods and data protection',
    'shop.feature4': 'Online services',
    'shop.feature4_desc': 'Access to our professional services directly from the platform',

    // Shop Categories
    'shop.category1': 'Professional Services',
    'shop.category1_items': 'Consulting, Training, Technical Support, Project Management',
    'shop.category2': 'Products',
    'shop.category2_items': 'Equipment, Supplies, Technology, Materials',
    'shop.category3': 'Logistics Solutions',
    'shop.category3_items': 'Transport, Warehousing, Customs, Transit',

    // Shop CTA
    'shop.cta_title': 'Need services now?',
    'shop.cta_desc': 'Our store is in preparation, but our services are already available. Contact us!',
    'shop.cta_discover': 'Discover our services',

    // Services Benefits
    'services.benefit1': 'Multisector expertise',
    'services.benefit1_desc': 'In-depth knowledge of multiple domains for integrated solutions',
    'services.benefit2': 'Client-centered approach',
    'services.benefit2_desc': 'Each project is unique and deserves personalized attention',
    'services.benefit3': 'International network',
    'services.benefit3_desc': 'Strategic partners to facilitate your global operations',
    'services.benefit4': 'Quality commitment',
    'services.benefit4_desc': 'High standards to guarantee your satisfaction',
    'services.why_title': 'Why Choose Us?',
    'services.why_subtitle': 'Advantages that make the difference',
    'services.cta_title': 'Need our services?',
    'services.cta_desc': 'Contact us to discuss your project and discover how we can help you.',

    // Partners Benefits
    'partners.benefit1': 'Shared expertise',
    'partners.benefit1_desc': 'Access to complementary skills and deep sector expertise',
    'partners.benefit2': 'Extended network',
    'partners.benefit2_desc': 'Connection to an international network of partners and opportunities',
    'partners.benefit3': 'Joint innovation',
    'partners.benefit3_desc': 'Development of innovative solutions through collaboration',
    'partners.benefit4': 'Mutual growth',
    'partners.benefit4_desc': 'Growth and development opportunities for all partners',
    'partners.benefits_title': 'Partnership Benefits',
    'partners.benefits_subtitle': 'Strategic collaborations to create value',
    'partners.cta_title': 'Interested in a partnership?',
    'partners.cta_desc': 'We are always open to new strategic collaborations.',

    // About Values
    'about.value1': 'Excellence',
    'about.value1_desc': 'We are committed to providing the highest quality services',
    'about.value2': 'Integrity',
    'about.value2_desc': 'Transparency and honesty are at the heart of our relationships',
    'about.value3': 'Innovation',
    'about.value3_desc': 'We constantly innovate to better serve our clients',
    'about.values_title': 'Our Values',
    'about.values_subtitle': 'The principles that guide our actions every day',
    'about.stat1': 'Years of experience',
    'about.stat2': 'Satisfied clients',
    'about.stat3': 'Business sectors',
    'about.stat4': 'Strategic partners',
    'about.stat1_number': '5+',
    'about.stat2_number': '50+',
    'about.stat3_number': '4',
    'about.stat4_number': '3',
    'about.legal_title': 'Legal Information',
    'about.rccm_label': 'RCCM',
    'about.niu_label': 'NIU',
    'about.stats_bg_alt': 'Stats Background',
    'about.hero_alt': 'About Phoenix International SARL',
    'about.values_bg_alt': 'Values Section Background',
    'about.rccm_value': 'CM-NSI-02-2026-B-00563',
    'about.niu_value': 'M0326618478819G',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
