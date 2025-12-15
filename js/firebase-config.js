/**
 * AtlasCine - Firebase Configuration
 * Sistema de base de datos en tiempo real
 */

// Import Firebase modules (usando CDN en index.html)
// Las importaciones se manejan desde el HTML

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjD1z09P98hHYkrf209crCEC9xIerLKdI",
    authDomain: "atlascine-4f46c.firebaseapp.com",
    projectId: "atlascine-4f46c",
    storageBucket: "atlascine-4f46c.firebasestorage.app",
    messagingSenderId: "674352261422",
    appId: "1:674352261422:web:e9e223cadc42ab3702f2bf",
    measurementId: "G-ZRSGSPZKGZ"
};

// Initialize Firebase
let app, analytics, db;

function initializeFirebase() {
    try {
        // Initialize Firebase App
        app = firebase.initializeApp(firebaseConfig);

        // Initialize Analytics
        analytics = firebase.analytics();

        // Initialize Firestore Database
        db = firebase.firestore();

        console.log('%c🔥 Firebase Initialized Successfully', 'color: #FFA000; font-weight: bold;');
        console.log('%c📊 Analytics Active', 'color: #4CAF50;');
        console.log('%c💾 Firestore Database Connected', 'color: #2196F3;');

        return true;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

// Export for global access
window.firebaseApp = app;
window.firebaseAnalytics = analytics;
window.firebaseDB = db;
window.initializeFirebase = initializeFirebase;
