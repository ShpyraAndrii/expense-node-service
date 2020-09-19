import https from 'https';

export interface IParams {
    host: string;
    method: string;
    port?: number;
    path?: string;
}

export const makeApiCall = (params: IParams | string, postData?: any) => {
    return new Promise((resolve, reject) => {
        const request = https.request(params, (res: any) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('status Code = ' + res.statusCode));
            }

            let body: any[] = [];

            res.on('data', (chunk: any) => {
                body.push(chunk);
            });

            res.on('end', () => {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });

        request.on('error', (err) => {
            reject(err);
        });

        if (postData) {
            request.write(postData);
        }

        request.end();
    });
};
