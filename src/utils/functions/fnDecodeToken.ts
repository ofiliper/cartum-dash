export const fnDecodeToken = (token: string): any => {
    try {
        const tokenParts = token.split('.');

        if (tokenParts.length !== 3) {
            throw new Error('Token inválido');
        }

        const payloadBase64 = tokenParts[1];

        // Corrigir para Base64Url encoding
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));

        return payload;
    } catch (error) {
        throw new Error('Falha ao decodificar o token');
    }
};
