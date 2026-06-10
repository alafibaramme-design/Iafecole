/* ===================================
   IAFECOLE - SCRIPT.JS
   Plateforme Éducative Universitaire
   Fonctionnalités JavaScript Avancées
   ==================================== */

// ===== SÉCURITÉ ET PROTECTION =====
// Désactiver le clic droit
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('⚠️ Les documents sont protégés. Le clic droit est désactivé.', 'warning');
    return false;
});

// Désactiver la sélection de texte
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Bloquer les raccourcis clavier courants
document.addEventListener('keydown', function(e) {
    // F12 (Outils de développement)
    if (e.key === 'F12') {
        e.preventDefault();
        showNotification('⚠️ Les outils de développement sont bloqués.', 'warning');
        return false;
    }
    // Ctrl+U (Voir le code source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showNotification('⚠️ L\'affichage du code source est bloqué.', 'warning');
        return false;
    }
    // Ctrl+Shift+I (Inspecter)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showNotification('⚠️ L\'inspection d\'éléments est bloquée.', 'warning');
        return false;
    }
    // Ctrl+Shift+C (Inspecter par sélection)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showNotification('⚠️ L\'inspection d\'éléments est bloquée.', 'warning');
        return false;
    }
});

// ===== BASE DE DONNÉES DOCUMENTS =====
const documents = {
    'session1': {
        'dessin-technique-1': [
            { id: 1, name: 'Cours Dessin Technique 1', type: 'Cours', pages: 45, image: '📐' },
            { id: 2, name: 'TD Dessin Technique 1', type: 'TD', pages: 25, image: '📐' },
            { id: 3, name: 'Contrôles Continus DT1', type: 'Contrôle', pages: 15, image: '📐' },
            { id: 4, name: 'Examen DT1 Session 1', type: 'Examen', pages: 8, image: '📐' },
            { id: 5, name: 'Livre Dessin Technique', type: 'Livre', pages: 250, image: '📚' },
            { id: 6, name: 'Corrigés DT1', type: 'Corrigé', pages: 30, image: '✓' }
        ],
        'thermodynamique': [
            { id: 7, name: 'Cours Thermodynamique', type: 'Cours', pages: 60, image: '🔥' },
            { id: 8, name: 'TD Thermodynamique', type: 'TD', pages: 35, image: '🔥' },
            { id: 9, name: 'Examens Thermodynamique', type: 'Examen', pages: 20, image: '🔥' },
            { id: 10, name: 'Livre Thermodynamique Avancée', type: 'Livre', pages: 320, image: '📚' }
        ],
        'analyse-1': [
            { id: 11, name: 'Cours Analyse 1', type: 'Cours', pages: 80, image: '📊' },
            { id: 12, name: 'TD Analyse 1', type: 'TD', pages: 50, image: '📊' },
            { id: 13, name: 'Problèmes Analyse 1', type: 'Problème', pages: 40, image: '📊' },
            { id: 14, name: 'Corrigés Analyse 1', type: 'Corrigé', pages: 60, image: '✓' }
        ],
        'algebre': [
            { id: 15, name: 'Cours Algèbre', type: 'Cours', pages: 70, image: '✖️' },
            { id: 16, name: 'TD Algèbre', type: 'TD', pages: 45, image: '✖️' },
            { id: 17, name: 'Examen Algèbre', type: 'Examen', pages: 12, image: '✖️' }
        ],
        'mecanique': [
            { id: 18, name: 'Cours Mécanique Classique', type: 'Cours', pages: 75, image: '⚙️' },
            { id: 19, name: 'TD Mécanique', type: 'TD', pages: 48, image: '⚙️' },
            { id: 20, name: 'Livre Mécanique Théorique', type: 'Livre', pages: 400, image: '📚' }
        ],
        'electricite': [
            { id: 21, name: 'Cours Électricité', type: 'Cours', pages: 65, image: '⚡' },
            { id: 22, name: 'TD Électricité', type: 'TD', pages: 40, image: '⚡' },
            { id: 23, name: 'Laboratoire Électricité', type: 'Pratique', pages: 35, image: '⚡' }
        ],
        'technologie-base': [
            { id: 24, name: 'Cours Technologie de Base', type: 'Cours', pages: 50, image: '🔧' },
            { id: 25, name: 'TD Technologie', type: 'TD', pages: 30, image: '🔧' }
        ],
        'chimie-generale': [
            { id: 26, name: 'Cours Chimie Générale', type: 'Cours', pages: 72, image: '🧪' },
            { id: 27, name: 'TD Chimie Générale', type: 'TD', pages: 42, image: '🧪' },
            { id: 28, name: 'Livre Chimie Générale', type: 'Livre', pages: 350, image: '📚' }
        ],
        'geologie': [
            { id: 29, name: 'Cours Géologie', type: 'Cours', pages: 55, image: '🪨' },
            { id: 30, name: 'TD Géologie', type: 'TD', pages: 32, image: '🪨' }
        ],
        'technique-expression': [
            { id: 31, name: 'Cours Technique d\'Expression', type: 'Cours', pages: 40, image: '📝' },
            { id: 32, name: 'Exercices Expression', type: 'Exercice', pages: 28, image: '📝' }
        ],
        'anglais-1': [
            { id: 33, name: 'Cours Anglais 1', type: 'Cours', pages: 60, image: '🌍' },
            { id: 34, name: 'Exercices Anglais', type: 'Exercice', pages: 50, image: '🌍' }
        ],
        'informatique-1': [
            { id: 35, name: 'Cours Informatique 1', type: 'Cours', pages: 85, image: '💻' },
            { id: 36, name: 'TP Informatique', type: 'Pratique', pages: 60, image: '💻' },
            { id: 37, name: 'Livre Programmation', type: 'Livre', pages: 400, image: '📚' }
        ]
    },
    'session2': {
        'mecanique-rationnelle': [
            { id: 38, name: 'Cours Mécanique Rationnelle', type: 'Cours', pages: 90, image: '⚙️' },
            { id: 39, name: 'TD Mécanique Rationnelle', type: 'TD', pages: 55, image: '⚙️' }
        ],
        'mecanique-fluides': [
            { id: 40, name: 'Cours Mécanique des Fluides', type: 'Cours', pages: 80, image: '💧' },
            { id: 41, name: 'TD Mécanique des Fluides', type: 'TD', pages: 50, image: '💧' }
        ],
        'dessin-technique-2': [
            { id: 42, name: 'Cours Dessin Technique 2', type: 'Cours', pages: 50, image: '📐' },
            { id: 43, name: 'TD Dessin Technique 2', type: 'TD', pages: 35, image: '📐' }
        ],
        'physique-atomique': [
            { id: 44, name: 'Cours Physique Atomique', type: 'Cours', pages: 70, image: '⚛️' },
            { id: 45, name: 'TD Physique Atomique', type: 'TD', pages: 42, image: '⚛️' }
        ],
        'anglais-2': [
            { id: 46, name: 'Cours Anglais 2', type: 'Cours', pages: 65, image: '🌍' },
            { id: 47, name: 'Exercices Anglais 2', type: 'Exercice', pages: 55, image: '🌍' }
        ],
        'resistance-materiaux': [
            { id: 48, name: 'Cours Résistance des Matériaux', type: 'Cours', pages: 75, image: '💪' },
            { id: 49, name: 'TD Résistance des Matériaux', type: 'TD', pages: 48, image: '💪' }
        ],
        'chimie-organique': [
            { id: 50, name: 'Cours Chimie Organique', type: 'Cours', pages: 85, image: '🧬' },
            { id: 51, name: 'TD Chimie Organique', type: 'TD', pages: 55, image: '🧬' }
        ],
        'optique': [
            { id: 52, name: 'Cours Optique', type: 'Cours', pages: 60, image: '🔬' },
            { id: 53, name: 'TD Optique', type: 'TD', pages: 38, image: '🔬' }
        ],
        'informatique-2': [
            { id: 54, name: 'Cours Informatique 2', type: 'Cours', pages: 90, image: '💻' },
            { id: 55, name: 'TP Informatique 2', type: 'Pratique', pages: 70, image: '💻' }
        ]
    }
};

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderDocuments();
    updateCopyright();
    initializeAITutor();
    initializeQuizGenerator();
    initializeCourseReviewer();
});

// ===== GESTION DU MENU HAMBURGER =====
function initializeEventListeners() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const navMenu = document.getElementById('nav-menu');
    const sidebar = document.getElementById('sidebar');
    const backButton = document.getElementById('back-button');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const backToTopBtn = document.getElementById('back-to-top');

    // Toggle menu hamburger
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // Fermer le menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            sidebar.classList.remove('active');
        });
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            sidebar.classList.remove('active');
        });
    });

    // Bouton retour
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }

    // Recherche
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Bouton retour en haut
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toast notification
    const toastClose = document.getElementById('toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            const toast = document.getElementById('toast-notification');
            toast.classList.remove('show');
        });
    }

    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('open');
        });
    });

    // Filtres
    const sessionFilter = document.getElementById('session-filter');
    const typeFilter = document.getElementById('type-filter');
    const subjectFilter = document.getElementById('subject-filter');

    if (sessionFilter) {
        sessionFilter.addEventListener('change', applyFilters);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    if (subjectFilter) {
        subjectFilter.addEventListener('change', applyFilters);
    }

    // Modal
    const previewModal = document.getElementById('preview-modal');
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            previewModal.classList.remove('show');
        });
    }

    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    }

    // Boutons de session
    const toggleSessionBtns = document.querySelectorAll('.toggle-session');
    toggleSessionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionSection = this.closest('.session-section');
            const subjectSections = sessionSection.querySelectorAll('.subject-section');
            subjectSections.forEach(section => {
                section.style.display = section.style.display === 'none' ? 'block' : 'none';
            });
        });
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// ===== RENDU DES DOCUMENTS =====
function renderDocuments() {
    for (const session in documents) {
        for (const subject in documents[session]) {
            const containerId = `docs-${subject}`;
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
                documents[session][subject].forEach(doc => {
                    const docCard = createDocumentCard(doc);
                    container.appendChild(docCard);
                });
            }
        }
    }

    // Documents populaires sur l'accueil
    const popularDocsContainer = document.querySelector('.popular-docs .documents-grid');
    if (popularDocsContainer) {
        popularDocsContainer.innerHTML = '';
        const allDocs = getAllDocuments().slice(0, 6);
        allDocs.forEach(doc => {
            popularDocsContainer.appendChild(createDocumentCard(doc));
        });
    }

    // Derniers cours
    const latestCoursesContainer = document.querySelector('.latest-courses .courses-list');
    if (latestCoursesContainer) {
        latestCoursesContainer.innerHTML = '';
        const courseDocs = getAllDocuments().filter(d => d.type === 'Cours').slice(0, 5);
        courseDocs.forEach(doc => {
            const courseItem = document.createElement('div');
            courseItem.style.cssText = `
                background: white;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 5px;
                border-left: 4px solid #FFD700;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            courseItem.innerHTML = `
                <div>
                    <h4 style="color: #001f3f; margin-bottom: 0.25rem;">${doc.name}</h4>
                    <small style="color: #666;">${doc.pages} pages</small>
                </div>
                <button onclick="downloadDocument(${doc.id})" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">⬇️ Télécharger</button>
            `;
            latestCoursesContainer.appendChild(courseItem);
        });
    }
}

// ===== CRÉER UNE CARTE DE DOCUMENT =====
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card';
    card.innerHTML = `
        <div class="document-header">
            <span class="document-type">${doc.type}</span>
            <h3>${doc.name}</h3>
        </div>
        <div class="document-body">
            <div class="document-info">
                <span class="document-pages">${doc.pages} pages</span>
            </div>
            <div class="document-actions">
                <button class="doc-btn doc-btn-view" onclick="previewDocument(${doc.id})">👁️ Voir</button>
                <button class="doc-btn doc-btn-download" onclick="downloadDocument(${doc.id})">⬇️ Télécharger</button>
            </div>
        </div>
    `;
    return card;
}

// ===== OBTENEZ TOUS LES DOCUMENTS =====
function getAllDocuments() {
    const allDocs = [];
    for (const session in documents) {
        for (const subject in documents[session]) {
            allDocs.push(...documents[session][subject]);
        }
    }
    return allDocs;
}

// ===== PRÉVISUALISER UN DOCUMENT =====
function previewDocument(docId) {
    const doc = getAllDocuments().find(d => d.id === docId);
    if (!doc) return;

    const modal = document.getElementById('preview-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPreview = document.getElementById('modal-preview');
    const modalDownloadBtn = document.getElementById('modal-download-btn');

    modalTitle.textContent = doc.name;
    modalPreview.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${doc.image}</div>
            <h3>${doc.name}</h3>
            <p><strong>Type:</strong> ${doc.type}</p>
            <p><strong>Nombre de pages:</strong> ${doc.pages}</p>
            <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                Cliquez sur "Télécharger" pour obtenir le document complet.
            </p>
            <div style="margin-top: 1.5rem; padding: 1rem; background: #f0f0f0; border-radius: 5px;">
                <p style="color: #666;">📄 Aperçu du document disponible</p>
                <p style="font-size: 0.85rem; color: #999;">Le contenu complet sera disponible après téléchargement.</p>
            </div>
        </div>
    `;

    modalDownloadBtn.onclick = function() {
        downloadDocument(docId);
    };

    modal.classList.add('show');
    showNotification(`📄 Prévisualisation de "${doc.name}"`, 'success');
}

// ===== TÉLÉCHARGER UN DOCUMENT =====
function downloadDocument(docId) {
    const doc = getAllDocuments().find(d => d.id === docId);
    if (!doc) return;

    // Simulation du téléchargement
    showNotification(`✅ Téléchargement de "${doc.name}" en cours...`, 'success');
    
    // Fermer le modal si ouvert
    const modal = document.getElementById('preview-modal');
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
    }

    // Simulation avec un délai
    setTimeout(() => {
        showNotification(`✅ "${doc.name}" a été téléchargé avec succès!`, 'success');
    }, 1500);
}

// ===== NOTIFICATION =====
function showNotification(message, type = 'info') {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.style.backgroundColor = getColorByType(type);
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function getColorByType(type) {
    const colors = {
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#001f3f'
    };
    return colors[type] || colors['info'];
}

// ===== RECHERCHE =====
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        showNotification('⚠️ Veuillez entrer un terme de recherche', 'warning');
        return;
    }

    const allDocs = getAllDocuments();
    const results = allDocs.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        doc.type.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        showNotification(`❌ Aucun résultat pour "${query}"`, 'warning');
        return;
    }

    showNotification(`🔍 ${results.length} résultat(s) trouvé(s) pour "${query}"`, 'success');

    // Afficher les résultats
    const resultsHtml = results.map(doc => {
        return `
            <div style="
                background: white;
                padding: 1rem;
                margin: 0.5rem 0;
                border-radius: 5px;
                border-left: 4px solid #FFD700;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <h4 style="color: #001f3f; margin: 0;">${doc.name}</h4>
                    <small style="color: #666;">${doc.type} • ${doc.pages} pages</small>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="previewDocument(${doc.id})" style="
                        background: #17a2b8;
                        color: white;
                        border: none;
                        padding: 0.5rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">👁️</button>
                    <button onclick="downloadDocument(${doc.id})" style="
                        background: #28a745;
                        color: white;
                        border: none;
                        padding: 0.5rem;
                        border-radius: 5px;
                        cursor: pointer;
                    ">⬇️</button>
                </div>
            </div>
        `;
    }).join('');

    // Créer une modale avec les résultats
    const searchModal = document.createElement('div');
    searchModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;
    searchModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 10px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        ">
            <button onclick="this.parentElement.parentElement.remove()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
            ">✕</button>
            <div style="padding: 2rem;">
                <h2 style="color: #001f3f; margin-bottom: 1rem;">Résultats de recherche</h2>
                <p style="color: #666; margin-bottom: 1rem;">Trouvé ${results.length} résultat(s) pour "${query}"</p>
                <div>${resultsHtml}</div>
            </div>
        </div>
    `;
    document.body.appendChild(searchModal);
}

// ===== APPLIQUER LES FILTRES =====
function applyFilters() {
    const sessionFilter = document.getElementById('session-filter')?.value || 'all';
    const typeFilter = document.getElementById('type-filter')?.value || 'all';
    const subjectFilter = document.getElementById('subject-filter')?.value || 'all';

    const allDocCards = document.querySelectorAll('.document-card');
    let visibleCount = 0;

    for (const session in documents) {
        // Vérifier le filtre de session
        if (sessionFilter !== 'all' && session !== sessionFilter) continue;

        for (const subject in documents[session]) {
            // Vérifier le filtre de sujet
            if (subjectFilter !== 'all' && subject !== subjectFilter) continue;

            const docs = documents[session][subject];
            docs.forEach(doc => {
                // Vérifier le filtre de type
                if (typeFilter !== 'all' && doc.type !== typeFilter) return;

                const container = document.getElementById(`docs-${subject}`);
                if (container) {
                    const cards = container.querySelectorAll('.document-card');
                    const targetCard = Array.from(cards).find(card => 
                        card.querySelector('h3').textContent === doc.name
                    );
                    if (targetCard) {
                        targetCard.style.display = 'block';
                        visibleCount++;
                    }
                }
            });
        }
    }

    if (visibleCount === 0) {
        showNotification('⚠️ Aucun document ne correspond aux filtres sélectionnés', 'warning');
    }
}

// ===== METTRE À JOUR LE COPYRIGHT =====
function updateCopyright() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// ===== GÉRER LE FORMULAIRE DE CONTACT =====
function handleContactFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        showNotification('⚠️ Veuillez remplir tous les champs', 'warning');
        return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('⚠️ Veuillez entrer une adresse email valide', 'warning');
        return;
    }

    // Simulation d'envoi
    showNotification('📤 Envoi de votre message...', 'info');

    setTimeout(() => {
        showNotification('✅ Votre message a été envoyé avec succès! Nous vous répondrons bientôt.', 'success');
        document.getElementById('contact-form-element').reset();
    }, 1500);
}

// ===== TUTEUR IA =====
function initializeAITutor() {
    // Créer le bouton du tuteur IA
    const aiTutorBtn = document.createElement('button');
    aiTutorBtn.id = 'ai-tutor-btn';
    aiTutorBtn.innerHTML = '🤖 Tuteur IA';
    aiTutorBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: linear-gradient(135deg, #001f3f 0%, #002d5c 100%);
        color: #FFD700;
        border: 2px solid #FFD700;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.95rem;
        z-index: 500;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    aiTutorBtn.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    };
    aiTutorBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    };

    aiTutorBtn.addEventListener('click', openAITutor);
    document.body.appendChild(aiTutorBtn);
}

function openAITutor() {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'ai-tutor-modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 3000;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <button class="modal-close" onclick="document.getElementById('ai-tutor-modal').remove()">✕</button>
            <div class="modal-body">
                <h2 style="color: #001f3f; display: flex; align-items: center; gap: 0.5rem;">
                    🤖 Tuteur IA Intelligent
                </h2>
                <p style="color: #666; margin-bottom: 1.5rem;">
                    Posez vos questions et recevez des explications personnalisées basées sur le contenu des cours.
                </p>

                <div id="ai-chat" style="
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 1rem;
                    height: 300px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                    border: 1px solid #ddd;
                ">
                    <div style="color: #666; text-align: center; padding: 2rem 1rem;">
                        <p>Bonjour! 👋 Je suis votre tuteur IA.</p>
                        <p style="font-size: 0.9rem; margin-top: 1rem;">Posez-moi une question sur vos cours et je vous aiderai!</p>
                    </div>
                </div>

                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" id="ai-question" placeholder="Poser une question..." style="
                        flex: 1;
                        padding: 0.75rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    ">
                    <button onclick="askAITutor()" style="
                        background: #FFD700;
                        color: #001f3f;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Envoyer</button>
                </div>

                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">

                <h4 style="color: #001f3f; margin-bottom: 1rem;">Exemples de questions:</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <button onclick="askAITutor('Expliquez-moi le théorème de Pythagore en détail')" style="
                        background: white;
                        border: 1px solid #ddd;
                        padding: 0.75rem;
                        border-radius: 5px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='white'">
                        📚 Expliquez-moi le théorème de Pythagore
                    </button>
                    <button onclick="askAITutor('Comment aborder un problème de thermodynamique?')" style="
                        background: white;
                        border: 1px solid #ddd;
                        padding: 0.75rem;
                        border-radius: 5px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='white'">
                        🔥 Comment aborder un problème de thermodynamique?
                    </button>
                    <button onclick="askAITutor('Que signifie la dérivée en mathématiques?')" style="
                        background: white;
                        border: 1px solid #ddd;
                        padding: 0.75rem;
                        border-radius: 5px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='white'">
                        📊 Que signifie la dérivée en mathématiques?
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Permettre l'envoi avec Entrée
    document.getElementById('ai-question').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askAITutor();
        }
    });
}

function askAITutor(question = null) {
    const inputElement = document.getElementById('ai-question');
    const question_text = question || inputElement.value.trim();

    if (!question_text) {
        showNotification('⚠️ Veuillez poser une question', 'warning');
        return;
    }

    const chatBox = document.getElementById('ai-chat');
    
    // Ajouter la question
    const userMessage = document.createElement('div');
    userMessage.style.cssText = `
        background: #001f3f;
        color: white;
        padding: 0.75rem;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        text-align: right;
        margin-left: 30%;
    `;
    userMessage.textContent = 'Vous: ' + question_text;
    chatBox.appendChild(userMessage);

    if (inputElement) inputElement.value = '';

    // Simulation de réponse IA
    setTimeout(() => {
        const aiResponse = document.createElement('div');
        aiResponse.style.cssText = `
            background: #FFD700;
            color: #001f3f;
            padding: 0.75rem;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            margin-right: 30%;
        `;
        aiResponse.innerHTML = `<strong>Tuteur IA:</strong> ${generateAIResponse(question_text)}`;
        chatBox.appendChild(aiResponse);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

function generateAIResponse(question) {
    const responses = {
        'théorème': 'Le théorème de Pythagore énonce que dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des deux autres côtés. Formule: a² + b² = c²',
        'thermodynamique': 'La thermodynamique étudie les transformations énergétiques. Les lois principales sont: la conservation de l\'énergie, l\'augmentation de l\'entropie, et l\'équilibre thermique.',
        'dérivée': 'La dérivée mesure la vitesse de changement d\'une fonction. Elle représente la pente de la tangente à la courbe en un point donné.',
        'intégrale': 'L\'intégrale est l\'opération inverse de la dérivation. Elle calcule l\'aire sous une courbe.',
        'algèbre': 'L\'algèbre est l\'étude des structures mathématiques abstraites et des équations.',
        'chimie': 'La chimie étudie les réactions entre les substances et leurs propriétés.',
        'physique': 'La physique étudie les lois de la nature et les phénomènes physiques.'
    };

    const questionLower = question.toLowerCase();
    for (const key in responses) {
        if (questionLower.includes(key)) {
            return responses[key];
        }
    }

    return '🤔 C\'est une excellente question! D\'après le contenu des cours, je peux vous dire que ce sujet est couverts dans les ressources disponibles. Consultez les notes de cours correspondantes ou posez une question plus spécifique.';
}

// ===== GÉNÉRATEUR DE QUIZ =====
function initializeQuizGenerator() {
    const quizBtn = document.createElement('button');
    quizBtn.id = 'quiz-btn';
    quizBtn.innerHTML = '✏️ Quiz';
    quizBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 30px;
        background: linear-gradient(135deg, #001f3f 0%, #002d5c 100%);
        color: #FFD700;
        border: 2px solid #FFD700;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.95rem;
        z-index: 500;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    quizBtn.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    };
    quizBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    };

    quizBtn.addEventListener('click', openQuizGenerator);
    document.body.appendChild(quizBtn);
}

function openQuizGenerator() {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'quiz-modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 3000;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <button class="modal-close" onclick="document.getElementById('quiz-modal').remove()">✕</button>
            <div class="modal-body">
                <h2 style="color: #001f3f; display: flex; align-items: center; gap: 0.5rem;">
                    ✏️ Générateur de Quiz Interactif
                </h2>
                <p style="color: #666; margin-bottom: 1.5rem;">
                    Sélectionnez une matière et testez vos connaissances!
                </p>

                <div style="margin-bottom: 1.5rem;">
                    <label for="quiz-subject" style="
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                        color: #001f3f;
                    ">Choisir une matière:</label>
                    <select id="quiz-subject" style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    ">
                        <option value="">-- Sélectionnez une matière --</option>
                        <option value="analyse">Analyse 1</option>
                        <option value="algebre">Algèbre</option>
                        <option value="thermodynamique">Thermodynamique</option>
                        <option value="electricite">Électricité</option>
                        <option value="chimie">Chimie Générale</option>
                        <option value="informatique">Informatique</option>
                    </select>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label for="quiz-difficulty" style="
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                        color: #001f3f;
                    ">Niveau de difficulté:</label>
                    <select id="quiz-difficulty" style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    ">
                        <option value="facile">Facile</option>
                        <option value="moyen" selected>Moyen</option>
                        <option value="difficile">Difficile</option>
                    </select>
                </div>

                <button onclick="startQuiz()" style="
                    width: 100%;
                    background: #FFD700;
                    color: #001f3f;
                    border: none;
                    padding: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1rem;
                ">Commencer le Quiz</button>

                <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

                <h4 style="color: #001f3f; margin-bottom: 1rem;">✨ Caractéristiques:</h4>
                <ul style="color: #666; margin-left: 1rem;">
                    <li>Questions générées dynamiquement</li>
                    <li>Réponses instantanées avec explications</li>
                    <li>Score et progression suivi</li>
                    <li>Niveaux de difficulté adaptés</li>
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function startQuiz() {
    const subject = document.getElementById('quiz-subject').value;
    const difficulty = document.getElementById('quiz-difficulty').value;

    if (!subject) {
        showNotification('⚠️ Veuillez sélectionner une matière', 'warning');
        return;
    }

    const questions = generateQuizQuestions(subject, difficulty);
    const modal = document.getElementById('quiz-modal');
    const modalBody = modal.querySelector('.modal-body');

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        if (currentQuestion >= questions.length) {
            // Résultats finaux
            modalBody.innerHTML = `
                <h2 style="color: #001f3f; text-align: center;">Quiz Terminé! 🎉</h2>
                <div style="
                    background: linear-gradient(135deg, #001f3f 0%, #002d5c 100%);
                    color: white;
                    padding: 2rem;
                    border-radius: 10px;
                    text-align: center;
                    margin: 2rem 0;
                ">
                    <h1 style="font-size: 3rem; margin: 0;">${score}/${questions.length}</h1>
                    <p style="font-size: 1.2rem; margin-top: 0.5rem;">
                        ${getScoreMessage(score, questions.length)}
                    </p>
                </div>
                <p style="color: #666; text-align: center;">
                    Vous avez obtenu ${Math.round((score / questions.length) * 100)}%
                </p>
                <button onclick="document.getElementById('quiz-modal').remove(); openQuizGenerator();" style="
                    width: 100%;
                    background: #FFD700;
                    color: #001f3f;
                    border: none;
                    padding: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 1rem;
                ">Recommencer</button>
            `;
            return;
        }

        const question = questions[currentQuestion];
        modalBody.innerHTML = `
            <h2 style="color: #001f3f;">Quiz: ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
            <p style="color: #666; margin-bottom: 1rem;">Question ${currentQuestion + 1}/${questions.length}</p>
            
            <div style="
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 5px;
                margin-bottom: 1.5rem;
                border-left: 4px solid #FFD700;
            ">
                <h3 style="color: #001f3f; margin: 0;">${question.question}</h3>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                ${question.options.map((option, index) => `
                    <button onclick="submitAnswer(${index}, ${question.correct})" style="
                        background: white;
                        border: 2px solid #ddd;
                        padding: 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                        text-align: left;
                        transition: all 0.3s;
                        font-size: 1rem;
                    " onmouseover="this.style.background='#f0f0f0'; this.style.borderColor='#FFD700'" 
                       onmouseout="this.style.background='white'; this.style.borderColor='#ddd'">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }

    window.submitAnswer = function(selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            score++;
            showNotification('✅ Bonne réponse!', 'success');
        } else {
            showNotification(`❌ Mauvaise réponse. La bonne réponse était: ${questions[currentQuestion].options[correctIndex]}`, 'danger');
        }
        currentQuestion++;
        setTimeout(displayQuestion, 1500);
    };

    displayQuestion();
}

function generateQuizQuestions(subject, difficulty) {
    const questionBanks = {
        'analyse': [
            { question: 'Qu\'est-ce qu\'une limite en mathématiques?', options: ['Une frontière', 'Une valeur vers laquelle tend une fonction', 'Un obstacle', 'Une équation'], correct: 1 },
            { question: 'Quelle est la dérivée de x²?', options: ['x', '2x', 'x³', '1'], correct: 1 },
            { question: 'L\'intégrale est l\'inverse de...?', options: ['L\'addition', 'La soustraction', 'La dérivation', 'La multiplication'], correct: 2 }
        ],
        'algebre': [
            { question: 'Qu\'est-ce qu\'une matrice?', options: ['Un film', 'Un tableau de nombres', 'Une équation', 'Une fonction'], correct: 1 },
            { question: 'Quel est le rang d\'une matrice?', options: ['Le nombre de lignes', 'Le nombre de colonnes', 'La dimension maximale des sous-matrices de déterminant non nul', 'La somme des éléments'], correct: 2 },
            { question: 'Résolvez: 2x + 3 = 7', options: ['1', '2', '3', '4'], correct: 1 }
        ],
        'thermodynamique': [
            { question: 'Qu\'est-ce que l\'entropie?', options: ['Une température', 'Une mesure du désordre', 'Une pression', 'Un volume'], correct: 1 },
            { question: 'Énoncez le 1er principe de la thermodynamique', options: ['Pas de mouvement perpétuel de 1ère espèce', 'L\'énergie se conserve', 'Pas de mouvement perpétuel de 2e espèce', 'La température augmente'], correct: 1 }
        ],
        'electricite': [
            { question: 'Qu\'est-ce qu\'un circuit électrique?', options: ['Une boucle de fil', 'Un ensemble de composants connectés permettant le passage du courant', 'Un moteur', 'Une batterie'], correct: 1 },
            { question: 'Quelle est l\'unité de la tension électrique?', options: ['Ampère', 'Ohm', 'Volt', 'Watt'], correct: 2 }
        ],
        'chimie': [
            { question: 'Qu\'est-ce qu\'une molécule?', options: ['Un atome', 'Un ensemble d\'atomes liés', 'Une réaction', 'Un élément'], correct: 1 },
            { question: 'Combien de protons a le carbone?', options: ['6', '8', '12', '14'], correct: 0 }
        ],
        'informatique': [
            { question: 'Qu\'est-ce qu\'un algorithme?', options: ['Un langage', 'Une procédure de résolution de problème', 'Un programme', 'Un fichier'], correct: 1 },
            { question: 'Quel est le langage de programmation le plus populaire?', options: ['Python', 'Java', 'C++', 'Dépend du contexte'], correct: 3 }
        ]
    };

    const questions = questionBanks[subject] || [];
    return questions.slice(0, 5);
}

function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 'Parfait! 🌟';
    if (percentage >= 80) return 'Excellent travail! 🎉';
    if (percentage >= 60) return 'Bon résultat! 👍';
    if (percentage >= 40) return 'À améliorer... 💪';
    return 'Révise et réessaye! 📚';
}

// ===== RÉVISEUR DE COURS =====
function initializeCourseReviewer() {
    const reviewerBtn = document.createElement('button');
    reviewerBtn.id = 'reviewer-btn';
    reviewerBtn.innerHTML = '📖 Réviseur';
    reviewerBtn.style.cssText = `
        position: fixed;
        bottom: 170px;
        left: 30px;
        background: linear-gradient(135deg, #001f3f 0%, #002d5c 100%);
        color: #FFD700;
        border: 2px solid #FFD700;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.95rem;
        z-index: 500;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    reviewerBtn.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    };
    reviewerBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    };

    reviewerBtn.addEventListener('click', openCourseReviewer);
    document.body.appendChild(reviewerBtn);
}

function openCourseReviewer() {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'reviewer-modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 3000;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <button class="modal-close" onclick="document.getElementById('reviewer-modal').remove()">✕</button>
            <div class="modal-body">
                <h2 style="color: #001f3f; display: flex; align-items: center; gap: 0.5rem;">
                    📖 Réviseur de Cours Intelligent
                </h2>
                <p style="color: #666; margin-bottom: 1.5rem;">
                    Analysez et révisez vos notes de cours pour mieux comprendre et retenir les concepts clés.
                </p>

                <div style="margin-bottom: 1.5rem;">
                    <label for="reviewer-subject" style="
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                        color: #001f3f;
                    ">Sélectionner une matière:</label>
                    <select id="reviewer-subject" style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    ">
                        <option value="">-- Choisir une matière --</option>
                        <option value="analyse">Analyse 1</option>
                        <option value="algebre">Algèbre</option>
                        <option value="thermodynamique">Thermodynamique</option>
                        <option value="electricite">Électricité</option>
                        <option value="chimie">Chimie Générale</option>
                        <option value="informatique">Informatique</option>
                    </select>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label for="reviewer-notes" style="
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                        color: #001f3f;
                    ">Coller vos notes ou un résumé:</label>
                    <textarea id="reviewer-notes" placeholder="Collez ici vos notes de cours ou un résumé..." style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                        font-family: inherit;
                        min-height: 150px;
                    "></textarea>
                </div>

                <button onclick="analyzeNotes()" style="
                    width: 100%;
                    background: #FFD700;
                    color: #001f3f;
                    border: none;
                    padding: 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                ">Analyser et Réviser</button>

                <div style="
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 5px;
                    border-left: 4px solid #FFD700;
                ">
                    <h4 style="color: #001f3f; margin-top: 0;">💡 Conseils de révision:</h4>
                    <ul style="color: #666; margin-left: 1rem;">
                        <li>Identifiez les concepts clés</li>
                        <li>Créez des résumés et des schémas</li>
                        <li>Faites des exercices pratiques</li>
                        <li>Testez votre compréhension</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function analyzeNotes() {
    const subject = document.getElementById('reviewer-subject').value;
    const notes = document.getElementById('reviewer-notes').value;

    if (!subject) {
        showNotification('⚠️ Veuillez sélectionner une matière', 'warning');
        return;
    }

    if (!notes.trim()) {
        showNotification('⚠️ Veuillez entrer vos notes', 'warning');
        return;
    }

    const modal = document.getElementById('reviewer-modal');
    const modalBody = modal.querySelector('.modal-body');

    showNotification('🔍 Analyse de vos notes...', 'info');

    setTimeout(() => {
        const analysis = analyzeNotesContent(subject, notes);
        
        modalBody.innerHTML = `
            <h2 style="color: #001f3f;">📊 Analyse de Vos Notes</h2>
            
            <div style="
                background: linear-gradient(135deg, #001f3f 0%, #002d5c 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
            ">
                <h3 style="margin-top: 0;">Matière: ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
                <p>Mots clés identifiés: <strong>${analysis.keywords.length}</strong></p>
                <p>Longueur du texte: <strong>${notes.split(' ').length} mots</strong></p>
            </div>

            <h4 style="color: #001f3f; margin-bottom: 1rem;">🎯 Concepts Clés Identifiés:</h4>
            <div style="
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 5px;
                margin-bottom: 1.5rem;
            ">
                <ul style="color: #666; margin-left: 1rem;">
                    ${analysis.keywords.map(kw => `<li>${kw}</li>`).join('')}
                </ul>
            </div>

            <h4 style="color: #001f3f; margin-bottom: 1rem;">💡 Recommandations:</h4>
            <div style="
                background: #fff3cd;
                border: 1px solid #ffc107;
                padding: 1rem;
                border-radius: 5px;
                margin-bottom: 1.5rem;
            ">
                <ul style="color: #856404; margin-left: 1rem;">
                    ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>

            <div style="display: flex; gap: 1rem;">
                <button onclick="document.getElementById('reviewer-modal').remove(); openCourseReviewer();" style="
                    flex: 1;
                    background: #FFD700;
                    color: #001f3f;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">Réviser d'autres notes</button>
                <button onclick="document.getElementById('reviewer-modal').remove();" style="
                    flex: 1;
                    background: white;
                    color: #001f3f;
                    border: 2px solid #001f3f;
                    padding: 0.75rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">Fermer</button>
            </div>
        `;

        showNotification('✅ Analyse complète!', 'success');
    }, 1200);
}

function analyzeNotesContent(subject, notes) {
    const keywordsBySubject = {
        'analyse': ['limite', 'dérivée', 'intégrale', 'fonction', 'continuité', 'convergence'],
        'algebre': ['matrice', 'vecteur', 'équation', 'déterminant', 'rang', 'inverse'],
        'thermodynamique': ['entropie', 'énergie', 'température', 'travail', 'chaleur', 'équilibre'],
        'electricite': ['courant', 'tension', 'résistance', 'circuit', 'puissance', 'inductance'],
        'chimie': ['réaction', 'molécule', 'atome', 'liaison', 'valence', 'oxydation'],
        'informatique': ['algorithme', 'data structure', 'boucle', 'condition', 'fonction', 'classe']
    };

    const recommendations = [
        '🎯 Créez des fiches de révision avec les concepts clés',
        '📊 Faites des schémas et des diagrammes pour visualiser',
        '✍️ Pratiquez en résolvant des exercices',
        '🧠 Testez votre compréhension avec notre quiz',
        '📚 Consultez les ressources complémentaires'
    ];

    const keywords = (keywordsBySubject[subject] || []).filter(kw => 
        notes.toLowerCase().includes(kw)
    );

    // Ajouter des mots-clés trouvés dans le texte
    const words = notes.toLowerCase().split(/\W+/);
    const uniqueWords = [...new Set(words)].filter(w => w.length > 5);
    keywords.push(...uniqueWords.slice(0, 3));

    return {
        keywords: [...new Set(keywords)],
        recommendations: recommendations
    };
}

// ===== ÉVÉNEMENT DE CHARGEMENT COMPLET =====
window.addEventListener('load', function() {
    console.log('IAFECOLE - Plateforme chargée avec succès');
    console.log('Sécurité: Protections activées ✓');
    console.log('Tuteur IA: Actif ✓');
    console.log('Générateur de Quiz: Actif ✓');
    console.log('Réviseur de Cours: Actif ✓');
});