export const fnFetch = async ({
    url,
    method = 'GET',
    body,
    headers: customHeaders = {},
    httpRef = process.env.NEXT_PUBLIC_API_URL,
}: {
    url: string;
    method?: string;
    body?: any;
    headers?: any;
    httpRef?: string;
}) => {

    const fullUrl = new URL(url, httpRef).href;

    let requestOptions: RequestInit = {
        method,
        headers: new Headers({ ...customHeaders }),
        body: null,
    };

    if (body) {
        if (body instanceof FormData) {
            // Se o corpo for FormData, deixe o navegador definir o Content-Type automaticamente
            requestOptions.body = body;
        } else {
            // Se não, configure o corpo como JSON e o tipo de conteúdo como application/json
            requestOptions.body = JSON.stringify(body);
            requestOptions.headers = new Headers({ ...customHeaders, 'Content-Type': 'application/json' });
        }
    }

    try {

        const response = await fetch(fullUrl, requestOptions);
        const responseData = await response.json();


        if (responseData.auth === null && !responseData.auth) window.location.href = '/auth/login';

        responseData.ok = response.ok; // Adicionando a propriedade ok à resposta


        return responseData;
    } catch (error) {
        throw error;
    }
}
