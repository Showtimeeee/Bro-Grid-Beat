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

const PRESETS = [
    {
        name: 'Basic Beat',
        desc: '4/4 basic',
        icon: '🥁',
        color: '#00f5ff',
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'Trap Beat',
        desc: 'Hard trap',
        icon: '🔫',
        color: '#ff00aa',
        pattern: [
            [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'House',
        desc: '4/4 house',
        icon: '🏠',
        color: '#00ff88',
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'Breakbeat',
        desc: 'Breaks',
        icon: '💥',
        color: '#f0ff00',
        pattern: [
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'Hip-Hop',
        desc: 'Old school',
        icon: '🎤',
        color: '#b400ff',
        pattern: [
            [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'Techno',
        desc: 'Hard techno',
        icon: '⚡',
        color: '#ff6600',
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'DnB',
        desc: 'Drum & Bass',
        icon: '🔊',
        color: '#ff3366',
        pattern: [
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    }
];

function playKick(audioCtx, panner, p, volume, now) {
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

function playSnare(audioCtx, panner, p, volume, now) {
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

function playHihat(audioCtx, panner, p, volume, now) {
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

function playClap(audioCtx, panner, p, volume, now) {
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

function playTom(audioCtx, panner, p, volume, now) {
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

function playPerc(audioCtx, panner, p, volume, now) {
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

function playBass(audioCtx, panner, p, volume, now) {
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

function playSynth(audioCtx, panner, p, volume, now) {
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
    
    oscs.forEach(osc => osc.connect(filter));
    filter.connect(gain);
    gain.connect(panner);
    
    oscs.forEach(osc => {
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
    });
}

function playSoundByType(audioCtx, panner, type, params, volume, now) {
    switch (type) {
        case 'fm': playKick(audioCtx, panner, params, volume, now); break;
        case 'noise': playSnare(audioCtx, panner, params, volume, now); break;
        case 'hihat': playHihat(audioCtx, panner, params, volume, now); break;
        case 'clap': playClap(audioCtx, panner, params, volume, now); break;
        case 'tom': playTom(audioCtx, panner, params, volume, now); break;
        case 'perc': playPerc(audioCtx, panner, params, volume, now); break;
        case 'bass': playBass(audioCtx, panner, params, volume, now); break;
        case 'synth': playSynth(audioCtx, panner, params, volume, now); break;
    }
}

if (typeof window !== 'undefined') {
    window.SOUND_LIBRARY = SOUND_LIBRARY;
    window.COLORS = COLORS;
    window.PRESETS = PRESETS;
    window.playSoundByType = playSoundByType;
}
