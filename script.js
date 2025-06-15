document.addEventListener('DOMContentLoaded', function() {
    // EmailJS初期化
    emailjs.init('yHDJY2z82_XmZrn-d');
    
    const ctaButton = document.querySelector('.cta-button');
    const contactForm = document.querySelector('.contact-form');
    const navLinks = document.querySelectorAll('nav a');
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    burgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    ctaButton.addEventListener('click', function() {
        const targetSection = document.getElementById('contact');
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            navMenu.classList.remove('active');
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 現在時刻を設定
        const now = new Date();
        const timeString = now.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('current-time').value = timeString;
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // 送信中表示
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        // EmailJSでメール送信
        emailjs.sendForm('service_gmail', 'template_m2k50ec', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('お問い合わせありがとうございます！\n後日担当者よりご連絡いたします。');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
            })
            .finally(function() {
                // ボタンを元に戻す
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-graphic svg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});