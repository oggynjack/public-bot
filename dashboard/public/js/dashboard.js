// Dashboard JavaScript Functions

// Global variables
let toastContainer;
let currentUser = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeToastContainer();
    initializeEventListeners();
    checkUserSession();
});

// Initialize toast container
function initializeToastContainer() {
    toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50 space-y-2';
        document.body.appendChild(toastContainer);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('[data-dropdown]');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', validateForm);
    });
}

// Check user session
async function checkUserSession() {
    try {
        const response = await fetch('/api/user/session', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (response.ok) {
            currentUser = await response.json();
        }
    } catch (error) {
        console.error('Session check failed:', error);
    }
}

// Toast notification system
function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-lg shadow-lg transition-all duration-300 text-white ${getToastClasses(type)}`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="${icon}"></i>
            <span>${message}</span>
            <button onclick="removeToast(this)" class="ml-4 text-white hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add enter animation
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    toastContainer.appendChild(toast);
    
    // Trigger enter animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => removeToast(toast), duration);
    }
    
    return toast;
}

function getToastClasses(type) {
    switch (type) {
        case 'success': return 'bg-green-600';
        case 'error': return 'bg-red-600';
        case 'warning': return 'bg-yellow-600';
        case 'info': return 'bg-blue-600';
        default: return 'bg-gray-600';
    }
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-bell';
    }
}

function removeToast(element) {
    const toast = element.closest('.p-4');
    if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Loading states
function setLoadingState(element, loading = true) {
    if (loading) {
        element.disabled = true;
        element.dataset.originalContent = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalContent || element.innerHTML;
    }
}

// API request helper
async function apiRequest(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
}

// Bot control functions
async function controlBot(action, element) {
    try {
        if (element) setLoadingState(element, true);
        
        const response = await apiRequest(`/api/bot/${action}`, {
            method: 'POST'
        });
        
        if (response.success) {
            showToast(response.message, 'success');
            
            // Refresh page after a delay for status to update
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showToast(response.message || `Failed to ${action} bot`, 'error');
        }
    } catch (error) {
        console.error(`Bot ${action} error:`, error);
        showToast(`Failed to ${action} bot: ${error.message}`, 'error');
    } finally {
        if (element) setLoadingState(element, false);
    }
}

// Settings update functions
async function updateSettings(endpoint, formData, successMessage) {
    try {
        const response = await apiRequest(`/api/bot/settings/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        if (response.success) {
            showToast(successMessage || 'Settings updated successfully', 'success');
            return true;
        } else {
            showToast(response.message || 'Failed to update settings', 'error');
            return false;
        }
    } catch (error) {
        console.error('Settings update error:', error);
        showToast(`Settings update failed: ${error.message}`, 'error');
        return false;
    }
}

// Form validation
function validateForm(event) {
    const form = event.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Clear previous validation states
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.border-red-500').forEach(el => {
        el.classList.remove('border-red-500');
    });
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            // Specific validations
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (field.dataset.minLength && field.value.length < parseInt(field.dataset.minLength)) {
                showFieldError(field, `Minimum length is ${field.dataset.minLength} characters`);
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        event.preventDefault();
        showToast('Please fix the form errors before submitting', 'error');
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Copy to clipboard
async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    try {
        await navigator.clipboard.writeText(text);
        showToast(successMessage, 'success', 2000);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast(successMessage, 'success', 2000);
        } catch (err) {
            showToast('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Utility functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatUptime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Auto-refresh functions
let refreshInterval;

function startAutoRefresh(intervalMs = 30000) {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    refreshInterval = setInterval(() => {
        refreshDashboardData();
    }, intervalMs);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

async function refreshDashboardData() {
    try {
        // Only refresh if we're on a dashboard page
        if (!window.location.pathname.includes('/dashboard')) {
            return;
        }
        
        const response = await apiRequest('/api/bot/stats');
        
        if (response.success) {
            updateDashboardStats(response.stats);
        }
    } catch (error) {
        console.error('Dashboard refresh error:', error);
    }
}

function updateDashboardStats(stats) {
    // Update stats on the page without full refresh
    const elements = {
        guilds: document.getElementById('guilds-count'),
        users: document.getElementById('users-count'),
        songsPlayed: document.getElementById('songs-count'),
        uptime: document.getElementById('uptime-text')
    };
    
    if (elements.guilds) elements.guilds.textContent = stats.guilds || 0;
    if (elements.users) elements.users.textContent = stats.users || 0;
    if (elements.songsPlayed) elements.songsPlayed.textContent = stats.songsPlayed || 0;
    if (elements.uptime) elements.uptime.textContent = stats.uptime || '0h 0m';
}

// Export functions for global use
window.dashboard = {
    showToast,
    controlBot,
    updateSettings,
    copyToClipboard,
    openModal,
    closeModal,
    formatBytes,
    formatUptime,
    startAutoRefresh,
    stopAutoRefresh
};
