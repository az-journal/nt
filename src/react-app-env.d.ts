/// <reference types="react-scripts" />

interface JsonRpcRequest {
    method: string;
    params?: any[];
}

interface Window {
    ethereum?: {
        isMetaMask?: boolean;
        request: (req: JsonRpcRequest) => any;
    };
}
