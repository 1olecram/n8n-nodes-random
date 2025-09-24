import {
    INodeType,
    INodeTypeDescription,
    IExecuteFunctions,
    INodeExecutionData,
} from 'n8n-workflow';
import axios from 'axios';

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:random.svg',
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator',
        defaults: {
            name: 'Random',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 0,
                description: 'Minimum value for the random number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 1000000,
                },
                required: true,
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                description: 'Maximum value for the random number',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000000,
                },
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnItems: INodeExecutionData[] = [];

        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const min = this.getNodeParameter('min', itemIndex) as number;
                const max = this.getNodeParameter('max', itemIndex) as number;

                if (min >= max) {
                    throw new Error('Min value must be less than Max value');
                }

                const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
                const response = await axios.get(url);

                // Extrair e processar o número randomico de forma mais segura
                let randomNumber: number;

                if (typeof response.data === 'string') {
                    // Se for string, faz trim e converte
                    randomNumber = parseInt(response.data.trim(), 10);
                } else if (typeof response.data === 'number') {
                    // Se já for número, usa diretamente
                    randomNumber = response.data;
                } else if (typeof response.data === 'object' && response.data !== null) {
                    // Se for objeto, tentar extrair de propriedades comuns
                    const data = response.data;

                    // Tentar diferentes propriedades que podem conter o número
                    const possibleNumber =
                        data.number ??
                        data.integers?.[0] ??
                        data.result ??
                        data.data ??
                        data.value;

                    if (typeof possibleNumber === 'string') {
                        randomNumber = parseInt(possibleNumber.trim(), 10);
                    } else if (typeof possibleNumber === 'number') {
                        randomNumber = possibleNumber;
                    } else {
                        throw new Error('Could not extract random number from response object');
                    }
                } else {
                    throw new Error('Unexpected response format from Random.org API');
                }

                if (isNaN(randomNumber)) {
                    throw new Error('Invalid random number received: ' + JSON.stringify(response.data));
                }

                returnItems.push({
                    json: {
                        randomNumber,
                        min,
                        max,
                    },
                    pairedItem: {
                        item: itemIndex,
                    },
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(`API call error: ${error.message} - Status: ${error.response?.status}`);
                }
                throw error;
            }
        }

        return this.prepareOutputData(returnItems);
    }
}
