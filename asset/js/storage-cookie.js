const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const DEFAULT_DOMAIN = '.lopec.kr';
const DEFAULT_PATH = '/';
const DEFAULT_SAMESITE = 'Lax';

function buildCookieOptions(options = {}) {
    const {
        maxAge = ONE_YEAR_SECONDS,
        path = DEFAULT_PATH,
        domain = DEFAULT_DOMAIN,
        sameSite = DEFAULT_SAMESITE,
        secure,
    } = options;

    return {
        maxAge,
        path,
        domain,
        sameSite,
        secure,
    };
}

function serializeCookie(name, value, options) {
    const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

    if (typeof options.maxAge === 'number') {
        parts.push(`Max-Age=${options.maxAge}`);
    }

    if (options.domain) {
        parts.push(`Domain=${options.domain}`);
    }

    if (options.path) {
        parts.push(`Path=${options.path}`);
    }

    if (options.sameSite) {
        parts.push(`SameSite=${options.sameSite}`);
    }

    const shouldUseSecure = options.secure ?? (typeof window !== 'undefined' && window.location && window.location.protocol === 'https:');
    if (shouldUseSecure) {
        parts.push('Secure');
    }

    return parts.join('; ');
}

export function setCookie(name, value, options = {}) {
    const config = buildCookieOptions(options);
    document.cookie = serializeCookie(name, value ?? '', config);
}

export function deleteCookie(name, options = {}) {
    const config = buildCookieOptions({ ...options, maxAge: 0 });
    document.cookie = serializeCookie(name, '', config);
}

export function getCookie(name) {
    const encodedName = encodeURIComponent(name);
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (const cookie of cookies) {
        const [cookieName, ...rest] = cookie.split('=');
        if (cookieName === encodedName) {
            return decodeURIComponent(rest.join('='));
        }
    }

    return null;
}

export function setJsonCookie(name, data, options = {}) {
    const payload = JSON.stringify(data ?? []);
    setCookie(name, payload, options);
}

export function getJsonCookie(name, fallback = []) {
    const raw = getCookie(name);
    if (!raw) {
        return Array.isArray(fallback) ? [...fallback] : fallback;
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : Array.isArray(fallback) ? [...fallback] : fallback;
    } catch (error) {
        return Array.isArray(fallback) ? [...fallback] : fallback;
    }
}
