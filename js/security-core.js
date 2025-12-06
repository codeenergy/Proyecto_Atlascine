// ============================================
// ATLASCINE SECURITY CORE
// Sistema de Protección Multicapa
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. ANTI-DEVTOOLS PROTECTION
    // ============================================

    const SecurityCore = {
        devToolsOpen: false,
        checkInterval: null,

        // Detectar apertura de DevTools
        detectDevTools() {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            if (widthThreshold || heightThreshold) {
                this.devToolsOpen = true;
                this.onDevToolsOpen();
            } else {
                this.devToolsOpen = false;
            }
        },

        // Acción cuando se detectan DevTools
        onDevToolsOpen() {
            // Modo suave: solo advertencia
            if (!sessionStorage.getItem('devtools_warned')) {
                console.clear();
                console.log('%c⚠️ ADVERTENCIA DE SEGURIDAD', 'color: red; font-size: 24px; font-weight: bold;');
                console.log('%cEsta es una función del navegador destinada a desarrolladores.', 'font-size: 14px;');
                console.log('%cSi alguien te pidió copiar y pegar algo aquí, es una estafa.', 'font-size: 14px;');
                sessionStorage.setItem('devtools_warned', 'true');
            }
        },

        // Iniciar monitoreo
        startMonitoring() {
            this.checkInterval = setInterval(() => {
                this.detectDevTools();
            }, 1000);
        }
    };

    // ============================================
    // 2. ANTI-COPY PROTECTION
    // ============================================

    const CopyProtection = {
        init() {
            // Deshabilitar menú contextual
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showWarning('Clic derecho deshabilitado');
                return false;
            });

            // Deshabilitar selección de texto en áreas sensibles
            document.addEventListener('selectstart', (e) => {
                if (e.target.classList.contains('no-select')) {
                    e.preventDefault();
                    return false;
                }
            });

            // Deshabilitar atajos de teclado peligrosos
            document.addEventListener('keydown', (e) => {
                // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                if (e.keyCode === 123 ||
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                    (e.ctrlKey && e.keyCode === 85)) {
                    e.preventDefault();
                    this.showWarning('Atajo de teclado deshabilitado');
                    return false;
                }

                // Ctrl+S (guardar página)
                if (e.ctrlKey && e.keyCode === 83) {
                    e.preventDefault();
                    this.showWarning('No se puede guardar la página');
                    return false;
                }

                // Ctrl+C en áreas protegidas
                if (e.ctrlKey && e.keyCode === 67) {
                    const selection = window.getSelection().toString();
                    if (selection.length > 100) {
                        // Permitir copias pequeñas, bloquear copias grandes
                        e.preventDefault();
                        this.showWarning('Copia de grandes cantidades de texto deshabilitada');
                        return false;
                    }
                }
            });

            // Detectar copias masivas
            document.addEventListener('copy', (e) => {
                const selection = window.getSelection().toString();
                if (selection.length > 500) {
                    e.preventDefault();
                    e.clipboardData.setData('text/plain',
                        'Contenido protegido por AtlasCine\nVisita: https://atlascine.com');
                    this.showWarning('Contenido protegido');
                }
            });
        },

        showWarning(message) {
            // Mostrar advertencia temporal
            const warning = document.createElement('div');
            warning.textContent = message;
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(229, 9, 20, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 999999;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(warning);
            setTimeout(() => {
                warning.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => warning.remove(), 300);
            }, 2000);
        }
    };

    // ============================================
    // 3. CONTENT PROTECTION
    // ============================================

    const ContentProtection = {
        init() {
            // Proteger imágenes
            this.protectImages();

            // Agregar marca de agua invisible
            this.addWatermark();

            // Detectar extensiones de descarga
            this.detectDownloadExtensions();
        },

        protectImages() {
            document.addEventListener('DOMContentLoaded', () => {
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    img.setAttribute('draggable', 'false');
                    img.style.userSelect = 'none';
                    img.style.webkitUserSelect = 'none';
                    img.style.msUserSelect = 'none';
                    img.style.mozUserSelect = 'none';

                    // Prevenir guardar imagen
                    img.addEventListener('contextmenu', (e) => e.preventDefault());
                });
            });
        },

        addWatermark() {
            // Agregar marca de agua invisible en metadatos
            const watermark = document.createElement('meta');
            watermark.name = 'copyright';
            watermark.content = `© ${new Date().getFullYear()} AtlasCine. All Rights Reserved.`;
            document.head.appendChild(watermark);

            // Agregar ID único de sesión (fingerprinting)
            const sessionId = this.generateSessionId();
            sessionStorage.setItem('atlascine_session', sessionId);
        },

        generateSessionId() {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2);
            const userAgent = navigator.userAgent;
            return btoa(`${timestamp}-${random}-${userAgent.length}`);
        },

        detectDownloadExtensions() {
            // Detectar si hay extensiones sospechosas
            const testElement = document.createElement('div');
            testElement.id = 'downloadhelper-detector';
            testElement.style.display = 'none';
            document.body.appendChild(testElement);

            setTimeout(() => {
                const computed = window.getComputedStyle(testElement);
                if (computed.display !== 'none') {
                    console.warn('Download extension detected');
                }
                testElement.remove();
            }, 1000);
        }
    };

    // ============================================
    // 4. XSS PROTECTION
    // ============================================

    const XSSProtection = {
        init() {
            // Sanitizar inputs
            this.sanitizeInputs();

            // Proteger contra script injection
            this.preventScriptInjection();
        },

        sanitizeInputs() {
            document.addEventListener('DOMContentLoaded', () => {
                const inputs = document.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        e.target.value = this.sanitize(e.target.value);
                    });
                });
            });
        },

        sanitize(string) {
            const map = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                "/": '&#x2F;',
            };
            const reg = /[<>"'/]/ig;
            return string.replace(reg, (match) => map[match]);
        },

        preventScriptInjection() {
            // Monitorear cambios en el DOM
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeName === 'SCRIPT' && !node.hasAttribute('data-allowed')) {
                            console.warn('Unauthorized script detected and removed');
                            node.remove();
                        }
                    });
                });
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    };

    // ============================================
    // 5. RATE LIMITING & DDOS PROTECTION
    // ============================================

    const RateLimiter = {
        requests: {},
        limits: {
            search: { max: 10, window: 60000 }, // 10 búsquedas por minuto
            api: { max: 30, window: 60000 },    // 30 requests API por minuto
            page: { max: 100, window: 60000 }   // 100 acciones por minuto
        },

        check(action) {
            const now = Date.now();
            const limit = this.limits[action] || this.limits.page;

            if (!this.requests[action]) {
                this.requests[action] = [];
            }

            // Limpiar requests antiguos
            this.requests[action] = this.requests[action].filter(
                time => now - time < limit.window
            );

            // Verificar límite
            if (this.requests[action].length >= limit.max) {
                console.warn(`Rate limit exceeded for ${action}`);
                return false;
            }

            // Agregar nuevo request
            this.requests[action].push(now);
            return true;
        },

        reset(action) {
            if (action) {
                this.requests[action] = [];
            } else {
                this.requests = {};
            }
        }
    };

    // ============================================
    // 6. API KEY PROTECTION
    // ============================================

    const APIKeyProtection = {
        encryptedKeys: {},

        // Ofuscar API keys
        obfuscateKey(key) {
            const parts = key.split('.');
            return parts.map((part, i) => {
                if (i === 1) { // Ofuscar solo la parte del payload
                    return btoa(part).split('').reverse().join('');
                }
                return part;
            }).join('.');
        },

        // Deofuscar API keys
        deobfuscateKey(obfuscated) {
            const parts = obfuscated.split('.');
            return parts.map((part, i) => {
                if (i === 1) {
                    return atob(part.split('').reverse().join(''));
                }
                return part;
            }).join('.');
        },

        // Verificar dominio permitido
        verifyDomain() {
            const allowedDomains = [
                'localhost',
                '127.0.0.1',
                'atlascine.com',
                'www.atlascine.com'
            ];

            const currentDomain = window.location.hostname;
            if (!allowedDomains.includes(currentDomain)) {
                console.error('Unauthorized domain');
                return false;
            }
            return true;
        }
    };

    // ============================================
    // 7. IFRAME PROTECTION
    // ============================================

    const IframeProtection = {
        init() {
            // Prevenir que la página sea embebida en iframe
            if (window.self !== window.top) {
                // La página está en un iframe
                window.top.location = window.self.location;
            }

            // Agregar header X-Frame-Options via meta tag
            const meta = document.createElement('meta');
            meta.httpEquiv = 'X-Frame-Options';
            meta.content = 'DENY';
            document.head.appendChild(meta);
        }
    };

    // ============================================
    // 8. CONSOLE PROTECTION
    // ============================================

    const ConsoleProtection = {
        init() {
            // Deshabilitar console en producción
            if (window.location.hostname !== 'localhost' &&
                window.location.hostname !== '127.0.0.1') {

                const noop = () => {};
                const methods = ['log', 'debug', 'info', 'warn', 'error'];

                methods.forEach(method => {
                    console[method] = noop;
                });
            }
        }
    };

    // ============================================
    // 9. SOURCE CODE PROTECTION
    // ============================================

    const SourceProtection = {
        init() {
            // Agregar comentarios engañosos
            this.addDecoyComments();

            // Ofuscar nombres de variables globales
            this.obfuscateGlobals();
        },

        addDecoyComments() {
            // Los comentarios engañosos ya están en el código minificado
            console.log('%c🔒 Protected by AtlasCine Security System',
                'color: #e50914; font-size: 16px; font-weight: bold;');
        },

        obfuscateGlobals() {
            // Almacenar referencias a funciones importantes de forma ofuscada
            window._ac = window._ac || {};
            window._ac.s = SecurityCore;
            window._ac.c = CopyProtection;
            window._ac.r = RateLimiter;
        }
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    const SecuritySystem = {
        init() {
            console.log('🛡️ Initializing AtlasCine Security System...');

            // Iniciar protecciones
            SecurityCore.startMonitoring();
            CopyProtection.init();
            ContentProtection.init();
            XSSProtection.init();
            IframeProtection.init();
            SourceProtection.init();

            // En producción, deshabilitar console
            if (window.location.hostname !== 'localhost') {
                ConsoleProtection.init();
            }

            console.log('✅ Security System Active');
        },

        // API pública para verificaciones
        checkRateLimit(action) {
            return RateLimiter.check(action);
        },

        verifyDomain() {
            return APIKeyProtection.verifyDomain();
        }
    };

    // Exponer API de seguridad
    window.AtlasCineSecurity = SecuritySystem;

    // Auto-iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SecuritySystem.init());
    } else {
        SecuritySystem.init();
    }

    // Agregar estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        .no-select {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    `;
    document.head.appendChild(style);

})();
