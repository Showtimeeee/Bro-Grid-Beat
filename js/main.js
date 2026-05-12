(function(){
    const STEPS = 16;
    const ROWS = 8;
    
    const SOUND_LIBRARY = {
        kick: {
            name: 'Kick',
            category: 'drums',
            sounds: [
                { name: 'Deep 808', desc: 'Fat sub kick', params: { type: 'fm', freq: 45, attack: 0.001, decay: 0.45, drive: 0.8, punch: 1.2 } },
                { name: 'Punch Kick', desc: 'Hard punch', params: { type: 'fm', freq: 55, attack: 0.001, decay: 0.3, drive: 0.6, punch: 1.5 } },
                { name: 'Kick n Bass', desc: 'K+B layered', params: { type: 'fm', freq: 50, attack: 0.001, decay: 0.4, drive: 0.7, punch: 1.3 } },
                { name: 'Club Kick', desc: 'Club ready', params: { type: 'fm', freq: 48, attack: 0.001, decay: 0.35, drive: 0.9, punch: 1.4 } },
                { name: 'Lo-Fi Kick', desc: 'Muffled lofi', params: { type: 'fm', freq: 40, attack: 0.005, decay: 0.5, drive: 0.5, punch: 0.8 } },
                { name: 'Heavy Drop', desc: 'Dubstep style', params: { type: 'fm', freq: 35, attack: 0.01, decay: 0.6, drive: 1.0, punch: 1.8 } }
            ]
        },
        snare: {
            name: 'Snare',
            category: 'drums',
            sounds: [
                { name: 'Crisp Snap', desc: 'Sharp snap', params: { type: 'noise', freq: 200, decay: 0.15, filter: 8000, resonance: 0.3 } },
                { name: 'Fat Snare', desc: 'Big punchy', params: { type: 'noise', freq: 180, decay: 0.2, filter: 6000, resonance: 0.6 } },
                { name: 'Tight Snap', desc: 'Snappy tight', params: { type: 'noise', freq: 300, decay: 0.1, filter: 10000, resonance: 0.2 } },
                { name: 'Ringy Snare', desc: 'Metallic ring', params: { type: 'noise', freq: 400, decay: 0.12, filter: 5000, resonance: 0.9 } },
                { name: 'Trap Snare', desc: 'Hard trap', params: { type: 'noise', freq: 220, decay: 0.18, filter: 7000, resonance: 0.5 } },
                { name: 'Vinyl Snare', desc: 'Lo-fi vinyl', params: { type: 'noise', freq: 250, decay: 0.22, filter: 4000, resonance: 0.7 } }
            ]
        },
        hihat: {
            name: 'Hi-Hat',
            category: 'drums',
            sounds: [
                { name: 'Closed Hat', desc: 'Tight closed', params: { type: 'hihat', freq: 8000, decay: 0.05, filter: 12000, open: 0 } },
                { name: 'Open Hat', desc: 'Splashy open', params: { type: 'hihat', freq: 7000, decay: 0.3, filter: 10000, open: 1 } },
                { name: 'Pedal Hat', desc: 'Pedal hit', params: { type: 'hihat', freq: 6000, decay: 0.08, filter: 8000, open: 0 } },
                { name: '808 Hat', desc: 'Classic 808', params: { type: 'hihat', freq: 10000, decay: 0.1, filter: 15000, open: 0 } },
                { name: 'Clanky Hat', desc: 'Metallic clank', params: { type: 'hihat', freq: 9000, decay: 0.15, filter: 11000, open: 1 } },
                { name: 'Sizzle Hat', desc: 'Sizzly top', params: { type: 'hihat', freq: 12000, decay: 0.2, filter: 18000, open: 1 } }
            ]
        },
        clap: {
            name: 'Clap',
            category: 'drums',
            sounds: [
                { name: '808 Clap', desc: 'Classic clap', params: { type: 'clap', freq: 1500, decay: 0.15, filter: 4000, layers: 3 } },
                { name: 'Room Clap', desc: 'Spacious', params: { type: 'clap', freq: 1200, decay: 0.25, filter: 3000, layers: 4 } },
                { name: 'Tight Clap', desc: 'Snappy clap', params: { type: 'clap', freq: 2000, decay: 0.1, filter: 5000, layers: 2 } },
                { name: 'Layered Clap', desc: 'Multi hit', params: { type: 'clap', freq: 1800, decay: 0.18, filter: 3500, layers: 5 } },
                { name: 'Vintage Clap', desc: 'Old school', params: { type: 'clap', freq: 1000, decay: 0.22, filter: 2500, layers: 3 } },
                { name: 'Epic Clap', desc: 'Huge clap', params: { type: 'clap', freq: 1600, decay: 0.28, filter: 4500, layers: 6 } }
            ]
        },
        tom: {
            name: 'Tom',
            category: 'drums',
            sounds: [
                { name: 'Floor Tom', desc: 'Deep tom', params: { type: 'tom', freq: 100, decay: 0.35, filter: 300, pitch: -5 } },
                { name: 'Mid Tom', desc: 'Mid tom', params: { type: 'tom', freq: 150, decay: 0.25, filter: 400, pitch: 0 } },
                { name: 'Hi Tom', desc: 'High tom', params: { type: 'tom', freq: 200, decay: 0.2, filter: 500, pitch: 5 } },
                { name: '808 Tom', desc: '808 tom', params: { type: 'tom', freq: 120, decay: 0.3, filter: 350, pitch: -3 } },
                { name: 'Acoustic Tom', desc: 'Natural tom', params: { type: 'tom', freq: 130, decay: 0.28, filter: 280, pitch: 0 } },
                { name: 'Electronic Tom', desc: 'Synth tom', params: { type: 'tom', freq: 180, decay: 0.22, filter: 600, pitch: 2 } }
            ]
        },
        perc: {
            name: 'Perc',
            category: 'drums',
            sounds: [
                { name: 'Conga Hit', desc: 'Latin conga', params: { type: 'perc', freq: 800, decay: 0.2, filter: 2000, texture: 'tropical' } },
                { name: 'Bongo Hit', desc: 'Fast bongo', params: { type: 'perc', freq: 1200, decay: 0.12, filter: 3000, texture: 'fast' } },
                { name: 'Timbale Hit', desc: 'Sharp timbale', params: { type: 'perc', freq: 2000, decay: 0.08, filter: 5000, texture: 'sharp' } },
                { name: 'Cowbell Hit', desc: 'Classic cowbell', params: { type: 'perc', freq: 1800, decay: 0.15, filter: 4000, texture: 'metallic' } },
                { name: 'Shaker Hit', desc: 'Smooth shaker', params: { type: 'perc', freq: 6000, decay: 0.1, filter: 12000, texture: 'noise' } },
                { name: 'Rimshot Hit', desc: 'Rimshot', params: { type: 'perc', freq: 2500, decay: 0.1, filter: 6000, texture: 'hard' } }
            ]
        },
        bass: {
            name: 'Bass',
            category: 'bass',
            sounds: [
                { name: '808 Sub', desc: 'Deep sub bass', params: { type: 'bass', freq: 55, decay: 0.4, filter: 100, growl: 0.2 } },
                { name: 'Wobble Bass', desc: 'Dubstep wobble', params: { type: 'bass', freq: 50, decay: 0.3, filter: 400, growl: 0.8 } },
                { name: 'Plucky Bass', desc: 'Short pluck', params: { type: 'bass', freq: 80, decay: 0.15, filter: 800, growl: 0.3 } },
                { name: 'Reese Bass', desc: 'Reese style', params: { type: 'bass', freq: 60, decay: 0.35, filter: 200, growl: 0.6 } },
                { name: 'Acid Bass', desc: '303 style', params: { type: 'bass', freq: 70, decay: 0.12, filter: 1200, growl: 0.9 } },
                { name: 'FM Bass', desc: 'FM synth bass', params: { type: 'bass', freq: 65, decay: 0.25, filter: 600, growl: 0.5 } }
            ]
        },
        synth: {
            name: 'Synth',
            category: 'synth',
            sounds: [
                { name: 'Super Saw', desc: 'Massive saw', params: { type: 'synth', freq: 440, decay: 0.3, filter: 2000, detune: 0.1 } },
                { name: 'Pluck Lead', desc: 'Short pluck', params: { type: 'synth', freq: 550, decay: 0.1, filter: 3000, detune: 0 } },
                { name: 'Pad Warm', desc: 'Warm pad', params: { type: 'synth', freq: 330, decay: 0.5, filter: 1500, detune: 0.15 } },
                { name: 'Stab Chord', desc: 'Chord stab', params: { type: 'synth', freq: 220, decay: 0.15, filter: 2500, detune: 0.2 } },
                { name: 'Lead High', desc: 'High lead', params: { type: 'synth', freq: 880, decay: 0.2, filter: 4000, detune: 0 } },
                { name: 'Arp Fast', desc: 'Fast arp', params: { type: 'synth', freq: 660, decay: 0.08, filter: 3500, detune: 0.05 } }
            ]
        }
    };
    
    const PRESETS = [
        { name: 'Basic Beat', icon: '🥁', desc: 'Simple 4/4', pattern: [[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#00f5ff' },
        { name: 'Trap Beat', icon: '🔥', desc: 'Heavy trap', pattern: [[1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#ff00aa' },
        { name: 'House', icon: '🏠', desc: '4 on floor', pattern: [[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#f0ff00' },
        { name: 'Breakbeat', icon: '💥', desc: 'Jungle break', pattern: [[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#00ff88' },
        { name: 'Hip-Hop', icon: '🎤', desc: 'Classic hip hop', pattern: [[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#ff6600' },
        { name: 'Techno', icon: '⚡', desc: 'Industrial techno', pattern: [[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#b400ff' },
        { name: 'DnB', icon: '🎧', desc: 'Drum n Bass', pattern: [[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], color: '#00ffcc' }
    ];
    
    const COLORS = [
        { base: '#00f5ff', glow: 'rgba(0, 245, 255, 0.6)' },
        { base: '#ff00aa', glow: 'rgba(255, 0, 170, 0.6)' },
        { base: '#f0ff00', glow: 'rgba(240, 255, 0, 0.6)' },
        { base: '#00ff88', glow: 'rgba(0, 255, 136, 0.6)' },
        { base: '#b400ff', glow: 'rgba(180, 0, 255, 0.6)' },
        { base: '#ff6600', glow: 'rgba(255, 102, 0, 0.6)' },
        { base: '#00ccaa', glow: 'rgba(0, 204, 170, 0.6)' },
        { base: '#ff3366', glow: 'rgba(255, 51, 102, 0.6)' }
    ];
    
    const TRACK_DEFAULTS = ['kick', 'snare', 'hihat', 'clap', 'tom', 'perc', 'bass', 'synth'];
    
    let pattern = Array(ROWS).fill().map(() => Array(STEPS).fill(false));
    let currentStep = 0;
    let isPlaying = false;
    let timerId = null;
    let bpm = 128;
    let audioCtx = null;
    let selectedRow = null;
    
    let channels = TRACK_DEFAULTS.map((name, i) => ({
        name: SOUND_LIBRARY[name]?.name || name,
        soundKey: name,
        soundIndex: 0,
        volume: 0.8,
        pan: 0,
        muted: false,
        solo: false,
        color: COLORS[i]
    }));
    
    let effects = {
        reverb: { enabled: false, decay: 2, wet: 0.3 },
        delay: { enabled: false, time: 0.25, feedback: 0.4, wet: 0.3 }
    };
    
    let delayNode = null;
    let delayFeedback = null;
    let reverbNode = null;
    let masterGain = null;
    let compressorNode = null;
    let distortionNode = null;
    let eqFilters = {};
    
    const masterControls = {
        masterVolume: 0.8,
        bassBoost: 0,
        trebleBoost: 0,
        attackTime: 0.05,
        releaseTime: 0.15,
        compressor: 0,
        driveAmount: 0,
        eq: {
            sub: 50,
            bass: 50,
            low: 50,
            mid: 50,
            high: 50,
            presence: 50
        }
    };
    
    const canvas = document.getElementById('spectrumCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const container = canvas.parentElement;
        const w = container.clientWidth - 16;
        canvas.width = w;
        canvas.height = 90;
    }
    window.addEventListener('resize', resizeCanvas);
    
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            initMasterChain();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }
    
    function initMasterChain() {
        masterGain = audioCtx.createGain();
        masterGain.gain.value = masterControls.masterVolume;
        
        compressorNode = audioCtx.createDynamicsCompressor();
        compressorNode.threshold.value = -24;
        compressorNode.knee.value = 30;
        compressorNode.ratio.value = 4;
        compressorNode.attack.value = masterControls.attackTime;
        compressorNode.release.value = masterControls.releaseTime;
        
        distortionNode = audioCtx.createWaveShaper();
        distortionNode.curve = makeDistortionCurve(0);
        
        eqFilters.sub = audioCtx.createBiquadFilter();
        eqFilters.sub.type = 'lowshelf';
        eqFilters.sub.frequency.value = 60;
        eqFilters.sub.gain.value = 0;
        
        eqFilters.bass = audioCtx.createBiquadFilter();
        eqFilters.bass.type = 'peaking';
        eqFilters.bass.frequency.value = 150;
        eqFilters.bass.Q.value = 1;
        eqFilters.bass.gain.value = 0;
        
        eqFilters.low = audioCtx.createBiquadFilter();
        eqFilters.low.type = 'peaking';
        eqFilters.low.frequency.value = 400;
        eqFilters.low.Q.value = 1;
        eqFilters.low.gain.value = 0;
        
        eqFilters.mid = audioCtx.createBiquadFilter();
        eqFilters.mid.type = 'peaking';
        eqFilters.mid.frequency.value = 1000;
        eqFilters.mid.Q.value = 1;
        eqFilters.mid.gain.value = 0;
        
        eqFilters.high = audioCtx.createBiquadFilter();
        eqFilters.high.type = 'peaking';
        eqFilters.high.frequency.value = 4000;
        eqFilters.high.Q.value = 1;
        eqFilters.high.gain.value = 0;
        
        eqFilters.presence = audioCtx.createBiquadFilter();
        eqFilters.presence.type = 'highshelf';
        eqFilters.presence.frequency.value = 8000;
        eqFilters.presence.gain.value = 0;
        
        masterGain.connect(eqFilters.sub);
        eqFilters.sub.connect(eqFilters.bass);
        eqFilters.bass.connect(eqFilters.low);
        eqFilters.low.connect(eqFilters.mid);
        eqFilters.mid.connect(eqFilters.high);
        eqFilters.high.connect(eqFilters.presence);
        
        if (masterControls.compressor > 0) {
            eqFilters.presence.connect(compressorNode);
            compressorNode.connect(distortionNode);
        } else {
            eqFilters.presence.connect(distortionNode);
        }
        
        distortionNode.connect(audioCtx.destination);
    }
    
    function makeDistortionCurve(amount) {
        if (amount === 0) return null;
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < samples; i++) {
            const x = (i * 2) / samples - 1;
            curve[i] = ((3 + amount * 100) * x * 20 * deg) / (Math.PI + amount * 100 * Math.abs(x));
        }
        return curve;
    }
    
    function updateMasterControls() {
        if (!masterGain) return;
        
        masterGain.gain.value = masterControls.masterVolume;
        
        eqFilters.sub.gain.value = (masterControls.eq.sub - 50) * 0.48;
        eqFilters.bass.gain.value = (masterControls.eq.bass - 50) * 0.48;
        eqFilters.low.gain.value = (masterControls.eq.low - 50) * 0.48;
        eqFilters.mid.gain.value = (masterControls.eq.mid - 50) * 0.48;
        eqFilters.high.gain.value = (masterControls.eq.high - 50) * 0.48;
        eqFilters.presence.gain.value = (masterControls.eq.presence - 50) * 0.48;
        
        compressorNode.attack.value = masterControls.attackTime / 1000;
        compressorNode.release.value = masterControls.releaseTime / 1000;
        compressorNode.threshold.value = -24 - (masterControls.compressor * 0.36);
        compressorNode.ratio.value = 1 + (masterControls.compressor * 0.12);
        
        distortionNode.curve = makeDistortionCurve(masterControls.driveAmount);
    }
    
    function updateKnobIndicator(knobId, value, min, max) {
        const indicator = document.getElementById(knobId);
        if (!indicator) return;
        
        const normalized = (value - min) / (max - min);
        const angle = -135 + (normalized * 270);
        indicator.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }
    
    function initKnobControls() {
        const masterVolume = document.getElementById('masterVolume');
        masterVolume.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.masterVolume = val / 100;
            document.getElementById('masterVolumeValue').textContent = val + '%';
            updateKnobIndicator('masterVolumeIndicator', val, 0, 100);
            updateMasterControls();
        });
        
        const bassBoost = document.getElementById('bassBoost');
        bassBoost.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.bassBoost = val;
            document.getElementById('bassBoostValue').textContent = val + ' dB';
            updateKnobIndicator('bassBoostIndicator', val + 12, -12, 12);
            eqFilters.bass.frequency.value = 150;
            eqFilters.bass.gain.value = val;
        });
        
        const trebleBoost = document.getElementById('trebleBoost');
        trebleBoost.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.trebleBoost = val;
            document.getElementById('trebleBoostValue').textContent = val + ' dB';
            updateKnobIndicator('trebleBoostIndicator', val + 12, -12, 12);
            eqFilters.high.gain.value = val;
        });
        
        const attackTime = document.getElementById('attackTime');
        attackTime.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.attackTime = val;
            document.getElementById('attackTimeValue').textContent = val + 'ms';
            updateKnobIndicator('attackTimeIndicator', val, 1, 100);
            updateMasterControls();
        });
        
        const releaseTime = document.getElementById('releaseTime');
        releaseTime.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.releaseTime = val;
            document.getElementById('releaseTimeValue').textContent = val + 'ms';
            updateKnobIndicator('releaseTimeIndicator', val, 10, 500);
            updateMasterControls();
        });
        
        const compressor = document.getElementById('compressor');
        compressor.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.compressor = val;
            document.getElementById('compressorValue').textContent = val === 0 ? 'OFF' : val + '%';
            updateKnobIndicator('compressorIndicator', val, 0, 100);
            updateMasterControls();
        });
        
        const driveAmount = document.getElementById('driveAmount');
        driveAmount.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.driveAmount = val;
            document.getElementById('driveValue').textContent = val === 0 ? 'OFF' : val + '%';
            updateKnobIndicator('driveIndicator', val, 0, 100);
            updateMasterControls();
        });
        
        ['sub', 'bass', 'low', 'mid', 'high', 'pres'].forEach(band => {
            const slider = document.getElementById('eq-' + band);
            slider.addEventListener('input', (e) => {
                masterControls.eq[band] = parseInt(e.target.value);
                updateMasterControls();
            });
        });
        
        updateKnobIndicator('masterVolumeIndicator', 80, 0, 100);
        updateKnobIndicator('bassBoostIndicator', 12, -12, 12);
        updateKnobIndicator('trebleBoostIndicator', 12, -12, 12);
        updateKnobIndicator('attackTimeIndicator', 50, 1, 100);
        updateKnobIndicator('releaseTimeIndicator', 150, 10, 500);
        updateKnobIndicator('compressorIndicator', 0, 0, 100);
        updateKnobIndicator('driveIndicator', 0, 0, 100);
    }
    
    function initEffects() {
        if (!audioCtx) return;
        
        reverbNode = audioCtx.createConvolver();
        const reverbBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const data = reverbBuffer.getChannelData(ch);
            for (let i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
            }
        }
        reverbNode.buffer = reverbBuffer;
        
        delayNode = audioCtx.createDelay(1);
        delayNode.delayTime.value = effects.delay.time;
        
        delayFeedback = audioCtx.createGain();
        delayFeedback.gain.value = effects.delay.feedback;
        
        const delayWet = audioCtx.createGain();
        delayWet.gain.value = effects.delay.wet;
        
        delayNode.connect(delayFeedback);
        delayFeedback.connect(delayNode);
        delayNode.connect(delayWet);
    }
    
    function drawVisualizer(frequencies = []) {
        const w = canvas.width;
        const h = canvas.height;
        
        ctx.fillStyle = 'rgba(5, 5, 16, 0.4)';
        ctx.fillRect(0, 0, w, h);
        
        const barCount = 48;
        const barWidth = w / barCount;
        
        for (let i = 0; i < barCount; i++) {
            let intensity;
            if (frequencies.length > 0) {
                intensity = frequencies[i] || 0.1;
            } else {
                intensity = 0.1 + Math.sin(i * 0.25 + Date.now() * 0.001) * 0.08;
            }
            
            const barHeight = 6 + intensity * (h - 14);
            const hue = 180 + intensity * 60;
            
            const gradient = ctx.createLinearGradient(0, h - barHeight, 0, h);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.9)`);
            gradient.addColorStop(1, `hsla(${hue}, 100%, 40%, 0.3)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(i * barWidth + 2, h - barHeight, barWidth - 4, barHeight);
            
            if (intensity > 0.6) {
                ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`;
                ctx.shadowBlur = 12;
                ctx.fillRect(i * barWidth + 2, h - barHeight, barWidth - 4, 3);
                ctx.shadowBlur = 0;
            }
        }
        
        ctx.strokeStyle = 'rgba(0, 245, 255, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = h - (i * h / 4);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }
    
    let particles = [];
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 5 + 2;
            this.speedX = (Math.random() - 0.5) * 10;
            this.speedY = (Math.random() - 0.5) * 10;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.96;
            this.speedY *= 0.96;
            this.life -= this.decay;
            this.size *= 0.96;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createParticles(row, step, cellEl) {
        if (channels[row].muted && hasSolo()) return;
        
        const rect = cellEl.getBoundingClientRect();
        const containerRect = document.querySelector('.sequencer-container').getBoundingClientRect();
        const centerX = rect.left - containerRect.left + rect.width / 2;
        const centerY = rect.top - containerRect.top + rect.height / 2;
        
        const color = COLORS[row].base;
        const count = 10 + Math.floor(Math.random() * 10);
        
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(centerX, centerY, color));
        }
        
        if (particles.length > 0 && !window.particleAnimationActive) {
            window.particleAnimationActive = true;
            requestAnimationFrame(updateParticles);
        }
    }
    
    function updateParticles() {
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(updateParticles);
        } else {
            window.particleAnimationActive = false;
        }
    }
    
    function hasSolo() {
        return channels.some(ch => ch.solo);
    }
    
    function triggerVisualizerHit(activeRows = []) {
        let frame = 0;
        const maxFrames = 25;
        
        function animate() {
            frame++;
            const progress = frame / maxFrames;
            const intensities = [];
            
            for (let i = 0; i < 48; i++) {
                let intensity = 0.1;
                
                if (frame < maxFrames) {
                    const wave = Math.sin(i * 0.25 + frame * 0.25) * 0.5 + 0.5;
                    intensity = 0.15 + (1 - progress) * wave * 0.85;
                    
                    activeRows.forEach(row => {
                        const centerBar = 6 + row * 3;
                        const dist = Math.abs(i - centerBar) / 12;
                        intensity += (1 - progress) * (1 - dist) * 0.6;
                    });
                }
                
                intensities.push(Math.min(1, intensity));
            }
            
            drawVisualizer(intensities);
            
            if (frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                drawVisualizer([]);
            }
        }
        
        animate();
    }
    
    function playKick(p, now, volume, panner) {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        const gain2 = audioCtx.createGain();
        const drive = audioCtx.createWaveShaper();
        const filter = audioCtx.createBiquadFilter();
        
        let curve = new Float32Array(256);
        for (let i = 0; i < 256; i++) {
            let x = (i / 128) - 1;
            let y = Math.tanh(x * p.drive * 3);
            curve[i] = y;
        }
        drive.curve = curve;
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(p.freq * 2, now);
        osc1.frequency.exponentialRampToValueAtTime(p.freq, now + 0.05);
        osc1.frequency.exponentialRampToValueAtTime(p.freq * 0.5, now + p.decay);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(p.freq * 4, now);
        osc2.frequency.exponentialRampToValueAtTime(p.freq * 0.5, now + p.decay * 0.5);
        
        gain1.gain.setValueAtTime(volume * p.punch, now);
        gain1.gain.exponentialRampToValueAtTime(volume * 0.5, now + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        gain2.gain.setValueAtTime(volume * 0.3, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + p.decay * 0.3);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(p.freq * 8, now);
        filter.frequency.exponentialRampToValueAtTime(p.freq * 2, now + p.decay);
        filter.Q.value = 2;
        
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(drive);
        gain2.connect(drive);
        drive.connect(filter);
        filter.connect(panner);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + p.decay + 0.1);
        osc2.stop(now + p.decay * 0.5 + 0.1);
    }
    
    function playSnare(p, now, volume, panner) {
        const osc = audioCtx.createOscillator();
        const noise = audioCtx.createBufferSource();
        const noiseGain = audioCtx.createGain();
        const oscGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        const noiseFilter = audioCtx.createBiquadFilter();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(p.freq * 2, now);
        osc.frequency.exponentialRampToValueAtTime(p.freq, now + 0.05);
        
        const bufferSize = audioCtx.sampleRate * p.decay;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }
        noise.buffer = buffer;
        
        filter.type = 'bandpass';
        filter.frequency.value = p.freq;
        filter.Q.value = p.resonance * 10;
        
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = p.filter;
        noiseFilter.Q.value = 1;
        
        oscGain.gain.setValueAtTime(volume * 0.4, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + p.decay * 0.5);
        
        noiseGain.gain.setValueAtTime(volume * 0.8, now);
        noiseGain.gain.setValueAtTime(volume * 0.8, now + 0.005);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        filter.connect(panner);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(panner);
        
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
        noise.start(now);
    }
    
    function playHihat(p, now, volume, panner) {
        const noise = audioCtx.createBufferSource();
        const noiseGain = audioCtx.createGain();
        const filter1 = audioCtx.createBiquadFilter();
        const filter2 = audioCtx.createBiquadFilter();
        const hpFilter = audioCtx.createBiquadFilter();
        
        const bufferSize = audioCtx.sampleRate * (p.open ? 0.5 : p.decay);
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }
        noise.buffer = buffer;
        
        filter1.type = 'bandpass';
        filter1.frequency.value = p.freq * 0.5;
        filter1.Q.value = 1;
        
        filter2.type = 'highpass';
        filter2.frequency.value = p.filter * 0.8;
        filter2.Q.value = 0.5;
        
        hpFilter.type = 'highpass';
        hpFilter.frequency.value = 7000;
        hpFilter.Q.value = 0.3;
        
        noiseGain.gain.setValueAtTime(volume * 0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (p.open ? p.decay : p.decay * 2));
        
        noise.connect(filter1);
        filter1.connect(filter2);
        filter2.connect(hpFilter);
        hpFilter.connect(noiseGain);
        noiseGain.connect(panner);
        
        noise.start(now);
        noise.stop(now + (p.open ? 0.5 : p.decay * 2) + 0.1);
    }
    
    function playClap(p, now, volume, panner) {
        for (let i = 0; i < p.layers; i++) {
            const noise = audioCtx.createBufferSource();
            const noiseGain = audioCtx.createGain();
            const filter = audioCtx.createBiquadFilter();
            
            const bufferSize = audioCtx.sampleRate * p.decay;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
                data[j] = (Math.random() * 2 - 1);
            }
            noise.buffer = buffer;
            
            filter.type = 'bandpass';
            filter.frequency.value = p.freq + (i * 200);
            filter.Q.value = 2;
            
            const startTime = now + (i * 0.01);
            noiseGain.gain.setValueAtTime(0, startTime);
            noiseGain.gain.linearRampToValueAtTime(volume * 0.8, startTime + 0.005);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + p.decay);
            
            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(panner);
            
            noise.start(startTime);
            noise.stop(startTime + p.decay + 0.1);
        }
    }
    
    function playTom(p, now, volume, panner) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.type = 'sine';
        const startFreq = p.freq * Math.pow(2, p.pitch / 12);
        osc.frequency.setValueAtTime(startFreq * 1.5, now);
        osc.frequency.exponentialRampToValueAtTime(startFreq, now + 0.03);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 0.7, now + p.decay);
        
        filter.type = 'lowpass';
        filter.frequency.value = p.filter * 4;
        filter.frequency.exponentialRampToValueAtTime(p.filter, now + p.decay);
        
        gain.gain.setValueAtTime(volume * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
    }
    
    function playPerc(p, now, volume, panner) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.type = p.texture === 'metallic' ? 'square' : p.texture === 'noise' ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(p.freq * 1.5, now);
        osc.frequency.exponentialRampToValueAtTime(p.freq, now + 0.01);
        
        filter.type = 'bandpass';
        filter.frequency.value = p.filter;
        filter.Q.value = p.texture === 'metallic' ? 15 : 5;
        
        gain.gain.setValueAtTime(volume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
        
        if (p.texture !== 'noise') {
            const noise = audioCtx.createBufferSource();
            const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * p.decay, audioCtx.sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
                noiseData[i] = (Math.random() * 2 - 1) * 0.3;
            }
            noise.buffer = noiseBuffer;
            
            const noiseGain = audioCtx.createGain();
            noiseGain.gain.setValueAtTime(volume * 0.2, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + p.decay * 0.5);
            
            noise.connect(noiseGain);
            noiseGain.connect(panner);
            noise.start(now);
        }
    }
    
    function playBass(p, now, volume, panner) {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc1.type = 'sawtooth';
        osc1.frequency.value = p.freq;
        
        osc2.type = 'sine';
        osc2.frequency.value = p.freq * 0.5;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(p.filter * 3, now);
        filter.frequency.exponentialRampToValueAtTime(p.filter, now + p.decay);
        filter.Q.value = 5 + p.growl * 10;
        
        gain.gain.setValueAtTime(volume * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        osc1.connect(filter);
        osc2.connect(gain);
        filter.connect(gain);
        gain.connect(panner);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + p.decay + 0.1);
        osc2.stop(now + p.decay + 0.1);
        
        if (p.growl > 0.5) {
            const lfo = audioCtx.createOscillator();
            const lfoGain = audioCtx.createGain();
            lfo.frequency.value = 5 + p.growl * 10;
            lfoGain.gain.value = p.filter * 0.3;
            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            lfo.start(now);
            lfo.stop(now + p.decay + 0.1);
        }
    }
    
    function playSynth(p, now, volume, panner) {
        const oscs = [];
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        for (let i = 0; i < 3; i++) {
            const osc = audioCtx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.value = p.freq * (1 + (i * p.detune));
            oscs.push(osc);
        }
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(p.filter * 0.5, now);
        filter.frequency.exponentialRampToValueAtTime(p.filter, now + 0.05);
        filter.frequency.exponentialRampToValueAtTime(p.filter * 0.3, now + p.decay);
        filter.Q.value = 3;
        
        gain.gain.setValueAtTime(volume * 0.5, now);
        gain.gain.setValueAtTime(volume * 0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.decay);
        
        oscs.forEach(osc => {
            osc.connect(filter);
        });
        filter.connect(gain);
        gain.connect(panner);
        
        oscs.forEach(osc => {
            osc.start(now);
            osc.stop(now + p.decay + 0.1);
        });
    }
    
    function playSound(row, previewOnly = false) {
        initAudio();
        
        if (channels[row].muted && hasSolo() && !previewOnly) return;
        
        const ch = channels[row];
        const soundKey = ch.soundKey;
        const soundData = SOUND_LIBRARY[soundKey];
        if (!soundData) return;
        
        const sound = soundData.sounds[ch.soundIndex];
        const now = audioCtx.currentTime;
        
        const gainNode = audioCtx.createGain();
        const panner = audioCtx.createStereoPanner();
        
        gainNode.connect(panner);
        
        if (masterGain) {
            panner.connect(masterGain);
        } else {
            panner.connect(audioCtx.destination);
        }
        
        const volume = ch.volume * 0.6;
        
        switch (sound.params.type) {
            case 'fm': playKick(sound.params, now, volume, panner); break;
            case 'noise': playSnare(sound.params, now, volume, panner); break;
            case 'hihat': playHihat(sound.params, now, volume, panner); break;
            case 'clap': playClap(sound.params, now, volume, panner); break;
            case 'tom': playTom(sound.params, now, volume, panner); break;
            case 'perc': playPerc(sound.params, now, volume, panner); break;
            case 'bass': playBass(sound.params, now, volume, panner); break;
            case 'synth': playSynth(sound.params, now, volume, panner); break;
        }
        
        if (effects.delay.enabled && delayNode) {
            const delayGain = audioCtx.createGain();
            delayGain.gain.value = effects.delay.wet;
            panner.connect(delayGain);
            delayGain.connect(delayNode);
            const delayOutput = audioCtx.createGain();
            delayNode.connect(delayOutput);
            if (masterGain) {
                delayOutput.connect(masterGain);
            } else {
                delayOutput.connect(audioCtx.destination);
            }
        }
        
        if (effects.reverb.enabled && reverbNode) {
            const reverbGain = audioCtx.createGain();
            reverbGain.gain.value = effects.reverb.wet;
            panner.connect(reverbGain);
            reverbGain.connect(reverbNode);
            const reverbOutput = audioCtx.createGain();
            reverbNode.connect(reverbOutput);
            if (masterGain) {
                reverbOutput.connect(masterGain);
            } else {
                reverbOutput.connect(audioCtx.destination);
            }
        }
        
        if (!previewOnly) {
            triggerVisualizerHit([row]);
        }
    }
    
    let cellsElements = [];
    
    function showNotification(text, color = '#00f5ff') {
        const notif = document.getElementById('notification');
        notif.textContent = text;
        notif.style.borderColor = color;
        notif.style.boxShadow = `0 0 20px ${color}44`;
        notif.classList.add('visible');
        setTimeout(() => notif.classList.remove('visible'), 2000);
    }
    
    function buildHelpTooltip() {
        const tooltip = document.getElementById('helpTooltip');
        tooltip.innerHTML = `
            <div class="tooltip-section">
                <div class="tooltip-title">QUICK START</div>
                <div class="tooltip-item">1. Click preset to load beat</div>
                <div class="tooltip-item">2. Click cells to toggle notes</div>
                <div class="tooltip-item">3. Click track name to change sound</div>
                <div class="tooltip-item">4. Press PLAY or SPACE</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-title">TRACKS</div>
                <div class="tooltip-item">KICK - Kick drums</div>
                <div class="tooltip-item">SNARE - Snare drums</div>
                <div class="tooltip-item">HI-HAT - Hi-hats</div>
                <div class="tooltip-item">CLAP - Claps</div>
                <div class="tooltip-item">TOM - Toms</div>
                <div class="tooltip-item">PERC - Percussion</div>
                <div class="tooltip-item">BASS - Bass</div>
                <div class="tooltip-item">SYNTH - Synth stabs</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-title">MIXER</div>
                <div class="tooltip-item">M - Mute track</div>
                <div class="tooltip-item">S - Solo track</div>
                <div class="tooltip-item">Slide - Volume</div>
            </div>
        `;
    }
    
    function buildPresetSection() {
        const grid = document.getElementById('presetGrid');
        grid.innerHTML = '';
        
        PRESETS.forEach((preset) => {
            const card = document.createElement('div');
            card.className = 'preset-card';
            card.style.setProperty('--card-color', preset.color);
            card.style.setProperty('--card-glow', preset.color + '66');
            card.innerHTML = `
                <div class="preset-icon">${preset.icon}</div>
                <div class="preset-name">${preset.name}</div>
                <div class="preset-desc">${preset.desc}</div>
            `;
            
            card.addEventListener('click', () => {
                document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                loadPreset(preset);
            });
            
            grid.appendChild(card);
        });
    }
    
    function loadPreset(preset) {
        pattern = preset.pattern.map(row => [...row]);
        updateGridUI();
        showNotification(`Loaded: ${preset.name}`, preset.color);
        
        if (audioCtx && audioCtx.state !== 'closed') {
            startPlayback();
        }
    }
    
    function buildTrackLabels() {
        const container = document.getElementById('trackLabels');
        container.innerHTML = '';
        
        for (let row = 0; row < ROWS; row++) {
            const label = document.createElement('div');
            label.className = 'track-label';
            label.id = `track-label-${row}`;
            label.style.setProperty('--color', COLORS[row].base);
            label.style.borderColor = COLORS[row].base + '40';
            label.style.background = COLORS[row].base + '10';
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'track-name';
            nameDiv.style.color = COLORS[row].base;
            nameDiv.textContent = SOUND_LIBRARY[TRACK_DEFAULTS[row]]?.name || TRACK_DEFAULTS[row];
            
            const previewDiv = document.createElement('div');
            previewDiv.className = 'track-sound-name';
            previewDiv.id = `sound-preview-${row}`;
            previewDiv.style.color = 'rgba(255,255,255,0.4)';
            
            label.appendChild(nameDiv);
            label.appendChild(previewDiv);
            
            label.addEventListener('click', () => openSoundPicker(row));
            
            container.appendChild(label);
        }
        
        updateSoundPreviews();
    }
    
    function updateSoundPreviews() {
        for (let i = 0; i < ROWS; i++) {
            const previewEl = document.getElementById(`sound-preview-${i}`);
            if (previewEl) {
                const soundData = SOUND_LIBRARY[channels[i].soundKey];
                if (soundData && soundData.sounds[channels[i].soundIndex]) {
                    previewEl.textContent = soundData.sounds[channels[i].soundIndex].name;
                }
            }
        }
    }
    
    function openSoundPicker(row) {
        selectedRow = row;
        const modal = document.getElementById('soundPickerModal');
        const content = document.getElementById('soundPickerContent');
        
        content.innerHTML = '';
        
        const categories = ['kick', 'snare', 'hihat', 'clap', 'tom', 'perc', 'bass', 'synth'];
        
        categories.forEach(catKey => {
            const category = SOUND_LIBRARY[catKey];
            const section = document.createElement('div');
            section.className = 'sound-category';
            section.innerHTML = `<div class="sound-category-title">${category.name.toUpperCase()}</div>`;
            
            const list = document.createElement('div');
            list.className = 'sound-list';
            
            category.sounds.forEach((sound, idx) => {
                const option = document.createElement('div');
                option.className = 'sound-option';
                if (channels[row].soundKey === catKey && channels[row].soundIndex === idx) {
                    option.classList.add('selected');
                }
                
                option.innerHTML = `
                    <div class="sound-option-name">${sound.name}</div>
                    <div class="sound-option-preview">${sound.desc}</div>
                    <button class="sound-option-play">PLAY</button>
                `;
                
                option.querySelector('.sound-option-play').addEventListener('click', (e) => {
                    e.stopPropagation();
                    channels[row].soundKey = catKey;
                    channels[row].soundIndex = idx;
                    playSound(row, true);
                });
                
                option.addEventListener('click', () => {
                    channels[row].soundKey = catKey;
                    channels[row].soundIndex = idx;
                    channels[row].name = sound.name;
                    
                    list.querySelectorAll('.sound-option').forEach(o => o.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    updateSoundPreviews();
                    updateMixerChannelName(row);
                    showNotification(`Sound: ${sound.name}`, COLORS[row].base);
                    
                    setTimeout(() => closeSoundPicker(), 300);
                });
                
                list.appendChild(option);
            });
            
            section.appendChild(list);
            content.appendChild(section);
        });
        
        modal.classList.add('visible');
    }
    
    function closeSoundPicker() {
        document.getElementById('soundPickerModal').classList.remove('visible');
        selectedRow = null;
    }
    
    function updateMixerChannelName(index) {
        const nameEl = document.getElementById(`channel-name-${index}`);
        if (nameEl) nameEl.textContent = channels[index].name;
    }
    
    function updateGridUI() {
        for (let row = 0; row < ROWS; row++) {
            for (let step = 0; step < STEPS; step++) {
                const idx = row * STEPS + step;
                const el = cellsElements[idx];
                if (el) el.classList.toggle('active', pattern[row][step]);
            }
        }
    }
    
    function buildGridUI() {
        const gridContainer = document.getElementById('grid');
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
        cellsElements = [];
        
        for (let row = 0; row < ROWS; row++) {
            for (let step = 0; step < STEPS; step++) {
                const div = document.createElement('div');
                div.className = 'cell';
                div.style.setProperty('--cell-color', COLORS[row].base);
                div.style.setProperty('--cell-color-glow', COLORS[row].glow);
                
                if (step % 4 === 0 && step > 0) {
                    div.style.borderLeft = '2px solid rgba(0, 245, 255, 0.4)';
                }
                
                div.dataset.row = row;
                div.dataset.step = step;
                
                div.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const r = parseInt(div.dataset.row);
                    const s = parseInt(div.dataset.step);
                    pattern[r][s] = !pattern[r][s];
                    
                    if (pattern[r][s]) {
                        div.classList.add('active');
                        div.style.background = `linear-gradient(145deg, ${COLORS[r].base}, ${COLORS[r].base}88)`;
                        div.style.boxShadow = `0 0 18px ${COLORS[r].glow}, 0 0 35px ${COLORS[r].glow}`;
                        playSound(r);
                        createParticles(r, s, div);
                    } else {
                        div.classList.remove('active');
                        div.style.background = '';
                        div.style.boxShadow = '';
                    }
                });
                
                gridContainer.appendChild(div);
                cellsElements.push(div);
            }
        }
    }
    
    function buildMixerUI() {
        const container = document.getElementById('mixerChannels');
        container.innerHTML = '';
        
        channels.forEach((ch, i) => {
            const channelEl = document.createElement('div');
            channelEl.className = 'channel';
            channelEl.id = `channel-${i}`;
            channelEl.style.setProperty('--channel-color', ch.color.base);
            
            const nameEl = document.createElement('div');
            nameEl.className = 'channel-name';
            nameEl.id = `channel-name-${i}`;
            nameEl.textContent = ch.name;
            nameEl.style.color = ch.color.base;
            
            const volumeSlider = document.createElement('input');
            volumeSlider.type = 'range';
            volumeSlider.min = '0';
            volumeSlider.max = '100';
            volumeSlider.value = ch.volume * 100;
            volumeSlider.className = 'volume-slider';
            volumeSlider.addEventListener('input', (e) => {
                channels[i].volume = e.target.value / 100;
                updateChannelUI(i);
            });
            
            const volumeValue = document.createElement('div');
            volumeValue.className = 'volume-value';
            volumeValue.id = `vol-value-${i}`;
            volumeValue.textContent = Math.round(ch.volume * 100) + '%';
            
            const controls = document.createElement('div');
            controls.className = 'channel-controls';
            
            const muteBtn = document.createElement('button');
            muteBtn.className = 'channel-btn mute-btn';
            muteBtn.id = `mute-${i}`;
            muteBtn.textContent = 'M';
            muteBtn.addEventListener('click', () => {
                channels[i].muted = !channels[i].muted;
                updateChannelUI(i);
                updateTrackLabels();
            });
            
            const soloBtn = document.createElement('button');
            soloBtn.className = 'channel-btn solo-btn';
            soloBtn.id = `solo-${i}`;
            soloBtn.textContent = 'S';
            soloBtn.addEventListener('click', () => {
                channels[i].solo = !channels[i].solo;
                updateChannelUI(i);
                updateTrackLabels();
            });
            
            controls.appendChild(muteBtn);
            controls.appendChild(soloBtn);
            
            channelEl.appendChild(nameEl);
            channelEl.appendChild(volumeSlider);
            channelEl.appendChild(volumeValue);
            channelEl.appendChild(controls);
            
            container.appendChild(channelEl);
        });
    }
    
    function updateChannelUI(index) {
        const channelEl = document.getElementById(`channel-${index}`);
        const volValue = document.getElementById(`vol-value-${index}`);
        const muteBtn = document.getElementById(`mute-${index}`);
        const soloBtn = document.getElementById(`solo-${index}`);
        
        if (channelEl) {
            channelEl.classList.toggle('muted', channels[index].muted && hasSolo());
            channelEl.classList.toggle('solo', channels[index].solo);
        }
        if (volValue) volValue.textContent = Math.round(channels[index].volume * 100) + '%';
        if (muteBtn) muteBtn.classList.toggle('active', channels[index].muted);
        if (soloBtn) soloBtn.classList.toggle('active', channels[index].solo);
    }
    
    function updateTrackLabels() {
        channels.forEach((ch, i) => {
            const label = document.getElementById(`track-label-${i}`);
            if (label) {
                label.classList.toggle('muted', ch.muted && hasSolo());
                label.classList.toggle('solo-active', ch.solo);
            }
        });
    }
    
    function buildEffectsUI() {
        const reverbParams = document.getElementById('reverb-params');
        const delayParams = document.getElementById('delay-params');
        
        reverbParams.innerHTML = `
            <div class="effect-param">
                <label>DECAY <span id="reverb-decay-val">${effects.reverb.decay}s</span></label>
                <input type="range" class="param-slider" id="reverb-decay" min="0.1" max="5" step="0.1" value="${effects.reverb.decay}">
            </div>
            <div class="effect-param">
                <label>MIX <span id="reverb-wet-val">${Math.round(effects.reverb.wet * 100)}%</span></label>
                <input type="range" class="param-slider" id="reverb-wet" min="0" max="100" step="1" value="${effects.reverb.wet * 100}">
            </div>
        `;
        
        delayParams.innerHTML = `
            <div class="effect-param">
                <label>TIME <span id="delay-time-val">${(effects.delay.time * 1000).toFixed(0)}ms</span></label>
                <input type="range" class="param-slider" id="delay-time" min="50" max="500" step="10" value="${effects.delay.time * 1000}">
            </div>
            <div class="effect-param">
                <label>FEEDBACK <span id="delay-feedback-val">${Math.round(effects.delay.feedback * 100)}%</span></label>
                <input type="range" class="param-slider" id="delay-feedback" min="0" max="90" step="1" value="${effects.delay.feedback * 100}">
            </div>
            <div class="effect-param">
                <label>MIX <span id="delay-wet-val">${Math.round(effects.delay.wet * 100)}%</span></label>
                <input type="range" class="param-slider" id="delay-wet" min="0" max="100" step="1" value="${effects.delay.wet * 100}">
            </div>
        `;
        
        document.getElementById('reverb-toggle').addEventListener('click', function() {
            effects.reverb.enabled = !effects.reverb.enabled;
            this.classList.toggle('active', effects.reverb.enabled);
            initEffects();
            showNotification(effects.reverb.enabled ? 'Reverb ON' : 'Reverb OFF', '#b400ff');
        });
        
        document.getElementById('delay-toggle').addEventListener('click', function() {
            effects.delay.enabled = !effects.delay.enabled;
            this.classList.toggle('active', effects.delay.enabled);
            initEffects();
            showNotification(effects.delay.enabled ? 'Delay ON' : 'Delay OFF', '#b400ff');
        });
        
        document.getElementById('reverb-decay').addEventListener('input', (e) => {
            effects.reverb.decay = parseFloat(e.target.value);
            document.getElementById('reverb-decay-val').textContent = effects.reverb.decay + 's';
        });
        
        document.getElementById('reverb-wet').addEventListener('input', (e) => {
            effects.reverb.wet = parseInt(e.target.value) / 100;
            document.getElementById('reverb-wet-val').textContent = Math.round(effects.reverb.wet * 100) + '%';
        });
        
        document.getElementById('delay-time').addEventListener('input', (e) => {
            effects.delay.time = parseInt(e.target.value) / 1000;
            document.getElementById('delay-time-val').textContent = (effects.delay.time * 1000).toFixed(0) + 'ms';
            if (delayNode) delayNode.delayTime.value = effects.delay.time;
        });
        
        document.getElementById('delay-feedback').addEventListener('input', (e) => {
            effects.delay.feedback = parseInt(e.target.value) / 100;
            document.getElementById('delay-feedback-val').textContent = Math.round(effects.delay.feedback * 100) + '%';
            if (delayFeedback) delayFeedback.gain.value = effects.delay.feedback;
        });
        
        document.getElementById('delay-wet').addEventListener('input', (e) => {
            effects.delay.wet = parseInt(e.target.value) / 100;
            document.getElementById('delay-wet-val').textContent = Math.round(effects.delay.wet * 100) + '%';
        });
    }
    
    function buildBeatIndicator() {
        const container = document.getElementById('beatIndicator');
        container.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const dot = document.createElement('div');
            dot.className = 'beat-dot';
            container.appendChild(dot);
        }
    }
    
    function updateBeatIndicator(step) {
        const dots = document.querySelectorAll('.beat-dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'stress');
            if (step >= 0 && Math.floor(step / 4) === i) {
                dot.classList.add(i === 0 ? 'stress' : 'active');
            }
        });
    }
    
    function stepSequencer() {
        if (!isPlaying) return;
        
        const activeRows = [];
        for (let row = 0; row < ROWS; row++) {
            if (pattern[row][currentStep]) {
                playSound(row);
                activeRows.push(row);
                
                const idx = row * STEPS + currentStep;
                const cell = cellsElements[idx];
                if (cell) {
                    cell.classList.add('playing');
                    createParticles(row, currentStep, cell);
                    setTimeout(() => cell.classList.remove('playing'), 100);
                }
            }
        }
        
        if (activeRows.length > 0) triggerVisualizerHit(activeRows);
        
        updateBeatIndicator(currentStep);
        currentStep = (currentStep + 1) % STEPS;
    }
    
    function startPlayback() {
        if (isPlaying) return;
        initAudio();
        initEffects();
        isPlaying = true;
        document.getElementById('playBtn').classList.add('playing');
        document.getElementById('playBtn').textContent = 'PAUSE';
        
        if (timerId) clearInterval(timerId);
        const stepDuration = (60 / bpm) * 1000 / 4;
        timerId = setInterval(stepSequencer, stepDuration);
    }
    
    function stopPlayback() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        isPlaying = false;
        currentStep = 0;
        
        document.getElementById('playBtn').classList.remove('playing');
        document.getElementById('playBtn').textContent = 'PLAY';
        cellsElements.forEach(el => el.classList.remove('playing'));
        updateBeatIndicator(-1);
    }
    
    function togglePlayback() {
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    }
    
    function setBPM(value) {
        bpm = Math.max(60, Math.min(200, Number(value)));
        document.getElementById('bpmInput').value = bpm;
        
        if (isPlaying) {
            clearInterval(timerId);
            const stepDuration = (60 / bpm) * 1000 / 4;
            timerId = setInterval(stepSequencer, stepDuration);
        }
    }
    
    function clearPattern() {
        pattern = Array(ROWS).fill().map(() => Array(STEPS).fill(false));
        cellsElements.forEach(el => {
            el.classList.remove('active');
            el.style.background = '';
            el.style.boxShadow = '';
        });
        document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
        showNotification('Pattern cleared', '#ff00aa');
    }
    
    function init() {
        resizeCanvas();
        buildHelpTooltip();
        buildPresetSection();
        buildTrackLabels();
        buildGridUI();
        buildBeatIndicator();
        buildMixerUI();
        buildEffectsUI();
        initKnobControls();
        drawVisualizer([]);
        
        document.getElementById('playBtn').addEventListener('click', togglePlayback);
        document.getElementById('stopBtn').addEventListener('click', stopPlayback);
        document.getElementById('clearBtn').addEventListener('click', clearPattern);
        document.getElementById('bpmInput').addEventListener('change', (e) => setBPM(e.target.value));
        
        document.getElementById('mixerToggleBtn').addEventListener('click', () => {
            document.querySelector('.mixer-section').classList.toggle('visible');
        });
        
        document.getElementById('effectsToggleBtn').addEventListener('click', () => {
            document.querySelector('.effects-section').classList.toggle('visible');
        });
        
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').classList.add('visible');
        });
        
        document.getElementById('helpClose').addEventListener('click', () => {
            document.getElementById('helpModal').classList.remove('visible');
        });
        
        document.getElementById('soundPickerClose').addEventListener('click', closeSoundPicker);
        document.getElementById('soundPickerModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('soundPickerModal')) closeSoundPicker();
        });
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('helpModal')) document.getElementById('helpModal').classList.remove('visible');
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayback();
            }
        });
        
        function idleAnimation() {
            if (!isPlaying) drawVisualizer([]);
            requestAnimationFrame(idleAnimation);
        }
        idleAnimation();
        
        showNotification('BRO-GRID-BEAT ready! Click a preset to start.', '#00f5ff');
    }
    
    init();
})();