"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, User, Sparkles } from 'lucide-react'
import { useLanguage } from './language-provider'

interface Message {
  id: number
  type: 'bot' | 'user'
  content: string
  time: Date
  intent?: string
}

interface ConversationContext {
  lastTopic: string
  questionCount: number
  userNeeds: string[]
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! 👋 Je suis l\'assistant IA de Phoenix International SARL. Je suis là pour vous aider avec nos services, tarifs, ou toute autre question. Comment puis-je vous assister aujourd\'hui ?',
      time: new Date(),
      intent: 'greeting'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState<ConversationContext>({
    lastTopic: '',
    questionCount: 0,
    userNeeds: []
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectIntent = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    const intents = {
      greeting: /^(bonjour|salut|hello|hi|hey|coucou|bonsoir)/i,
      services: /(service|offre|prestation|consulting|formation|support|gestion)/i,
      contact: /(contact|téléphone|email|joindre|appeler|téléphoner)/i,
      partners: /(partenaire|collaboration|alliance|aritma|ambassade|pilier)/i,
      about: /(à propos|mission|vision|qui|entreprise|phoenix|histoire)/i,
      pricing: /(prix|tarif|coût|devis|combien|cher|budget)/i,
      location: /(localisation|adresse|où|situé|trouver|yaoundé|cameroun)/i,
      shop: /(boutique|shop|achat|produit|commander|e-commerce)/i,
      values: /(valeur|principe|éthique|excellence|innovation|intégrité|collaboration)/i,
      why: /(pourquoi|avantage|choisir|raison|motif)/i,
      logistics: /(logistique|transport|livraison|expédition|douane|transit)/i,
      help: /(aide|help|assistance|support|question|info)/i,
      thanks: /(merci|thank|thanks|remercie)/i,
      goodbye: /(au revoir|bye|à bientôt|ciao|adieu)/i
    }

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(lowerInput)) {
        return intent
      }
    }

    return 'general'
  }

  const generateContextualResponse = (input: string, intent: string, currentContext: ConversationContext): string => {
    const lowerInput = input.toLowerCase()
    
    // Update context based on intent
    const updatedContext = {
      ...currentContext,
      lastTopic: intent !== 'general' ? intent : currentContext.lastTopic,
      questionCount: currentContext.questionCount + 1
    }
    setContext(updatedContext)

    // Contextual follow-up responses
    if (currentContext.lastTopic === 'pricing' && intent === 'pricing') {
      return 'Je comprends que vous souhaitez plus d\'informations sur nos tarifs. Comme je l\'ai mentionné, nos prix sont personnalisés. Pour vous donner une estimation précise, pourriez-vous me préciser :\n\n📋 Quel type de service vous intéresse ?\n📏 Quelle est l\'envergure de votre projet ?\n\nCela me permettra de vous orienter vers la meilleure solution.'
    }

    if (currentContext.lastTopic === 'services' && intent === 'services') {
      return 'Vous semblez intéressé par nos services. Pour mieux vous orienter, quel secteur d\'activité vous concerne le plus :\n\n🏢 Consulting & Formation\n📦 Commerce & Négoce\n🚚 Logistique & Transport\n📋 Douane & Transit\n\nJe peux vous donner plus de détails sur chacun d\'eux.'
    }

    // Intent-based responses
    switch (intent) {
      case 'greeting':
        return 'Ravi de vous accueillir ! 🌟 Je suis votre assistant IA dédié à Phoenix International SARL. Que puis-je faire pour vous aujourd\'hui ?\n\n💡 Vous pouvez me demander :\n- Nos services et solutions\n- Nos tarifs et devis\n- Nos coordonnées\n- Nos partenaires\n- Ou toute autre question !'

      case 'services':
        return 'Phoenix International SARL propose 4 piliers de services :\n\n🏢 **Prestation de Services**\n   • Consulting stratégique\n   • Formation professionnelle\n   • Support technique\n   • Gestion de projet\n\n📦 **Commerce Général**\n   • Négoce international\n   • Distribution de produits\n   • Sourcing qualité\n\n🚚 **Logistique & Transport**\n   • Transport national/international\n   • Chaîne d\'approvisionnement\n   • Gestion de stock\n\n📋 **Douane & Transit**\n   • Dédouanement\n   • Transit international\n   • Conformité réglementaire\n\n\n👉 Lequel de ces services vous intéresse le plus ?'

      case 'contact':
        return 'Voici toutes nos coordonnées pour nous contacter :\n\n📞 **Téléphone** : +237 693 674 211 / +237 675 385 034\n📧 **Email** : phoenixinternationalsarl2@gmail.com\n📍 **Adresse** : Yaoundé, Rue 4.771, Cameroun\n\n⏰ **Horaires** : Lundi - Vendredi, 8h00 - 18h00\n\n🌐 **Facebook** : Phoenix International SARL\n\n\n💡 Préférez-vous nous appeler directement ou envoyer un email pour une réponse écrite ?'

      case 'partners':
        return 'Nos partenariats stratégiques sont au cœur de notre réussite :\n\n🤝 **ARITMA**\n   Partenaire stratégique dans le domaine social\n\n🏛️ **Ambassade du Cameroun en France**\n   Partenariat institutionnel et facilité des échanges\n\n🌱 **Le Pillier Ltd**\n   Projets durables et développement responsable\n\n\n🎯 Ces partenariats nous permettent d\'offrir des solutions intégrées à l\'échelle internationale.\n\n\nSouhaitez-vous en savoir plus sur nos opportunités de partenariat ?'

      case 'about':
        return 'Phoenix International SARL en quelques mots :\n\n🏢 **Qui sommes-nous ?**\n   Entreprise multisectorielle dynamique basée à Yaoundé\n\n🎯 **Notre Mission**\n   Offrir des solutions innovantes et de qualité supérieure\n\n🌟 **Notre Vision**\n   Devenir le partenaire de référence en Afrique\n\n💎 **Nos Valeurs**\n   • Excellence\n   • Innovation\n   • Intégrité\n   • Collaboration\n\n\n📊 **Chiffres clés**\n   • 5+ années d\'expérience\n   • 50+ clients satisfaits\n   • 4 secteurs d\'activité\n   • 3 partenaires stratégiques\n\n\nQu\'aimeriez-vous savoir de plus sur nous ?'

      case 'pricing':
        return 'Nos tarifs sont personnalisés selon vos besoins spécifiques :\n\n💰 **Facteurs influençant le prix** :\n   • Type de service\n   • Complexité du projet\n   • Durée et envergure\n   • Délais requis\n\n📋 **Pour obtenir un devis gratuit** :\n   1️⃣ Remplissez notre formulaire de contact\n   2️⃣ Appelez-nous au +237 693 674 211 / +237 675 385 034\n   3️⃣ Envoyez un email à phoenixinternationalsarl2@gmail.com\n\n⚡ Notre équipe vous répond sous 24h maximum\n\n\nPourriez-vous me décrire votre projet pour une estimation plus précise ?'

      case 'location':
        return '📍 Notre implantation :\n\n**Siège Social**\n   Yaoundé, Rue 4.771, Cameroun\n\n**Zone desservie** :\n   🇨🇲 National : Tout le Cameroun\n   🌍 International : Afrique et au-delà\n\n**Accessibilité** :\n   • Bureau facilement accessible\n   • Parking disponible\n   • Sur rendez-vous\n\n\n🚗 Vous souhaitez nous rendre visite ? Je peux vous aider à prendre rendez-vous.'

      case 'shop':
        return '🛒 **Notre boutique en ligne - Bientôt disponible !**\n\n**Ce que vous y trouverez** :\n   • Services professionnels en ligne\n   • Produits de qualité\n   • Solutions logistiques\n   • Paiements sécurisés\n\n🔔 **Inscription**\n   Inscrivez-vous pour être notifié du lancement officiel\n\n⏰ **Statut actuel**\n   En préparation - Lancement prévu prochainement\n\n\nEn attendant, vous pouvez :\n   ✅ Nous contacter pour commander nos services\n   ✅ Demander un devis personnalisé\n\n\nVoulez-vous que je vous inscrive à la notification de lancement ?'

      case 'values':
        return 'Nos 4 valeurs fondamentales qui guident chaque action :\n\n✨ **Excellence**\n   Engagement qualité dans tous nos services\n\n🚀 **Innovation**\n   Adoption constante de nouvelles technologies\n\n⚖️ **Intégrité**\n   Transparence et honnêteté absolues\n\n🤝 **Collaboration**\n   Esprit d\'équipe et partenariat fort\n\n\n💡 Ces valeurs ne sont pas juste des mots - elles sont au cœur de notre culture d\'entreprise et de nos relations clients.\n\n\nLaquelle de ces valeurs résonne le plus avec vos attentes ?'

      case 'why':
        return 'Pourquoi choisir Phoenix International SARL ?\n\n✅ **Expertise**\n   Années d\'expérience multisectorielle\n\n✅ **Qualité**\n   Standards supérieurs garantis\n\n✅ **Support**\n   Assistance dédiée et réactive 24/7\n\n✅ **Flexibilité**\n   Solutions 100% personnalisées\n\n✅ **Réseau**\n   Partenaires internationaux\n\n✅ **Innovation**\n   Approche moderne et technologique\n\n\n🎯 Notre promesse : Votre satisfaction est notre priorité absolue\n\n\nQuel aspect est le plus important pour vous dans le choix d\'un partenaire ?'

      case 'logistics':
        return 'Nos solutions logistiques complètes :\n\n🚚 **Transport**\n   • National et international\n   • Fret routier, maritime, aérien\n   • Livraison express\n\n📦 **Gestion de stock**\n   • Entreposage sécurisé\n   • Tracking en temps réel\n   • Gestion des inventaires\n\n📋 **Douane & Transit**\n   • Dédouanement rapide\n   • Conformité réglementaire\n   • Documentation complète\n\n\n🌍 Nous desservons :\n   • Tout le Cameroun\n   • Pays d\'Afrique centrale\n   • International (sur demande)\n\n\nBesoin d\'un devis logistique spécifique ?'

      case 'help':
        return 'Je suis là pour vous aider ! Voici ce que je peux faire :\n\n📋 **Informations**\n   • Services et solutions\n   • Tarifs et devis\n   • Coordonnées\n   • Partenaires\n\n💡 **Assistance**\n   • Répondre à vos questions\n   • Orienter vers le bon service\n   • Aider à la prise de décision\n\n🔗 **Navigation**\n   • Vous guider sur le site\n   • Expliquer nos processus\n\n\n❓ Posez-moi n\'importe quelle question, je ferai de mon mieux pour vous aider !'

      case 'thanks':
        return 'Je vous en prie ! 😊\n\nC\'est un plaisir de vous aider. N\'hésitez pas si vous avez d\'autres questions.\n\n🌟 Phoenix International SARL est là pour vous accompagner dans tous vos projets.\n\nY a-t-il autre chose que je puisse faire pour vous ?'

      case 'goodbye':
        return 'Au revoir ! 👋\n\nMerci d\'avoir échangé avec moi. N\'hésitez pas à revenir si vous avez d\'autres questions.\n\n📞 Pour nous contacter : +237 693 674 211 / +237 675 385 034\n📧 Email : phoenixinternationalsarl2@gmail.com\n\n\nBonne journée et à bientôt chez Phoenix International SARL ! 🌟'

      default:
        return 'Merci pour votre message ! 😊\n\nJe suis l\'assistant IA de Phoenix International SARL. Je peux vous aider avec :\n\n📋 Nos services et solutions\n💰 Nos tarifs et devis\n📞 Nos coordonnées\n🤝 Nos partenaires\n🏢 Notre entreprise\n📍 Notre localisation\n\n\nPour une assistance plus personnalisée, n\'hésitez pas à :\n📞 Nous appeler au +237 693 674 211 / +237 675 385 034\n📧 Nous écrire à phoenixinternationalsarl2@gmail.com\n📝 Remplir notre formulaire de contact\n\n\n💡 Ou reformulez votre question, je ferai de mon mieux pour comprendre !'
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const intent = detectIntent(inputValue)
    
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      time: new Date(),
      intent
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    const thinkingTime = Math.random() * 1000 + 1000 // 1-2 seconds

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: generateContextualResponse(inputValue, intent, context),
        time: new Date(),
        intent
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, thinkingTime)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    t('chat.suggested1'),
    t('chat.suggested2'),
    t('chat.suggested3'),
    t('chat.suggested4')
  ]

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 flex items-center justify-center group animate-bounce"
          aria-label={t('chat.open')}
        >
          <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-800 overflow-hidden transition-all flex flex-col ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white flex items-center space-x-2">
                  <span>Assistant IA</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">PRO</span>
                </h3>
                <p className="text-xs text-white/80 flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-1 ${isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
                  {isTyping ? t('chat.typing') : t('chat.online')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? t('chat.maximize') : t('chat.minimize')}
              >
                {isMinimized ? <Maximize2 className="h-5 w-5 text-white" /> : <Minimize2 className="h-5 w-5 text-white" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={t('chat.close')}
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' 
                        ? 'bg-gradient-to-br from-primary-500 to-accent-500' 
                        : 'bg-gradient-to-br from-sky-500 to-sky-600'
                    }`}>
                      {message.type === 'bot' ? (
                        <Sparkles className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[75%] ${
                      message.type === 'bot'
                        ? 'bg-white dark:bg-gray-700'
                        : 'bg-gradient-to-r from-primary-500 to-accent-500'
                    } rounded-2xl p-3 shadow-md`}>
                      <p className={`text-sm whitespace-pre-line ${
                        message.type === 'bot'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-white'
                      }`}>
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'bot'
                          ? 'text-gray-500 dark:text-gray-400'
                          : 'text-white/80'
                      }`}>
                        {message.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-500 to-accent-500">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl p-3 shadow-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Questions suggérées :</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-500 dark:hover:border-primary-500 transition-all"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-primary-200 dark:border-primary-800 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('chat.placeholder')}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={t('chat.send')}
                  >
                    <Send className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
