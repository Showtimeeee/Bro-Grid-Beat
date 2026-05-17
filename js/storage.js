var Storage = (function() {
    var PATTERN_KEY = 'brogrid_patterns';
    var SETTINGS_KEY = 'brogrid_settings';
    var MAX_SLOTS = 8;
    
    function getPatterns() {
        try {
            var data = localStorage.getItem(PATTERN_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Storage read error:', e);
            return {};
        }
    }
    
    function savePatterns(patterns) {
        try {
            localStorage.setItem(PATTERN_KEY, JSON.stringify(patterns));
            return true;
        } catch (e) {
            console.error('Storage write error:', e);
            return false;
        }
    }
    
    function getSettings() {
        try {
            var data = localStorage.getItem(SETTINGS_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    }
    
    function saveSettings(settings) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            return true;
        } catch (e) {
            return false;
        }
    }
    
    return {
        savePattern: function(slot, pattern, name) {
            var patterns = getPatterns();
            patterns[slot] = {
                name: name || 'Slot ' + (slot + 1),
                pattern: pattern,
                savedAt: Date.now()
            };
            return savePatterns(patterns);
        },
        
        loadPattern: function(slot) {
            var patterns = getPatterns();
            return patterns[slot] || null;
        },
        
        deletePattern: function(slot) {
            var patterns = getPatterns();
            delete patterns[slot];
            return savePatterns(patterns);
        },
        
        getAllPatterns: function() {
            return getPatterns();
        },
        
        saveCurrentSettings: function(settings) {
            return saveSettings(settings);
        },
        
        loadSettings: function() {
            return getSettings();
        },
        
        exportPattern: function(pattern, name) {
            var data = {
                name: name || 'Pattern',
                version: '1.0',
                pattern: pattern,
                exportedAt: Date.now()
            };
            return JSON.stringify(data);
        },
        
        importPattern: function(jsonString) {
            try {
                var data = JSON.parse(jsonString);
                if (data.pattern && Array.isArray(data.pattern)) {
                    return {
                        name: data.name || 'Imported',
                        pattern: data.pattern
                    };
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        
        clearAll: function() {
            localStorage.removeItem(PATTERN_KEY);
            localStorage.removeItem(SETTINGS_KEY);
        }
    };
})();