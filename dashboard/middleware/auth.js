const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || ['730818959112274040'];

export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        if (req.path.startsWith('/api/')) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        return res.redirect('/auth/login');
    }
    next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.session.user || !ADMIN_IDS.includes(req.session.user.id)) {
        if (req.path.startsWith('/api/')) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        return res.status(403).render('errors/403', { 
            title: 'Access Denied',
            message: 'Admin access required'
        });
    }
    
    // Set admin flag for templates
    req.session.user.isAdmin = true;
    next();
};

export const requirePremiumPlus = (req, res, next) => {
    if (!req.session.user?.premiumPlus) {
        if (req.path.startsWith('/api/')) {
            return res.status(403).json({ error: 'PremiumPlus subscription required' });
        }
        return res.redirect('/dashboard/plans');
    }
    next();
};

export const optionalAuth = (req, res, next) => {
    // This middleware doesn't require auth but sets user if available
    next();
};
