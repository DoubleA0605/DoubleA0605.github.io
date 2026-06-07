/**
 * Main JavaScript file for Andy Wong's Portfolio
 * Handles mobile menu, scroll spy, certifications filter, and language switching
 */

// Translation data
const translations = {
  en: {
    aboutTitle: 'About',
    educationTitle: 'Education',
    certificationsTitle: 'Licenses & Certifications',
    projectsTitle: 'Projects',
    contactTitle: 'Connect',
    
    // Hero section
    heroTitle: 'Andy Wong',
    heroAka: 'aka Double A',
    heroSubtitle: 'Software Engineer & Entrepreneur | CPEG @HKUST',
    heroSubtitle2: 'CEO @Gradisen',
    viewProjects: 'View Projects',
    getInTouch: 'Get in touch',
    
    // About
    aboutMeTitle: 'About Me',
    aboutMeText: 'I am a motivated Computer Engineering student at HKUST. Associate degree from HKU SPACE with Principal\'s Honours List. Strong technical skills in Python, cloud computing, IoT, and edge AI. Co-founder & CEO of Gradisen, actively building real-world products. Cadet Leader at St. John Ambulance.',
    
    // Education
    hkustDegree: 'Bachelor of Engineering – Computer Engineering',
    hkustText: 'Pursuing BEng in Computer Engineering.',
    hkuspaceDegree: 'Associate\'s Degree – Engineering (Computer Science)',
    hkuspaceText: 'Graduate with Merit, CGPA 3.61, Principal\'s Honours List 2024-2025',
    skhbbssName: '聖公會白約翰會督中學',
    skhbbssText: 'HKDSE graduate. Active in STEM projects including the MiTeen Academy air hockey table and ICanCode robot competition.',
    seeSchoolMemories: 'See School Memories',
    
    // Projects
    gdSenseDesc: 'An autonomous patrol robot designed for small-to-medium warehouses to detect packaging damage and verify SKUs without infrastructure modifications. Built on an NVIDIA Jetson edge-AI pipeline with ROS, it integrates a YOLO-based vision model, RGB-D camera, and 2D LiDAR to navigate fixed routes and identify structural anomalies externally with over 80% accuracy.',
    novaSenseDesc: 'An advanced Edge AI system for warehouse inventory counting and volumetric estimation. Evolved from a YOLO bounding-box model into a sophisticated 2D-3D spatial fusion pipeline combining Grounding DINO, SAM, and MASt3R. Engineered a custom point-cloud denoising engine and elevation map voxelization to accurately measure irregular cargo shapes.',
    sittingDirectorDesc: 'A smart chair system utilizing an ESP-32, FSRs, and infrared sensors to detect and correct poor posture in real time. Implemented on-device pose estimation via TensorFlow Lite and Google MoveNet, syncing data to a custom Android app via Firebase and BLE. Designed 3D-printed mechanical components for physical posture adjustment.',
    
    // Buttons
    seeAllCertifications: 'See All Certifications',
    backToHome: 'Back to Home',
    
    // Certifications page
    allCertificationsTitle: 'All Licenses & Certifications',
    certListedNote: 'Listed in reverse chronological order',
    certSearchPlaceholder: '🔍 Search certifications by name, issuer, or skills...',
    certFound: 'certification(s) found',
    certCountLabel: 'certification(s) found',
    
    // Highlights section (GEO)
    highlightsTitle: 'Highlights'
  },
  'zh-TW': {
    aboutTitle: '關於',
    educationTitle: '教育',
    certificationsTitle: '許可證和認證',
    projectsTitle: '項目',
    contactTitle: '聯繫',
    
    // Hero section
    heroTitle: '黃修譽',
    heroAka: 'aka Double A',
    heroSubtitle: '軟體工程師 & 創業家 | CPEG @HKUST',
    heroSubtitle2: 'CEO @Gradisen',
    viewProjects: '查看項目',
    getInTouch: '聯繫我們',
    
    // About
    aboutMeTitle: '關於我',
    aboutMeText: '我是香港科技大學計算機工程系的學生。畢業於HKU SPACE，獲得副學士學位，成績優異。精通Python、雲計算、物聯網和邊緣人工智能。Gradisen的聯合創始人兼首席執行官，積極開發實際產品。香港聖約翰救傷隊少青團的見習隊領袖。',
    
    // Education
    hkustDegree: '工程學學士 - 計算機工程',
    hkustText: '正在攻讀計算機工程學位。',
    hkuspaceDegree: '副學位 - 工程（計算機科學）',
    hkuspaceText: '以優異成績畢業，績點3.61，2024-2025年校長榮譽名單',
    skhbbssName: '聖公會白約翰會督中學',
    skhbbssText: '香港中學文憑試畢業生。積極參與STEM項目，包括MiTeen Academy氣墊彈珠台和ICanCode機械人競賽。',
    seeSchoolMemories: '查看校園回憶',
    
    // Projects
    gdSenseDesc: '為中小型倉庫設計的自主巡邏機器人，用於檢測包裝損傷和驗證SKU，無需基礎設施改造。基於NVIDIA Jetson邊緣AI管道和ROS構建，集成了基於YOLO的視覺模型、RGB-D攝像頭和2D激光雷達，以超過80%的準確度沿著固定路線導航並識別外部結構異常。',
    novaSenseDesc: '用於倉庫庫存計數和體積估計的先進邊緣AI系統。從YOLO邊界框模型發展而來，已演變為結合Grounding DINO、SAM和MASt3R的複雜2D-3D空間融合管道。設計了自定義點雲去噪引擎和高程圖體素化，以準確測量不規則貨物形狀。',
    sittingDirectorDesc: '使用ESP-32、FSR和紅外傳感器的智能椅系統，可實時檢測和糾正不良姿勢。通過TensorFlow Lite和Google MoveNet實現設備上姿勢估計，通過Firebase和BLE將數據同步到自定義Android應用程序。設計3D打印機械部件用於物理姿勢調整。',
    
    // Buttons
    seeAllCertifications: '查看所有認證',
    backToHome: '返回首頁',
    
    // Certifications page
    allCertificationsTitle: '所有許可證和認證',
    certListedNote: '按時間倒序列出',
    certSearchPlaceholder: '🔍 按名稱、頒發者或技能搜索認證...',
    certFound: '項認證',
    certCountLabel: '項認證',
    
    // Highlights section (GEO)
    highlightsTitle: '重點摘要'
  },
  'zh-CN': {
    aboutTitle: '关于',
    educationTitle: '教育',
    certificationsTitle: '许可证和认证',
    projectsTitle: '项目',
    contactTitle: '联系',
    
    // Hero section
    heroTitle: '黄修誉',
    heroAka: 'aka Double A',
    heroSubtitle: '软件工程师 & 创业家 | CPEG @HKUST',
    heroSubtitle2: 'CEO @Gradisen',
    viewProjects: '查看项目',
    getInTouch: '联系我们',
    
    // About
    aboutMeTitle: '关于我',
    aboutMeText: '我是香港科技大学计算机工程系的学生。毕业于HKU SPACE，获得副学士学位，成绩优异。精通Python、云计算、物联网和边缘人工智能。Gradisen的联合创始人兼首席执行官，积极开发实际产品。香港圣约翰救伤队少青团的见习队领袖。',
    
    // Education
    hkustDegree: '工程学学士 - 计算机工程',
    hkustText: '正在攻读计算机工程学位。',
    hkuspaceDegree: '副学位 - 工程（计算机科学）',
    hkuspaceText: '以优异成绩毕业，绩点3.61，2024-2025年校长荣誉名单',
    skhbbssName: '圣公会白约翰会督中学',
    skhbbssText: '香港中学文凭试毕业生。积极参与STEM项目，包括MiTeen Academy气垫弹珠台和ICanCode机器人竞赛。',
    seeSchoolMemories: '查看校园回忆',
    
    // Projects
    gdSenseDesc: '为中小型仓库设计的自主巡逻机器人，用于检测包装损伤和验证SKU，无需基础设施改造。基于NVIDIA Jetson边缘AI管道和ROS构建，集成了基于YOLO的视觉模型、RGB-D摄像头和2D激光雷达，以超过80%的准确度沿着固定路线导航并识别外部结构异常。',
    novaSenseDesc: '用于仓库库存计数和体积估计的先进边缘AI系统。从YOLO边界框模型发展而来，已演变为结合Grounding DINO、SAM和MASt3R的复杂2D-3D空间融合管道。设计了自定义点云去噪引擎和高程图体素化，以准确测量不规则货物形状。',
    sittingDirectorDesc: '使用ESP-32、FSR和红外传感器的智能椅系统，可实时检测和纠正不良姿势。通过TensorFlow Lite和Google MoveNet实现设备上姿势估计，通过Firebase和BLE将数据同步到自定义Android应用程序。设计3D打印机械部件用于物理姿势调整。',
    
    // Buttons
    seeAllCertifications: '查看所有认证',
    backToHome: '返回首页',
    
    // Certifications page
    allCertificationsTitle: '所有许可证和认证',
    certListedNote: '按时间倒序列出',
    certSearchPlaceholder: '🔍 按名称、颁发者或技能搜索认证...',
    certFound: '项认证',
    certCountLabel: '项认证',
    
    // Highlights section (GEO)
    highlightsTitle: '重点摘要'
  }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio successfully loaded.');
    
    // Initialize language from localStorage or default to English
    const savedLang = localStorage.getItem('portfolioLang') || 'en';
    setLanguage(savedLang);
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));

    // Scroll spy - highlight active section link
    const sections = document.querySelectorAll('section[id]');
    function onScroll() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Certification search and filter functionality
    const certSearch = document.getElementById('certSearch');
    if (certSearch) {
        // Debounced search for better performance
        let debounceTimer;
        const debouncedFilter = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterCertifications, 150);
        };
        
        certSearch.addEventListener('keyup', debouncedFilter);
        certSearch.addEventListener('input', debouncedFilter);
        // Allow clearing with Escape key
        certSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                certSearch.value = '';
                filterCertifications();
            }
        });

        // Initialize count on page load
        filterCertifications();
    }

    function filterCertifications() {
        const searchInput = document.getElementById('certSearch');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const certCards = document.querySelectorAll('.cert-card');
        let visibleCount = 0;

        certCards.forEach(card => {
            const certData = card.getAttribute('data-cert');
            if (!certData) {
                card.classList.remove('hidden');
                visibleCount++;
                return;
            }
            
            const cardTitleEl = card.querySelector('h3');
            const cardIssuerEl = card.querySelector('p');
            const cardTitle = cardTitleEl ? cardTitleEl.textContent.toLowerCase() : '';
            const cardIssuer = cardIssuerEl ? cardIssuerEl.textContent.toLowerCase() : '';
            const cardSkills = card.querySelectorAll('.skill-tag');
            let skillsText = '';
            cardSkills.forEach(skill => {
                skillsText += skill.textContent.toLowerCase() + ' ';
            });

            // Search in title, issuer, skills, and data-cert attribute
            const searchableText = cardTitle + ' ' + cardIssuer + ' ' + skillsText + ' ' + certData.toLowerCase();
            
            if (searchTerm === '' || searchableText.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update cert count with aria-live for accessibility
        const certCount = document.getElementById('certCount');
        if (certCount) {
            certCount.textContent = visibleCount;
            // Update aria-live region for screen readers
            const certFilterInfo = document.querySelector('.cert-filter-info');
            if (certFilterInfo && searchTerm !== '') {
                certFilterInfo.setAttribute('aria-live', 'polite');
            }
        }
    }
    
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('portfolioLang', lang);
        });
    });
});

function setLanguage(lang) {
    const trans = translations[lang];
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('lang-active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('lang-active');
        }
    });
    
    // Update all translatable elements
    updateText('[data-i18n="aboutTitle"]', trans.aboutTitle);
    updateText('[data-i18n="educationTitle"]', trans.educationTitle);
    updateText('[data-i18n="certificationsTitle"]', trans.certificationsTitle);
    updateText('[data-i18n="projectsTitle"]', trans.projectsTitle);
    updateText('[data-i18n="contactTitle"]', trans.contactTitle);
    
    // Hero section
    updateText('[data-i18n="heroTitle"]', trans.heroTitle);
    updateText('[data-i18n="heroAka"]', trans.heroAka);
    updateText('[data-i18n="heroSubtitle"]', trans.heroSubtitle);
    updateText('[data-i18n="heroSubtitle2"]', trans.heroSubtitle2);
    updateText('[data-i18n="viewProjects"]', trans.viewProjects);
    updateText('[data-i18n="getInTouch"]', trans.getInTouch);
    
    // About
    updateText('[data-i18n="aboutMeTitle"]', trans.aboutMeTitle);
    updateText('[data-i18n="aboutMeText"]', trans.aboutMeText);
    
    // Education
    updateText('[data-i18n="hkustDegree"]', trans.hkustDegree);
    updateText('[data-i18n="hkustText"]', trans.hkustText);
    updateText('[data-i18n="hkuspaceDegree"]', trans.hkuspaceDegree);
    updateText('[data-i18n="hkuspaceText"]', trans.hkuspaceText);
    updateText('[data-i18n="skhbbssName"]', trans.skhbbssName);
    updateText('[data-i18n="skhbbssText"]', trans.skhbbssText);
    updateText('[data-i18n="seeSchoolMemories"]', trans.seeSchoolMemories);
    
    // Projects
    updateText('[data-i18n="gdSenseDesc"]', trans.gdSenseDesc);
    updateText('[data-i18n="novaSenseDesc"]', trans.novaSenseDesc);
    updateText('[data-i18n="sittingDirectorDesc"]', trans.sittingDirectorDesc);
    
    // Buttons
    updateText('[data-i18n="seeAllCertifications"]', trans.seeAllCertifications);
    updateText('[data-i18n="backToHome"]', trans.backToHome);
    
    // Certifications page
    updateText('[data-i18n="allCertificationsTitle"]', trans.allCertificationsTitle);
    updateText('[data-i18n="certListedNote"]', trans.certListedNote);
    updateAttribute('[data-i18n="certSearchPlaceholder"]', 'placeholder', trans.certSearchPlaceholder);
    updateText('[data-i18n="certCountLabel"]', trans.certCountLabel);
    
    // Highlights (GEO)
    updateText('[data-i18n="highlightsTitle"]', trans.highlightsTitle);
}

function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

function updateAttribute(selector, attr, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(attr, value);
    }
}