// PremiumPlus Dashboard JavaScript

// Global app state
window.PremiumPlus = {
    config: window.AppConfig || {},
    user: null,
    notifications: [],
    
    // Initialize the app
    init() {
        this.user = this.config.user;
        this.setupEventListeners();
        this.initializeComponents();
        this.checkAuthStatus();
        console.log('🎵 PremiumPlus Dashboard initialized');
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Handle form submissions
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Handle navigation
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Handle modals
        document.addEventListener('click', this.handleModalEvents.bind(this));
        
        // Handle notifications
        this.setupNotifications();
        
        // Handle responsive menu
        this.setupMobileMenu();
    },
    
    // Initialize components
    initializeComponents() {
        this.initializeTooltips();
        this.initializeTabs();
        this.initializeDropdowns();
        this.initializeProgressBars();
    },
    
    // Check authentication status
    checkAuthStatus() {
        if (this.user) {
            this.showElement('.user-authenticated');
            this.hideElement('.user-not-authenticated');
        } else {
            this.showElement('.user-not-authenticated');
            this.hideElement('.user-authenticated');
        }
    },
    
    // Handle form submissions
    handleFormSubmit(event) {
        const form = event.target;
        if (form.classList.contains('ajax-form')) {
            event.preventDefault();
            this.submitFormAjax(form);
        }
    },
    
    // Submit form via AJAX
    async submitFormAjax(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent;
        
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Processing...';
        }
        
        try {
            const response = await fetch(form.action, {
                method: form.method || 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            const result = await response.json();
            
            if (response.ok) {
                this.showNotification(result.message || 'Success!', 'success');
                if (result.redirect) {
                    window.location.href = result.redirect;
                }
            } else {
                this.showNotification(result.error || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Network error occurred', 'error');
        } finally {
            // Reset button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    },
    
    // Handle navigation clicks
    handleNavigation(event) {
        const link = event.target.closest('a[data-navigate]');
        if (link) {
            event.preventDefault();
            this.navigateTo(link.href);
        }
    },
    
    // Navigate to a page
    async navigateTo(url) {
        try {
            const response = await fetch(url, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            
            if (response.ok) {
                window.location.href = url;
            } else {
                this.showNotification('Navigation failed', 'error');
            }
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = url; // Fallback to normal navigation
        }
    },
    
    // Handle modal events
    handleModalEvents(event) {
        // Open modal
        if (event.target.matches('[data-modal-open]')) {
            const modalId = event.target.getAttribute('data-modal-open');
            this.openModal(modalId);
        }
        
        // Close modal
        if (event.target.matches('[data-modal-close]') || event.target.matches('.modal-overlay')) {
            this.closeModal();
        }
    },
    
    // Open modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    },
    
    // Close modal
    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.classList.remove('overflow-hidden');
    },
    
    // Setup notifications
    setupNotifications() {
        // Auto-close notifications after 5 seconds
        document.querySelectorAll('.notification[data-auto-close]').forEach(notification => {
            setTimeout(() => {
                this.hideNotification(notification);
            }, 5000);
        });
    },
    
    // Show notification
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        
        // Set notification type styles
        const typeStyles = {
            success: 'bg-green-600 text-white',
            error: 'bg-red-600 text-white',
            warning: 'bg-yellow-600 text-white',
            info: 'bg-blue-600 text-white'
        };
        
        notification.className += ` ${typeStyles[type] || typeStyles.info}`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="flex-1">${message}</span>
                <button onclick="PremiumPlus.hideNotification(this.parentElement.parentElement)" class="ml-2 text-white/70 hover:text-white">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto-hide
        setTimeout(() => {
            this.hideNotification(notification);
        }, duration);
    },
    
    // Hide notification
    hideNotification(notification) {
        if (notification) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    },
    
    // Setup mobile menu
    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    },
    
    // Initialize tooltips
    initializeTooltips() {
        // Simple tooltip implementation
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-popup absolute z-50 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg';
                tooltip.textContent = e.target.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                document.querySelectorAll('.tooltip-popup').forEach(tip => tip.remove());
            });
        });
    },
    
    // Initialize tabs
    initializeTabs() {
        document.querySelectorAll('[data-tab-target]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = tab.getAttribute('data-tab-target');
                const tabGroup = tab.closest('[data-tab-group]');
                
                if (tabGroup) {
                    // Hide all tab contents
                    tabGroup.querySelectorAll('[data-tab-content]').forEach(content => {
                        content.classList.add('hidden');
                    });
                    
                    // Remove active state from all tabs
                    tabGroup.querySelectorAll('[data-tab-target]').forEach(t => {
                        t.classList.remove('active');
                    });
                    
                    // Show target content
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.classList.remove('hidden');
                    }
                    
                    // Add active state to clicked tab
                    tab.classList.add('active');
                }
            });
        });
    },
    
    // Initialize dropdowns
    initializeDropdowns() {
        document.querySelectorAll('[data-dropdown-toggle]').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetId = toggle.getAttribute('data-dropdown-toggle');
                const dropdown = document.getElementById(targetId);
                
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        });
    },
    
    // Initialize progress bars
    initializeProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const progress = bar.getAttribute('data-progress') || 0;
            const fill = bar.querySelector('.progress-bar-fill');
            if (fill) {
                fill.style.width = progress + '%';
            }
        });
    },
    
    // Utility functions
    showElement(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.remove('hidden');
        });
    },
    
    hideElement(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('hidden');
        });
    },
    
    // API helper functions
    async apiCall(endpoint, options = {}) {
        const defaults = {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        
        if (this.config.csrfToken) {
            defaults.headers['X-CSRF-Token'] = this.config.csrfToken;
        }
        
        const config = Object.assign(defaults, options);
        
        try {
            const response = await fetch(this.config.dashboardUrl + endpoint, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'API call failed');
            }
            
            return data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    },
    
    // Format utilities
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.PremiumPlus.init();
});

// Expose PremiumPlus globally
window.PremiumPlus = window.PremiumPlus;
