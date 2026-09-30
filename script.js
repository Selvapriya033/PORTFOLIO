/* ============================================================
   SELVAPRIYA S — PROFESSIONAL 3D TECH ENGINE & CONTROLLER
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. THREE.JS 3D SCENE (Executive Tech Data Mesh & Polyhedra)
    // ============================================================
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 3, 38);

    // Mouse coordinates for 3D spring damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // ------------------------------------------------------------
    // A. 3D UNDULATING DATA SURFACE (Subtle Loss Landscape Plane)
    // ------------------------------------------------------------
    const waveCols = 50;
    const waveRows = 40;
    const waveCount = waveCols * waveRows;
    const waveGeometry = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const tealColor = new THREE.Color(0x0D9488);
    const indigoColor = new THREE.Color(0x6366F1);
    const amberColor = new THREE.Color(0xD97706);

    let idx = 0;
    for (let ix = 0; ix < waveCols; ix++) {
        for (let iy = 0; iy < waveRows; iy++) {
            const u = ix / (waveCols - 1);
            const v = iy / (waveRows - 1);

            wavePositions[idx * 3] = (u - 0.5) * 115;
            wavePositions[idx * 3 + 1] = -12 + (v - 0.5) * 8;
            wavePositions[idx * 3 + 2] = (v - 0.5) * 75 - 10;

            const mixedCol = new THREE.Color().lerpColors(tealColor, indigoColor, u);
            if (v > 0.65) mixedCol.lerp(amberColor, (v - 0.65) * 2.2);

            waveColors[idx * 3] = mixedCol.r;
            waveColors[idx * 3 + 1] = mixedCol.g;
            waveColors[idx * 3 + 2] = mixedCol.b;

            idx++;
        }
    }

    waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMaterial = new THREE.PointsMaterial({
        size: 1.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.NormalBlending
    });

    const waveParticles = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(waveParticles);

    // ------------------------------------------------------------
    // B. FLOATING 3D POLYHEDRA & DATA CRYSTALS
    // ------------------------------------------------------------
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // 1. Right Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(4.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0x0D9488,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(26, 7, -12);
    crystalGroup.add(icosahedron);

    // 2. Left Floating Octahedron
    const octGeo = new THREE.OctahedronGeometry(3.6, 0);
    const octMat = new THREE.MeshBasicMaterial({
        color: 0x6366F1,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(-27, -7, -10);
    crystalGroup.add(octahedron);

    // 3. Top Floating Tensor Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(2.4, 0.4, 64, 8);
    const knotMat = new THREE.MeshBasicMaterial({
        color: 0x0D9488,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    torusKnot.position.set(-20, 16, -14);
    crystalGroup.add(torusKnot);

    // ------------------------------------------------------------
    // C. FLOATING DATA NODES & CONSTELLATION
    // ------------------------------------------------------------
    const nodeCount = 160;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeCol = new Float32Array(nodeCount * 3);
    const nodeVels = [];

    for (let i = 0; i < nodeCount; i++) {
        nodePos[i * 3] = (Math.random() - 0.5) * 95;
        nodePos[i * 3 + 1] = (Math.random() - 0.5) * 65;
        nodePos[i * 3 + 2] = (Math.random() - 0.5) * 45;

        nodeVels.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.015
        });

        const r = Math.random();
        const c = r > 0.6 ? tealColor : (r > 0.3 ? indigoColor : amberColor);
        nodeCol[i * 3] = c.r;
        nodeCol[i * 3 + 1] = c.g;
        nodeCol[i * 3 + 2] = c.b;
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeCol, 3));

    const nodeMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.NormalBlending
    });

    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // Subtle Synapse Connections
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x0D9488,
        transparent: true,
        opacity: 0.1
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ------------------------------------------------------------
    // D. ANIMATION LOOP
    // ------------------------------------------------------------
    const clock = new THREE.Clock();

    function animateThree() {
        requestAnimationFrame(animateThree);
        const time = clock.getElapsedTime();

        // Mouse smooth easing
        mouse.targetX += (mouse.x - mouse.targetX) * 0.045;
        mouse.targetY += (mouse.y - mouse.targetY) * 0.045;

        // Camera perspective
        camera.position.x = mouse.targetX * 2.8;
        camera.position.y = 3 + mouse.targetY * 2.0;
        camera.lookAt(0, 0, 0);

        // 1. Animate Wave Matrix
        const wPos = waveGeometry.attributes.position.array;
        let pIdx = 0;
        for (let ix = 0; ix < waveCols; ix++) {
            for (let iy = 0; iy < waveRows; iy++) {
                const u = ix * 0.15;
                const v = iy * 0.15;
                const waveHeight = Math.sin(u + time * 1.0) * 1.8 + 
                                   Math.cos(v + time * 0.8) * 1.4;
                wPos[pIdx * 3 + 1] = -12 + waveHeight;
                pIdx++;
            }
        }
        waveGeometry.attributes.position.needsUpdate = true;

        // 2. Animate Crystals
        icosahedron.rotation.x += 0.003;
        icosahedron.rotation.y += 0.004;
        icosahedron.position.y = 7 + Math.sin(time * 0.75) * 1.4;

        octahedron.rotation.x -= 0.004;
        octahedron.rotation.z += 0.003;
        octahedron.position.y = -7 + Math.cos(time * 0.65) * 1.2;

        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.006;
        torusKnot.position.y = 16 + Math.sin(time * 0.55) * 1.0;

        // 3. Animate Nodes & Synapses
        const nPos = nodeGeo.attributes.position.array;
        const linePosArray = [];

        for (let i = 0; i < nodeCount; i++) {
            const i3 = i * 3;
            nPos[i3] += nodeVels[i].x;
            nPos[i3 + 1] += nodeVels[i].y;
            nPos[i3 + 2] += nodeVels[i].z;

            // Boundary wrapping
            if (Math.abs(nPos[i3]) > 48) nodeVels[i].x *= -1;
            if (Math.abs(nPos[i3 + 1]) > 34) nodeVels[i].y *= -1;
            if (Math.abs(nPos[i3 + 2]) > 24) nodeVels[i].z *= -1;

            // Connect nearby nodes
            for (let j = i + 1; j < nodeCount; j++) {
                const j3 = j * 3;
                const dx = nPos[i3] - nPos[j3];
                const dy = nPos[i3 + 1] - nPos[j3 + 1];
                const dz = nPos[i3 + 2] - nPos[j3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 9.0) {
                    linePosArray.push(
                        nPos[i3], nPos[i3 + 1], nPos[i3 + 2],
                        nPos[j3], nPos[j3 + 1], nPos[j3 + 2]
                    );
                }
            }
        }

        nodeGeo.attributes.position.needsUpdate = true;
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePosArray, 3));

        renderer.render(scene, camera);
    }

    animateThree();

    // Mouse Tracking
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ============================================================
    // 2. CUSTOM CURSOR
    // ============================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }
    });

    function renderCursor() {
        ringX += (dotX - ringX) * 0.15;
        ringY += (dotY - ringY) * 0.15;
        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverables = document.querySelectorAll('a, button, .project-3d-card, .toolkit-card, .info-card, .exp-card, .profile-card-3d, .comp-box, input, textarea');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorDot) cursorDot.classList.add('hover');
            if (cursorRing) cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorDot) cursorDot.classList.remove('hover');
            if (cursorRing) cursorRing.classList.remove('hover');
        });
    });

    // ============================================================
    // 3. 3D TILT EFFECT ON CARDS
    // ============================================================
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ============================================================
    // 4. STATS COUNTER ANIMATION
    // ============================================================
    const countElements = document.querySelectorAll('.h3d-num');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                const isDecimal = entry.target.dataset.decimal === "1";
                let count = 0;
                const duration = 1200;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const currentVal = target * ease;

                    entry.target.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = isDecimal ? target.toFixed(1) : target;
                    }
                }

                requestAnimationFrame(updateCount);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    countElements.forEach(el => countObserver.observe(el));

    // ============================================================
    // 5. ROLE TYPEWRITER TERMINAL
    // ============================================================
    const typedOut = document.getElementById('typed-out');
    if (typedOut) {
        const roles = [
            "Data Analyst",
            "Data Scientist",
            "ML Engineer",
            "Power BI Specialist",
            "Python Developer"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeTick() {
            const currentRole = roles[roleIndex];
            if (!isDeleting) {
                charIndex++;
                typedOut.textContent = currentRole.slice(0, charIndex);
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeTick, 1800);
                    return;
                }
            } else {
                charIndex--;
                typedOut.textContent = currentRole.slice(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            setTimeout(typeTick, isDeleting ? 40 : 80);
        }
        typeTick();
    }

    // ============================================================
    // 6. SCROLL REVEAL OBSERVER
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // ============================================================
    // 7. SCROLLSPY & NAVIGATION
    // ============================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ============================================================
    // 8. CONTACT FORM INTERACTION
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const origHTML = btn.innerHTML;

            btn.innerHTML = '<span>Message Sent! ✨</span>';
            btn.style.background = '#0D9488';

            setTimeout(() => {
                btn.innerHTML = origHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
