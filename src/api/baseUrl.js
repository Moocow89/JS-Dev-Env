export default function getBaseUrl() {
    const inDevelopement = window.hostname === 'localhost';
    return inDevelopement ? 'http://localhost:3001/' : '/';
}
