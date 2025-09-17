// Smooth Scroll for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Modal/Lightbox Functionality
const modal = {
    init: function() {
        this.createModal();
        this.bindEvents();
    },
    
    createModal: function() {
        const modalHTML = `
            <div id="modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div class="modal-body"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },
    
    bindEvents: function() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modal = document.getElementById('modal');
        const closeBtn = modal.querySelector('.close');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(trigger.getAttribute('data-modal'));
            });
        });
        
        closeBtn.addEventListener('click', () => this.close());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },
    
    open: function(content) {
        const modal = document.getElementById('modal');
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },
    
    close: function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Dark Mode Toggle
const darkMode = {
    init: function() {
        this.createToggle();
        this.loadPreference();
        this.bindEvents();
    },
    
    createToggle: function() {
        const toggleHTML = `
            <button id="dark-mode-toggle" class="dark-mode-toggle" aria-label="Toggle dark mode">
                <span class="sun-icon">☀️</span>
                <span class="moon-icon">🌙</span>
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', toggleHTML);
    },
    
    bindEvents: function() {
        const toggle = document.getElementById('dark-mode-toggle');
        toggle.addEventListener('click', () => this.toggle());
    },
    
    toggle: function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        this.updateToggleIcon(isDark);
    },
    
    loadPreference: function() {
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference === 'true') {
            document.body.classList.add('dark-mode');
            this.updateToggleIcon(true);
        }
    },
    
    updateToggleIcon: function(isDark) {
        const toggle = document.getElementById('dark-mode-toggle');
        const sunIcon = toggle.querySelector('.sun-icon');
        const moonIcon = toggle.querySelector('.moon-icon');
        
        if (isDark) {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        }
    }
};

// Form Validation
const formValidator = {
    init: function() {
        const forms = document.querySelectorAll('form[data-validate]');
        forms.forEach(form => this.bindForm(form));
    },
    
    bindForm: function(form) {
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },
    
    validateForm: function(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField: function(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';
        
        // Required field check
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Password validation
        else if (type === 'password' && value) {
            if (value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long';
            }
        }
        
        // URL validation
        else if (type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }
        
        if (isValid) {
            this.showSuccess(field);
        } else {
            this.showError(field, errorMessage);
        }
        
        return isValid;
    },
    
    showError: function(field, message) {
        this.clearError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    },
    
    showSuccess: function(field) {
        this.clearError(field);
        field.classList.add('success');
        field.classList.remove('error');
    },
    
    clearError: function(field) {
        field.classList.remove('error', 'success');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
};

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    modal.init();
    darkMode.init();
    formValidator.init();
});
