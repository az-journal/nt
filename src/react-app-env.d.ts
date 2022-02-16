/// <reference types="react-scripts" />

interface JsonRpcRequest {
    method: string;
    params?: any[];
}

interface Window {
    ethereum?: {
        request: (req: JsonRpcRequest) => any;
    };
}
