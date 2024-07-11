document.addEventListener('DOMContentLoaded', function() {
    const faqs = document.querySelectorAll('.faq-question');

    faqs.forEach(faq => {
        faq.addEventListener('click', function() {
            
            document.querySelectorAll('.faq-answer').forEach(answer => {
                if (answer !== faq.nextElementSibling) {
                    answer.style.display = 'none';
                }
            });

           
            document.querySelectorAll('.faq-question').forEach(question => {
                if (question !== faq) {
                    question.classList.remove('active');
                    question.querySelector('.icon').textContent = '+';
                }
            });

            
            const answer = faq.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                faq.classList.remove('active');
                faq.querySelector('.icon').textContent = '+';
            } else {
                answer.style.display = 'block';
                faq.classList.add('active');
                faq.querySelector('.icon').textContent = '-';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function animateValue(id, start, end, duration, formatFunc) {
        const obj = document.getElementById(id);
        if (!obj) return; 

        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.max(Math.floor(duration / range), minTimer);
        
        let startTime = new Date().getTime();
        const endTime = startTime + duration;
        let timer;
        
        function run() {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            obj.innerHTML = formatFunc(value);
            if (value === end) {
                clearInterval(timer);
            }
        }
        
        timer = setInterval(run, stepTime);
        run();
    }
    
    function formatNumber(value) {
        if (value >= 1000000) {
            return `+${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `+${(value / 1000).toFixed(1)}K`;
        }
        return value;
    }
    
    function formatYears(value) {
        return `+${value} ans`;
    }

    
    function triggerAnimations(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateValue("clients", 0, 30000, 2000, formatNumber);
                    animateValue("years", 0, 34, 2000, formatYears);
                    animateValue("documents", 0, 3000000, 2000, formatNumber);
                }, 500); 
            }
        });
    }

   
    const observer = new IntersectionObserver(triggerAnimations, {
        threshold: 0.1 
    });

   
    const container = document.querySelector('#section-5 .container');
    if (container) {
        observer.observe(container);
    } else {
        console.error('Container not found within Section 5');
    }
});
