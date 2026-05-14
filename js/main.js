(function(){
    const STEPS = 16;
    const ROWS = 8;
    
const SOUND_LIBRARY = sounds.SOUND_LIBRARY;
const COLORS = sounds.COLORS;
const PRESETS = sounds.PRESETS;
    
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
        compressor: 0
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
        compressorNode.attack.value = 0.003;
        compressorNode.release.value = 0.25;
        
        distortionNode = audioCtx.createWaveShaper();
        distortionNode.curve = null;
        
        eqFilters.bass = audioCtx.createBiquadFilter();
        eqFilters.bass.type = 'peaking';
        eqFilters.bass.frequency.value = 150;
        eqFilters.bass.Q.value = 1;
        eqFilters.bass.gain.value = 0;
        
        masterGain.connect(eqFilters.bass);
        
        if (masterControls.compressor > 0) {
            eqFilters.bass.connect(compressorNode);
            compressorNode.connect(distortionNode);
        } else {
            eqFilters.bass.connect(distortionNode);
        }
        
        distortionNode.connect(audioCtx.destination);
    }
    
    function updateMasterControls() {
        if (!masterGain) return;
        
        masterGain.gain.value = masterControls.masterVolume;
        
        compressorNode.threshold.value = -24 - (masterControls.compressor * 0.36);
        compressorNode.ratio.value = 1 + (masterControls.compressor * 0.12);
    }
    
    function initKnobControls() {
        const masterVolume = document.getElementById('masterVolume');
        const masterFill = document.getElementById('masterFill');
        const masterThumb = document.getElementById('masterThumb');
        
        masterVolume.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.masterVolume = val / 100;
            document.getElementById('masterVolumeValue').textContent = val + '%';
            masterFill.style.width = val + '%';
            masterThumb.style.left = `calc(${val}% - 9px)`;
            updateMasterControls();
        });
        masterFill.style.width = '80%';
        masterThumb.style.left = 'calc(80% - 9px)';
        
        const bassBoost = document.getElementById('bassBoost');
        const bassFill = document.getElementById('bassFill');
        const bassThumb = document.getElementById('bassThumb');
        
        bassBoost.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.bassBoost = val;
            document.getElementById('bassBoostValue').textContent = val + ' dB';
            const percent = ((val + 12) / 24) * 100;
            bassFill.style.width = percent + '%';
            bassThumb.style.left = `calc(${percent}% - 9px)`;
            eqFilters.bass.gain.value = val;
        });
        bassFill.style.width = '50%';
        bassThumb.style.left = 'calc(50% - 9px)';
        
        const compressor = document.getElementById('compressor');
        const compFill = document.getElementById('compFill');
        const compThumb = document.getElementById('compThumb');
        
        compressor.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            masterControls.compressor = val;
            document.getElementById('compressorValue').textContent = val === 0 ? 'OFF' : val + '%';
            compFill.style.width = val + '%';
            compThumb.style.left = `calc(${val}% - 9px)`;
            updateMasterControls();
        });
        compFill.style.width = '0%';
        compThumb.style.left = '-9px';
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
        const count = 5 + Math.floor(Math.random() * 5);
        
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
    
    let visualizerTimeout = null;
    
    function triggerVisualizerHit(activeRows = []) {
        if (visualizerTimeout) return;
        
        let frame = 0;
        const maxFrames = 15;
        
        function animate() {
            frame++;
            const progress = frame / maxFrames;
            
            const w = canvas.width;
            const h = canvas.height;
            ctx.fillStyle = 'rgba(5, 5, 16, 0.3)';
            ctx.fillRect(0, 0, w, h);
            
            const barCount = 32;
            const barWidth = w / barCount;
            
            for (let i = 0; i < barCount; i++) {
                const wave = Math.sin(i * 0.3 + frame * 0.4) * 0.5 + 0.5;
                const intensity = 0.15 + (1 - progress) * wave * 0.85;
                const barHeight = 6 + intensity * (h - 14);
                const hue = 180 + intensity * 60;
                
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                ctx.fillRect(i * barWidth + 2, h - barHeight, barWidth - 4, barHeight);
            }
            
            if (frame < maxFrames) {
                visualizerTimeout = setTimeout(animate, 16);
            } else {
                visualizerTimeout = null;
                drawVisualizer([]);
            }
        }
        
        animate();
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
        
        playSoundByType(audioCtx, panner, sound.params.type, sound.params, volume, now);
        
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
        buildStepNumbers();
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
                    
                    buildStepNumbers();
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
    
    function buildStepNumbers() {
        const container = document.getElementById('stepNumbers');
        if (container.children.length > 0) return;
        
        container.style.display = 'flex';
        container.style.gap = '5px';
        container.style.marginBottom = '8px';
        container.style.marginLeft = '58px';
        
        for (let i = 0; i < STEPS; i++) {
            const num = document.createElement('div');
            num.className = 'step-number';
            num.id = `step-num-${i}`;
            num.textContent = '';
            num.style.opacity = '0.2';
            container.appendChild(num);
        }
    }
    
    function updateStepNumbers(step) {
        const container = document.getElementById('stepNumbers');
        
        for (let i = 0; i < STEPS; i++) {
            const num = document.getElementById(`step-num-${i}`);
            if (!num) continue;
            
            num.className = 'step-number';
            num.style.background = '';
            num.style.boxShadow = '';
            
            const hasNotes = pattern.some(row => row[i]);
            num.textContent = hasNotes ? (i + 1) : '';
            num.style.opacity = hasNotes ? '1' : '0.2';
            
            if (i === step) {
                num.style.background = 'rgba(0, 245, 255, 0.2)';
                num.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.5)';
                
                if (step % 4 === 0) {
                    num.style.background = 'rgba(255, 0, 170, 0.2)';
                    num.style.boxShadow = '0 0 15px rgba(255, 0, 170, 0.5)';
                }
            }
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
        updateStepNumbers(currentStep);
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
        updateStepNumbers(-1);
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
        buildStepNumbers();
        showNotification('Pattern cleared', '#ff00aa');
    }
    
    function init() {
        resizeCanvas();
        buildHelpTooltip();
        buildPresetSection();
        buildTrackLabels();
        buildGridUI();
        buildBeatIndicator();
        buildStepNumbers();
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
        
        let idleTimeout = null;
        
        function idleAnimation() {
            if (!isPlaying && !visualizerTimeout) {
                drawVisualizer([]);
            }
            idleTimeout = setTimeout(idleAnimation, 100);
        }
        idleAnimation();
        
        showNotification('BRO-GRID-BEAT ready! Click a preset to start.', '#00f5ff');
    }
    
    init();
})();
